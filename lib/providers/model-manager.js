import { getModelDefinition, getProviderDefinition } from './registry.js';

export function normalizeModelId(id) {
    return typeof id === 'string' ? id.trim() : '';
}

function normalizeEntries(entries) {
    const seen = new Set();
    const result = [];
    for (const entry of Array.isArray(entries) ? entries : []) {
        const id = normalizeModelId(entry?.id);
        if (!id || seen.has(id)) continue;
        seen.add(id);
        result.push({ id, source: entry?.source === 'fetched' ? 'fetched' : 'manual' });
    }
    return result;
}

export function updateLocalModelEntries(entries, operation) {
    const current = normalizeEntries(entries);
    const id = normalizeModelId(operation?.id);
    if (!id) return current;

    if (operation.type === 'remove') {
        return current.filter((entry) => entry.id !== id);
    }

    if (operation.type === 'replace') {
        const previousId = normalizeModelId(operation.previousId);
        return normalizeEntries([
            ...current.filter((entry) => entry.id !== previousId && entry.id !== id),
            { id, source: operation.source },
        ]);
    }

    if (operation.type === 'upsert') {
        return normalizeEntries([
            ...current.filter((entry) => entry.id !== id),
            { id, source: operation.source },
        ]);
    }

    return current;
}

export function mergeFetchedModelEntries(entries, fetchedIds) {
    let merged = normalizeEntries(entries);
    for (const id of Array.isArray(fetchedIds) ? fetchedIds : []) {
        const normalizedId = normalizeModelId(id);
        if (!normalizedId || merged.some((entry) => entry.id === normalizedId)) continue;
        merged = [...merged, { id: normalizedId, source: 'fetched' }];
    }
    return merged;
}

function getConservativeModel(provider, id) {
    const usesOpenAiImages = Boolean(provider?.transports?.openAiImages);
    return {
        id,
        label: id,
        transport: usesOpenAiImages ? 'openAiImages' : undefined,
        supportsReferenceImages: usesOpenAiImages ? false : undefined,
        supportsSize: false,
        status: 'local',
    };
}

export function mergeProviderModels(providerId, localEntries) {
    const provider = getProviderDefinition(providerId);
    if (!provider) return [];

    const seen = new Set();
    const models = [];
    const add = (model) => {
        if (!model?.id || seen.has(model.id)) return;
        seen.add(model.id);
        models.push(model);
    };

    for (const model of provider.models || []) add({ ...model });
    for (const entry of normalizeEntries(localEntries)) {
        add({ ...(getModelDefinition(providerId, entry.id) || getConservativeModel(provider, entry.id)), source: entry.source });
    }
    return models;
}