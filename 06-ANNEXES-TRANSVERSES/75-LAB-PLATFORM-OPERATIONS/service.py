#!/usr/bin/env python3
"""Small stdlib HTTP service for AF platform/operations drills.

This is a teaching service, not a production-ready web framework or API.
"""
from __future__ import annotations

import argparse
import json
import os
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit

STARTED_AT = time.monotonic()
REQUEST_COUNT = 0
REQUEST_LOCK = threading.Lock()


def dependency_ready() -> bool:
    value = os.getenv("AF_DEPENDENCY_READY", "true").strip().lower()
    if value not in {"true", "false"}:
        raise RuntimeError("AF_DEPENDENCY_READY must be true or false")
    return value == "true"


class Handler(BaseHTTPRequestHandler):
    server_version = "AFPlatformLab/1.0"
    sys_version = ""

    def _send(self, status: int, body: dict[str, object], content_type: str = "application/json") -> None:
        encoded = (
            (json.dumps(body, sort_keys=True) + "\n").encode("utf-8")
            if content_type == "application/json"
            else str(body["text"]).encode("utf-8")
        )
        self.send_response(status)
        self.send_header("Content-Type", f"{content_type}; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(encoded)

    def do_GET(self) -> None:  # noqa: N802 - stdlib handler interface
        global REQUEST_COUNT
        with REQUEST_LOCK:
            REQUEST_COUNT += 1
            current_count = REQUEST_COUNT

        # Ignore query strings: health and metrics routes never inspect user payloads.
        route = urlsplit(self.path).path
        if route == "/healthz":
            self._send(200, {"status": "alive"})
        elif route == "/readyz":
            try:
                ready = dependency_ready()
            except RuntimeError:
                ready = False
            self._send(200 if ready else 503, {"status": "ready" if ready else "not_ready"})
        elif route == "/metrics":
            uptime = max(0.0, time.monotonic() - STARTED_AT)
            payload = (
                "# HELP af_http_requests_total Total HTTP requests handled by this process.\n"
                "# TYPE af_http_requests_total counter\n"
                f"af_http_requests_total {current_count}\n"
                "# HELP af_process_uptime_seconds Process uptime in seconds.\n"
                "# TYPE af_process_uptime_seconds gauge\n"
                f"af_process_uptime_seconds {uptime:.3f}\n"
            )
            self._send(200, {"text": payload}, "text/plain")
        else:
            self._send(404, {"error": "not_found"})

    def log_message(self, fmt: str, *args: object) -> None:
        # Do not print arbitrary request strings or query parameters in this lab.
        return


def main() -> int:
    parser = argparse.ArgumentParser(description="AF platform operations teaching service")
    parser.add_argument("--host", default=os.getenv("AF_HOST", "127.0.0.1"))
    parser.add_argument("--port", type=int, default=int(os.getenv("AF_PORT", "8080")))
    args = parser.parse_args()
    if not 0 <= args.port <= 65535:
        parser.error("port must be between 0 and 65535")
    try:
        dependency_ready()
    except RuntimeError as exc:
        parser.error(str(exc))

    server = ThreadingHTTPServer((args.host, args.port), Handler)
    server.daemon_threads = True
    server.timeout = 0.5
    print(f"AF_PLATFORM_SERVICE_LISTENING host={args.host} port={server.server_port}", flush=True)
    try:
        server.serve_forever(poll_interval=0.25)
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
