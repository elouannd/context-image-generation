import test from 'node:test';
import assert from 'node:assert/strict';
import { createGenerationCoordinator } from '../lib/generation-coordinator.js';

test('rejects a duplicate in-flight key without starting its operation', async () => {
    const coordinator = createGenerationCoordinator();
    let release;
    const first = coordinator.run('message:42', () => new Promise((resolve) => { release = resolve; }));
    let secondCalls = 0;

    await assert.rejects(
        coordinator.run('message:42', async () => { secondCalls += 1; return 'duplicate'; }),
        /already in progress/,
    );
    assert.equal(secondCalls, 0);
    release('first');
    assert.equal(await first, 'first');
});
