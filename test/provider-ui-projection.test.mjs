import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PROVIDERS } from '../lib/providers/registry.js';
import { projectProviderUi } from '../lib/providers/ui-projection.js';

test('projects a fixture provider UI entirely from registry metadata', () => {
    PROVIDERS.fixture = {
        id: 'fixture',
        label: 'Fixture Images',
        credentialKey: 'fixture',
        ui: {
            requiresApiKey: true,
            apiKeyLabel: 'Fixture API Key',
            modelDiscovery: false,
            adapterRequired: true,
        },
        transports: { openAiImages: { baseUrl: 'https://fixture.example/v1' } },
        models: [{
            id: 'fixture-image',
            label: 'Fixture Image',
            transport: 'openAiImages',
            supportsReferenceImages: false,
            imageSizeOptions: ['small', 'large'],
            supportsThinking: false,
            supportsGoogleSearch: false,
            status: 'fixture',
        }],
    };

    try {
        assert.deepEqual(projectProviderUi('fixture', 'fixture-image'), {
            id: 'fixture',
            label: 'Fixture Images',
            status: undefined,
            requiresApiKey: true,
            apiKeyLabel: 'Fixture API Key',
            supportsModelDiscovery: false,
            showsLegacyRecovery: false,
            providerInfo: undefined,
            modelNote: undefined,
            models: [{ id: 'fixture-image', label: 'Fixture Image' }],
            supportsReferenceImages: false,
            imageSizeOptions: ['small', 'large'],
            supportsThinking: false,
            supportsGoogleSearch: false,
        });
    } finally {
        delete PROVIDERS.fixture;
    }
});

test('renders provider controls from the registry rather than static provider names', async () => {
    const [index, settings] = await Promise.all([
        readFile(new URL('../index.js', import.meta.url), 'utf8'),
        readFile(new URL('../settings.html', import.meta.url), 'utf8'),
    ]);

    assert.match(index, /projectProviderUi/);
    assert.match(index, /renderProviderDropdown/);
    assert.doesNotMatch(index, /const PROVIDER_MODELS/);
    assert.doesNotMatch(settings, /<option value="(?:makersuite|linkapi|tokenreply|openrouter)">/);
});
