import test from 'node:test';
import assert from 'node:assert/strict';
import { buildGeminiProxyRequest } from '../lib/providers/gemini-proxy.js';

test('builds the current LinkAPI Gemini proxy request', () => {
    const body = buildGeminiProxyRequest({
        model: 'gemini-3.1-flash-image-preview',
        messages: [{ role: 'user', content: 'scene' }],
        apiKey: 'test-key',
        baseUrl: 'https://api.linkapi.ai',
        aspectRatio: '1:1',
        imageSize: '2K',
        isFlash2: true,
        thinkingLevel: 'low',
        useGoogleSearch: true,
    });

    assert.equal(body.chat_completion_source, 'makersuite');
    assert.equal(body.reverse_proxy, 'https://api.linkapi.ai');
    assert.equal(body.proxy_password, 'test-key');
    assert.equal(body.request_images, true);
    assert.equal(body.request_image_aspect_ratio, '1:1');
    assert.equal(body.request_image_resolution, '2K');
    assert.equal(body.stream, false);
    assert.equal(body.reasoning_effort, 'low');
    assert.equal(body.enable_web_search, true);
});
