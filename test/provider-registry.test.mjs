import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getModelDefinition, getProviderDefinition, resolveTransport } from '../lib/providers/registry.js';

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

test('TokenReply Grok starts with a minimal experimental Images payload', () => {
    const provider = getProviderDefinition('tokenreply');
    assert.equal(provider.transports.openAiImages.baseUrl, 'https://api.tokenreply.com/v1');
    assert.equal(getModelDefinition('tokenreply', 'grok-imagine-image').supportsReferenceImages, false);
    assert.equal(getModelDefinition('tokenreply', 'grok-imagine-image').supportsSize, undefined);
    assert.equal(getModelDefinition('tokenreply', 'grok-imagine-image').status, 'experimental');
});
test('exposes TokenReply as an experimental built-in profile with no model discovery', async () => {
    const [index, settings] = await Promise.all([
        readFile(new URL('../index.js', import.meta.url), 'utf8'),
        readFile(new URL('../settings.html', import.meta.url), 'utf8'),
    ]);

    assert.match(settings, /value="tokenreply">TokenReply \(Experimental\)<\/option>/);
    assert.match(settings, /https:\/\/api\.tokenreply\.com\/v1\/images\/generations/);
    assert.match(index, /selectedProvider === 'tokenreply'/);
    assert.match(index, /baseUrl: provider\.transports\.openAiImages\.baseUrl/);
    assert.doesNotMatch(index, /fetchTokenReplyModels/);
});
test('hides both unsupported reference controls for TokenReply while retaining them elsewhere', async () => {
    const [index, settings] = await Promise.all([
        readFile(new URL('../index.js', import.meta.url), 'utf8'),
        readFile(new URL('../settings.html', import.meta.url), 'utf8'),
    ]);

    assert.match(settings, /id="cig_avatar_reference_option"/);
    assert.match(settings, /id="cig_previous_image_reference_option"/);
    assert.match(index, /\$\('#cig_avatar_reference_option'\)\.toggle\(!isTokenReply\)/);
    assert.match(index, /\$\('#cig_previous_image_reference_option'\)\.toggle\(!isTokenReply\)/);
});