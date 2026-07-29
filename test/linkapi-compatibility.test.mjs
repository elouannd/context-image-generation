import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('keeps a named legacy LinkAPI path and a new adapter dispatch path', async () => {
    const source = await readFile(new URL('../index.js', import.meta.url), 'utf8');
    assert.match(source, /async function generateLegacyLinkApiImage/);
    assert.match(source, /resolveTransport\(selectedProvider, settings\.model\)/);
    assert.match(source, /buildGeminiProxyRequest/);
});
test('migrates LinkAPI credentials and exposes a manual-only legacy recovery switch', async () => {
    const [index, settings] = await Promise.all([
        readFile(new URL('../index.js', import.meta.url), 'utf8'),
        readFile(new URL('../settings.html', import.meta.url), 'utf8'),
    ]);

    assert.match(index, /provider_keys/);
    assert.match(index, /linkapi_use_legacy_routing/);
    assert.match(index, /settings\.linkapi_key.*provider_keys\.linkapi/);
    assert.match(index, /selectedProvider === 'linkapi' && settings\.linkapi_use_legacy_routing === true/);
    assert.match(settings, /id="cig_linkapi_use_legacy_routing"/);
    assert.match(settings, /Use legacy LinkAPI routing/);
});
