Itai Melnik assignment 1 exercise 3
VS Code extension which generates relevant comments for git commits, based on the changes that were made.

# Git Commit Message Generator

A VS Code extension that uses AI (OpenAI or Google Gemini) to automatically generate meaningful commit messages following the Conventional Commits specification.

## Features

- 🤖 **AI-Powered**: Uses OpenAI GPT or Google Gemini to analyze your staged changes
- 📝 **Conventional Commits**: Generates messages in the standard format (`type: description`)
- 🔒 **Secure**: API keys stored securely using VS Code's SecretStorage (encrypted)
- ⚡ **Fast**: Quick generation with progress indicators
- 🎯 **Two Access Methods**: Command Palette or Source Control button
- 🔧 **Configurable**: Choose your AI provider and model
- 🔑 **Easy Key Management**: Change or reset your API key anytime

## Quick Start

1. Install dependencies: `npm install`
2. Compile the extension: `npm run compile`
3. Press `F5` to run in Extension Development Host
4. Stage some changes in a Git repository
5. Click the sparkle icon in Source Control or use Command Palette: "Generate Commit Message"
6. Enter your API key when prompted
7. Review and commit!

## Requirements

- VS Code 1.85.0 or higher
- A Git repository
- OpenAI API key or Google Gemini API key

## Configuration

Access settings via `Preferences > Settings > Git Commit Generator`:

- `gitCommentGenerator.apiProvider`: Choose `openai` or `gemini`
- `gitCommentGenerator.model`: Model name (e.g., `gpt-3.5-turbo`, `gemini-pro`)

## How It Works

1. Analyzes your staged Git changes
2. Sends the diff to your chosen AI provider
3. Generates a commit message following Conventional Commits format
4. Inserts the message into the Source Control input box
5. You review, edit if needed, and commit

## Conventional Commits Format

The extension generates messages like:
- `feat: add user login functionality`
- `fix: resolve memory leak in cache`
- `docs: update installation guide`
- `refactor: simplify error handling`

## API Keys

Get your API key:
- OpenAI: https://platform.openai.com/api-keys
- Google Gemini: https://makersuite.google.com/app/apikey

For detailed usage instructions, see [USAGE.md](./USAGE.md)

## License

MIT