import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveTransport } from '../lib/providers/registry.js';

test('routes LinkAPI Gemini and OpenAI image models by model contract', () => {
    assert.equal(resolveTransport('linkapi', 'gemini-2.5-flash-image'), 'sillyTavernGeminiProxy');
    assert.equal(resolveTransport('linkapi', 'gpt-image-2-c'), 'openAiImages');
});

test('routes TokenReply Grok through OpenAI Images', () => {
    assert.equal(resolveTransport('tokenreply', 'grok-imagine-image'), 'openAiImages');
});
