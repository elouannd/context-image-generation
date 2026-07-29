import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('keeps a named legacy LinkAPI path and a new adapter dispatch path', async () => {
    const source = await readFile(new URL('../index.js', import.meta.url), 'utf8');
    assert.match(source, /async function generateLegacyLinkApiImage/);
    assert.match(source, /resolveTransport\(selectedProvider, settings\.model\)/);
    assert.match(source, /buildGeminiProxyRequest/);
});
