/**
 * Build the SillyTavern Chat Completions request used for Gemini image models
 * through a request-scoped Gemini-compatible reverse proxy.
 *
 * @param {{
 *   model: string,
 *   messages: Array<object>,
 *   apiKey: string,
 *   baseUrl: string,
 *   aspectRatio?: string,
 *   imageSize?: string,
 *   isFlash2?: boolean,
 *   thinkingLevel?: string,
 *   useGoogleSearch?: boolean,
 * }} input
 * @returns {object}
 */
export function buildGeminiProxyRequest({
    model,
    messages,
    apiKey,
    baseUrl,
    aspectRatio,
    imageSize,
    isFlash2,
    thinkingLevel,
    useGoogleSearch,
}) {
    const request = {
        chat_completion_source: 'makersuite',
        model,
        messages,
        max_tokens: 8192,
        temperature: 1,
        request_images: true,
        request_image_aspect_ratio: aspectRatio || '1:1',
        request_image_resolution: imageSize || undefined,
        stream: false,
        reverse_proxy: baseUrl,
        proxy_password: apiKey || '',
    };

    if (isFlash2) {
        if (thinkingLevel && thinkingLevel !== 'auto') {
            request.reasoning_effort = thinkingLevel;
        }
        if (useGoogleSearch) {
            request.enable_web_search = true;
        }
    }

    return request;
}
