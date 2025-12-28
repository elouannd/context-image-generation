# Context Image Generation 🍌

A SillyTavern extension that adds Gemini-powered image generation with character context and avatar references.

## Features

- **Message Generation Button** - Wand icon in the dropdown menu on each message to generate an image from that message's content
- **Character Context** - Automatically includes character and user descriptions in prompts
- **Avatar References** - Uses character and user avatars as visual references for consistent art
- **Slash Command** - `/proimagine <prompt>` for quick generation

## Requirements

> ⚠️ **Important:** Requires SillyTavern **staging branch** from December 2024 or later. The image generation feature needs recent backend changes. Run `git pull` if you get OAuth errors.

- SillyTavern (latest staging branch)
- Google AI Studio API key (paid tier) configured in SillyTavern
- A Gemini model with image generation capability:
  - `gemini-2.5-flash-image` (~$0.04/image)
  - `gemini-3-pro-image-preview` (~$0.14/image)

## Installation

1. Navigate to your SillyTavern in the Extensions.
2. Click on Install Extension Button and paste this repo link
3. Paste your AI Studio API key in Chat Completion settings
4. Profit!
   
## Usage

### Message Button
1. Open a chat with a character
2. Click the "..." menu on any message
3. Click the wand icon (✨) to generate an image from that message

### Settings Panel
- Configure model, aspect ratio, and image size
- Toggle avatar references and character descriptions
- Customize the system instruction
- View and manage gallery

### Slash Command
```
/proimagine a beautiful sunset over mountains
```
Aliases: `/proimg`, `/geminiimg`

## Configuration

| Setting | Description |
|---------|-------------|
| Model | Choose between Flash (~$0.04) or Pro (~$0.14) |
| Aspect Ratio | 1:1, 3:4, 4:3, 9:16, or 16:9 |
| Image Size | Pro only: Default, 1K, or 2K |
| Use Avatar References | Include character/user avatars as visual references |
| Include Descriptions | Add character descriptions to the prompt |
| System Instruction | Customize instructions for the image model |

## Troubleshooting

### OAuth Error
If you see "API keys are not supported by this API. Expected OAuth2 access token":
1. Make sure your SillyTavern is on the **latest staging branch**
2. Run `git pull` in your SillyTavern folder
3. Restart SillyTavern

## To-Do
[ ] Add Support for other Image generation services like Z-ai and Flux

## License

This project is released into the public domain under [The Unlicense](LICENSE). You are free to use, modify, and distribute this code for any purpose, with or without attribution.

## Credits

Created for use with [SillyTavern](https://github.com/SillyTavern/SillyTavern).
