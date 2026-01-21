# Context Image Generation 🍌

A SillyTavern extension that adds Gemini-powered image generation with character context and avatar references.

## What's New in v1.2

- **Provider Selection** - Choose between Google AI Studio or OpenRouter
- **4K Image Support** - Generate 4K images with Gemini 3 Pro
- **Dynamic Model List** - Models update automatically based on selected provider

## What's New in v1.1

- **Message Depth** - Include 1-10 previous messages as story context for better scene understanding
- **Previous Image Reference** - Use last generated image as style reference for consistency
- **File-Based Storage** - Images saved to files instead of base64 in chat logs

## Features

- **Message Generation Button** - Wand icon in the dropdown menu on each message to generate an image from that message's content
- **Character Context** - Automatically includes character and user descriptions in prompts
- **Avatar References** - Uses character and user avatars as visual references for consistent art
- **Slash Command** - `/proimagine <prompt>` for quick generation

## Requirements

> ⚠️ **Important:** A Paid Tier of AiStudio or OpenRouter credits is needed to generate pictures. Free version will not work.

- SillyTavern (latest staging branch)
- Google AI Studio API key OR OpenRouter API key configured in SillyTavern
- A Gemini model with image generation capability:
  - `Nano Banana 🍌` (Flash) - Faster, cheaper (~$0.04/image)
  - `Nano Banana Pro 🍌` (Pro) - Higher quality, 4K support (~$0.14/image)

## Installation

1. Navigate to your SillyTavern in the Extensions.
2. Click on Install Extension Button and paste this repo link
3. Configure your API key in Chat Completion settings
4. Profit!
   
## Usage

### Message Button
1. Open a chat with a character
2. Click the "..." menu on any message
3. Click the wand icon (✨) to generate an image from that message

### Settings Panel
- Select your provider (Google AI Studio or OpenRouter)
- Choose model, aspect ratio, and image size
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
| Provider | Google AI Studio or OpenRouter |
| Model | Flash (~$0.04) or Pro (~$0.14) |
| Aspect Ratio | 1:1, 3:4, 4:3, 9:16, or 16:9 |
| Image Size | Pro only: Default, 1K, 2K, or 4K |
| Message Depth | Number of messages to include as context (1-10) |
| Use Avatar References | Include character/user avatars as visual references |
| Include Descriptions | Add character descriptions to the prompt |
| Use Previous Image | Use last generated image as style reference |
| System Instruction | Customize instructions for the image model |

## Troubleshooting
- Swiping a picture will result in an error.


## To-Do
[ ] Add Support for other Image generation services like Z-ai and Flux

## License

This project is released into the public domain under [The Unlicense](LICENSE). You are free to use, modify, and distribute this code for any purpose, with or without attribution.

## Credits

Created for use with [SillyTavern](https://github.com/SillyTavern/SillyTavern).
