export const PROVIDERS = {
    linkapi: {
        id: 'linkapi',
        credentialKey: 'linkapi',
        transports: {
            sillyTavernGeminiProxy: { baseUrl: 'https://api.linkapi.ai' },
            openAiImages: { baseUrl: 'https://linkapi.ai/v1' },
        },
        models: [
            { id: 'gemini-2.5-flash-image', transport: 'sillyTavernGeminiProxy', status: 'existing' },
            { id: 'gemini-3.1-flash-image-preview', transport: 'sillyTavernGeminiProxy', status: 'existing' },
            { id: 'gemini-3-pro-image-preview', transport: 'sillyTavernGeminiProxy', status: 'existing' },
            { id: 'gpt-image-2-c', transport: 'openAiImages', supportsReferenceImages: false, supportsSize: true, status: 'existing' },
        ],
    },
    tokenreply: {
        id: 'tokenreply',
        credentialKey: 'tokenreply',
        transports: { openAiImages: { baseUrl: 'https://api.tokenreply.com/v1' } },
        models: [{ id: 'grok-imagine-image', transport: 'openAiImages', supportsReferenceImages: false, status: 'experimental' }],
    },
};

export function getProviderDefinition(providerId) {
    return PROVIDERS[providerId];
}

export function getModelDefinition(providerId, modelId) {
    return getProviderDefinition(providerId)?.models.find((model) => model.id === modelId);
}

export function resolveTransport(providerId, modelId) {
    const model = getModelDefinition(providerId, modelId);
    if (model) return model.transport;

    if (providerId === 'linkapi' && /^(gpt-image|dall-e)/i.test(modelId)) {
        return 'openAiImages';
    }

    return undefined;
}
