import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const projectDirectory = fileURLToPath(new URL('..', import.meta.url));

test('the starter entry point runs and prints its documented message', () => {
  const result = spawnSync(process.execPath, ['index.js'], {
    cwd: projectDirectory,
    encoding: 'utf8',
    timeout: 5_000,
  });

  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout, 'ARCHITECTE-FANTOME sandbox ready.\n');
});
