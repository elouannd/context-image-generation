import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveTransport } from '../lib/providers/registry.js';

test('routes LinkAPI Gemini and OpenAI image models by model contract', () => {
    assert.equal(resolveTransport('linkapi', 'gemini-2.5-flash-image'), 'sillyTavernGeminiProxy');
    assert.equal(resolveTransport('linkapi', 'gpt-image-2-c'), 'openAiImages');
});

test('routes every LinkAPI model exposed by the built-in UI', () => {
    const expectedTransports = {
        'gemini-2.5-flash-image': 'sillyTavernGeminiProxy',
        'gemini-3.1-flash-image-preview': 'sillyTavernGeminiProxy',
        'gemini-3-pro-image-preview': 'sillyTavernGeminiProxy',
        'gpt-image-2-c': 'openAiImages',
    };

    for (const [model, transport] of Object.entries(expectedTransports)) {
        assert.equal(resolveTransport('linkapi', model), transport, model);
    }
});
test('routes TokenReply Grok through OpenAI Images', () => {
    assert.equal(resolveTransport('tokenreply', 'grok-imagine-image'), 'openAiImages');
});
