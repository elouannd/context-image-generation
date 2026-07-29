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

function getLinkApiImageFallback(modelId) {
    if (!/^(gpt-image|dall-e)/i.test(modelId || '')) return undefined;

    return {
        id: modelId,
        transport: 'openAiImages',
        supportsReferenceImages: false,
        supportsSize: true,
        status: 'existing',
    };
}

export function getModelDefinition(providerId, modelId) {
    const provider = getProviderDefinition(providerId);
    const model = provider?.models.find((candidate) => candidate.id === modelId);
    return model || (providerId === 'linkapi' ? getLinkApiImageFallback(modelId) : undefined);
}

export function resolveTransport(providerId, modelId) {
    return getModelDefinition(providerId, modelId)?.transport;
}

export function resolveProviderRoute(providerId, modelId) {
    const provider = getProviderDefinition(providerId);
    const model = getModelDefinition(providerId, modelId);
    return {
        provider,
        model,
        transport: model?.transport,
    };
}
