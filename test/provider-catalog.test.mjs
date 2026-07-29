import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('provider catalog declares the released provider statuses', async () => {
    const catalog = await readFile(new URL('../docs/PROVIDER_CATALOG.md', import.meta.url), 'utf8');

    for (const requiredText of ['LinkAPI', 'TokenReply', 'Existing', 'Experimental', 'Verified']) {
        assert.match(catalog, new RegExp(requiredText));
    }
});

test('provider documentation distinguishes setup and size behavior by route', async () => {
    const [readme, guide] = await Promise.all([
        readFile(new URL('../README.md', import.meta.url), 'utf8'),
        readFile(new URL('../DEVELOPER_GUIDE.md', import.meta.url), 'utf8'),
    ]);

    assert.match(readme, /Google AI Studio and OpenRouter use SillyTavern Chat Completion settings/);
    assert.match(readme, /LinkAPI Gemini models use the SillyTavern route/);
    assert.match(readme, /LinkAPI `gpt-image\*`\/`dall-e\*` models use LinkAPI's direct Images route/);
    assert.match(readme, /TokenReply .* Experimental.*text-only/i);
    assert.match(guide, /normal adapter route adds `size` only when the selected model metadata declares `supportsSize: true`/);
    assert.match(guide, /legacy LinkAPI Images recovery route intentionally maps and sends `size` unconditionally/);
});
