import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeFetchedModelEntries, mergeProviderModels, updateLocalModelEntries } from '../lib/providers/model-manager.js';

test('keeps TokenReply built-ins and local model IDs while collapsing duplicates', () => {
    const models = mergeProviderModels('tokenreply', [
        { id: ' grok-imagine-image-quality ', source: 'manual' },
        { id: 'custom-tokenreply-image', source: 'manual' },
        { id: 'custom-tokenreply-image', source: 'fetched' },
        { id: '   ', source: 'manual' },
    ]);

    assert.deepEqual(models.map((model) => model.id), [
        'grok-imagine-image',
        'grok-imagine-image-quality',
        'custom-tokenreply-image',
    ]);
    assert.equal(models.at(-1).supportsReferenceImages, false);
});

test('adds, edits, and removes persisted actual model IDs', () => {
    const added = updateLocalModelEntries([], { type: 'upsert', id: 'custom-image', source: 'manual' });
    const edited = updateLocalModelEntries(added, { type: 'replace', previousId: 'custom-image', id: 'custom-image-v2', source: 'manual' });

    assert.deepEqual(edited, [{ id: 'custom-image-v2', source: 'manual' }]);
    assert.deepEqual(updateLocalModelEntries(edited, { type: 'remove', id: 'custom-image-v2' }), []);
});

test('merges fetched IDs without deleting manual entries', () => {
    const merged = mergeFetchedModelEntries(
        [{ id: 'manual-model', source: 'manual' }, { id: 'existing-model', source: 'fetched' }],
        ['existing-model', 'fresh-model', ''],
    );

    assert.deepEqual(merged, [
        { id: 'manual-model', source: 'manual' },
        { id: 'existing-model', source: 'fetched' },
        { id: 'fresh-model', source: 'fetched' },
    ]);
});
test('preserves an explicit custom LinkAPI Gemini transport', () => {
    const entries = updateLocalModelEntries([], {
        type: 'upsert',
        id: 'gemini-custom-image',
        source: 'manual',
        transport: 'sillyTavernGeminiProxy',
        supportsReferenceImages: true,
        supportsSize: false,
    });

    assert.deepEqual(entries, [{
        id: 'gemini-custom-image',
        source: 'manual',
        transport: 'sillyTavernGeminiProxy',
        supportsReferenceImages: true,
        supportsSize: false,
    }]);
});
