import { getModelDefinition, getProviderDefinition, getProviderDefinitions } from './registry.js';

export function projectProviderOptions() {
    return getProviderDefinitions().map((provider) => ({
        id: provider.id,
        label: provider.label || provider.id,
        status: provider.status,
    }));
}

export function projectProviderUi(providerId, modelId) {
    const provider = getProviderDefinition(providerId);
    if (!provider) return undefined;

    const ui = provider.ui || {};
    const model = getModelDefinition(providerId, modelId) || provider.models[0];
    return {
        id: provider.id,
        label: provider.label || provider.id,
        status: provider.status,
        requiresApiKey: ui.requiresApiKey === true,
        apiKeyLabel: ui.apiKeyLabel || 'Provider API Key',
        supportsModelDiscovery: ui.modelDiscovery === true,
        showsLegacyRecovery: ui.showsLegacyRecovery === true,
        providerInfo: ui.providerInfo,
        modelNote: model?.modelNote,
        models: provider.models.map(({ id, label }) => ({ id, label: label || id })),
        supportsReferenceImages: model?.supportsReferenceImages !== false,
        imageSizeOptions: (model?.imageSizeOptions || []).map((option) => typeof option === 'string' ? { value: option, label: option } : option),
        supportsThinking: model?.supportsThinking === true,
        supportsGoogleSearch: model?.supportsGoogleSearch === true,
    };
}

export function getModelFallback(providerId, currentModelId) {
    const ui = projectProviderUi(providerId, currentModelId);
    if (!ui) return undefined;
    if (getModelDefinition(providerId, currentModelId)) return currentModelId;

    const preferredVariant = /(?:3-pro|\bpro\b)/.test(currentModelId || '') ? 'pro'
        : /(?:3\.1|3-1)/.test(currentModelId || '') ? 'flash2'
            : 'flash';
    return getProviderDefinition(providerId).models.find((model) => model.variant === preferredVariant)?.id || ui.models[0]?.id;
}

export function projectProviderControls(providerId, modelId, currentImageSize = '') {
    const ui = projectProviderUi(providerId, modelId);
    if (!ui) return undefined;
    const imageSize = ui.imageSizeOptions.some((option) => option.value === currentImageSize) ? currentImageSize : '';
    return { ...ui, imageSize };
}
