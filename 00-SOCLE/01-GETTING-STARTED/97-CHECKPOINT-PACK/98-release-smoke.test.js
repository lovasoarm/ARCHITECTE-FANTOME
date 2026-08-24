import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

/**
 * Smoke test de release : vérifie que Node est disponible et que le sandbox
 * démarre sans erreur. Ce test ne contient aucune solution du curriculum.
 */
test('sandbox release smoke test', () => {
  const version = process.versions.node.split('.').map(Number);
  assert.match(process.versions.node, /^22\./, `Node 22.x requis, trouvé ${process.versions.node}`);

  const output = execFileSync(process.execPath, ['index.js'], {
    cwd: new URL('..', import.meta.url),
    encoding: 'utf8',
  });
  assert.match(output, /ARCHITECTE-FANTOME sandbox ready\./);
});
