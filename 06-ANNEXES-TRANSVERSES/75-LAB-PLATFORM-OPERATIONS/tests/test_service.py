from __future__ import annotations

import os
import socket
import subprocess
import sys
import time
import unittest
import urllib.error
import urllib.request
from pathlib import Path
from unittest.mock import patch

from service import dependency_ready

ROOT = Path(__file__).resolve().parents[1]
SERVICE = ROOT / "service.py"


class PlatformServiceTests(unittest.TestCase):
    def setUp(self):
        with socket.socket() as sock:
            sock.bind(("127.0.0.1", 0))
            self.port = sock.getsockname()[1]
        env = os.environ.copy()
        env["AF_DEPENDENCY_READY"] = "true"
        self.process = subprocess.Popen(
            [sys.executable, str(SERVICE), "--host", "127.0.0.1", "--port", str(self.port)],
            cwd=ROOT,
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        deadline = time.monotonic() + 5
        while time.monotonic() < deadline:
            if self.process.poll() is not None:
                stdout, stderr = self.process.communicate()
                self.fail(f"service exited early; stdout={stdout!r}; stderr={stderr!r}")
            try:
                urllib.request.urlopen(f"http://127.0.0.1:{self.port}/healthz", timeout=0.2)
                break
            except (OSError, urllib.error.URLError):
                time.sleep(0.05)
        else:
            self.fail("service did not become reachable within 5 seconds")

    def tearDown(self):
        if self.process.poll() is None:
            self.process.terminate()
            try:
                self.process.wait(timeout=3)
            except subprocess.TimeoutExpired:
                self.process.kill()
                self.process.wait(timeout=3)
        if self.process.stdout:
            self.process.stdout.close()
        if self.process.stderr:
            self.process.stderr.close()

    def get(self, path):
        return urllib.request.urlopen(f"http://127.0.0.1:{self.port}{path}", timeout=1)

    def test_dependency_flag_rejects_invalid_configuration(self):
        with patch.dict(os.environ, {"AF_DEPENDENCY_READY": "false"}):
            self.assertFalse(dependency_ready())
        with patch.dict(os.environ, {"AF_DEPENDENCY_READY": "maybe"}):
            with self.assertRaises(RuntimeError):
                dependency_ready()

    def test_liveness_is_independent_of_readiness(self):
        response = self.get("/healthz")
        self.assertEqual(response.status, 200)
        self.assertEqual(response.headers.get_content_type(), "application/json")
        self.assertEqual(response.read(), b'{"status": "alive"}\n')

    def test_readiness_returns_503_while_process_remains_alive(self):
        with socket.socket() as sock:
            sock.bind(("127.0.0.1", 0))
            port = sock.getsockname()[1]
        env = os.environ.copy()
        env["AF_DEPENDENCY_READY"] = "false"
        process = subprocess.Popen(
            [sys.executable, str(SERVICE), "--host", "127.0.0.1", "--port", str(port)],
            cwd=ROOT, env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True,
        )
        try:
            deadline = time.monotonic() + 5
            while time.monotonic() < deadline:
                if process.poll() is not None:
                    stdout, stderr = process.communicate()
                    self.fail(f"degraded service exited; stdout={stdout!r}; stderr={stderr!r}")
                try:
                    response = urllib.request.urlopen(f"http://127.0.0.1:{port}/healthz", timeout=0.2)
                    self.assertEqual(response.status, 200)
                    break
                except (OSError, urllib.error.URLError):
                    time.sleep(0.05)
            else:
                self.fail("degraded service did not become reachable")
            with self.assertRaises(urllib.error.HTTPError) as context:
                urllib.request.urlopen(f"http://127.0.0.1:{port}/readyz", timeout=1)
            self.assertEqual(context.exception.code, 503)
        finally:
            if process.poll() is None:
                process.terminate()
                try:
                    process.wait(timeout=3)
                except subprocess.TimeoutExpired:
                    process.kill()
                    process.wait(timeout=3)
            if process.stdout:
                process.stdout.close()
            if process.stderr:
                process.stderr.close()

    def test_ready_endpoint_reports_healthy_dependency_flag(self):
        response = self.get("/readyz")
        self.assertEqual(response.status, 200)
        self.assertIn(b"ready", response.read())

    def test_metrics_expose_bounded_low_cardinality_process_signals(self):
        response = self.get("/metrics")
        body = response.read().decode("utf-8")
        self.assertEqual(response.headers.get_content_type(), "text/plain")
        self.assertIn("af_http_requests_total", body)
        self.assertIn("af_process_uptime_seconds", body)
        self.assertNotIn("?", body)

    def test_unknown_route_is_not_mistaken_for_health(self):
        with self.assertRaises(urllib.error.HTTPError) as context:
            self.get("/unknown")
        self.assertEqual(context.exception.code, 404)

    def test_query_string_is_not_reflected_in_health_response(self):
        response = self.get("/healthz?token=must-not-be-reflected")
        self.assertEqual(response.status, 200)
        self.assertNotIn(b"must-not-be-reflected", response.read())


if __name__ == "__main__":
    unittest.main()
