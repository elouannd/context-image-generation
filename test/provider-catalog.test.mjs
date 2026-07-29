import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('provider catalog declares the released provider statuses', async () => {
    const catalog = await readFile(new URL('../docs/PROVIDER_CATALOG.md', import.meta.url), 'utf8');

    for (const requiredText of ['LinkAPI', 'TokenReply', 'Existing', 'Experimental', 'Verified']) {
        assert.match(catalog, new RegExp(requiredText));
    }
});
