# Git Commit Message Generator - Usage Guide

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Compile the Extension
```bash
npm run compile
```

### 3. Run the Extension in Development Mode

1. Open this folder in VS Code
2. Press `F5` to launch the Extension Development Host
3. A new VS Code window will open with the extension loaded

## Configuration

### Setting up API Key

The extension will prompt you for an API key on first use. The API key is stored securely using VS Code's SecretStorage API (encrypted in your system keychain).

**First Time Setup:**
1. Open Command Palette (`Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux)
2. Run "Generate Commit Message"
3. Enter your API key when prompted
4. The key is saved securely and encrypted

### Changing or Resetting API Key

**To Change Your API Key:**
1. Open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Type and select: "Git Commit Generator: Change API Key"
3. Enter your new API key
4. Done! The new key is saved securely

**To Reset/Delete Your API Key:**
1. Open Command Palette
2. Type and select: "Git Commit Generator: Reset API Key"
3. Confirm the deletion
4. Next time you generate a commit, you'll be prompted for a new key

**Use Cases:**
- Entered the wrong API key? Use "Change API Key"
- Switching between OpenAI and Gemini? Change the provider in settings, then use "Change API Key"
- Security concern or key compromised? Use "Reset API Key"
- Want to use a different key? Use "Change API Key"

### Changing API Provider

Open VS Code Settings and search for "Git Commit Generator":

- **API Provider**: Choose between `openai` or `gemini`
- **Model**: Specify the model name (e.g., `gpt-3.5-turbo`, `gpt-4`, `gemini-pro`)

## Usage

### Method 1: Command Palette

1. Make changes to your files
2. Stage the changes you want to commit (`git add`)
3. Open Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
4. Type "Generate Commit Message" and select the command
5. Wait for the AI to generate the message
6. The commit message will be inserted into the Source Control input box
7. Review and edit if needed, then commit

### Method 2: Source Control Button

1. Make changes to your files
2. Stage the changes you want to commit
3. Go to the Source Control view (sidebar icon or `Ctrl+Shift+G`)
4. Click the sparkle (✨) icon in the Source Control view title bar
5. The commit message will be generated and inserted
6. Review and edit if needed, then commit

## Commit Message Format

The extension generates messages following the **Conventional Commits** specification:

```
<type>(<optional scope>): <description>
```

### Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes

### Examples:
- `feat: add user authentication`
- `fix: resolve null pointer in login handler`
- `docs: update API documentation`
- `refactor(auth): simplify token validation`

## API Keys

### OpenAI
Get your API key from: https://platform.openai.com/api-keys

### Google Gemini
Get your API key from: https://makersuite.google.com/app/apikey

## Troubleshooting

### No staged changes error
Make sure you have staged some changes before running the command:
```bash
git add <files>
```

### API key not configured
If prompted, enter your API key. It will be saved securely for future use.

### Extension not working
1. Check the Output panel: View > Output > Select "Git Commit Generator"
2. Check the Developer Console: Help > Toggle Developer Tools
3. Make sure the Git extension is enabled
4. Ensure you're in a Git repository

### Rate limiting
If you hit API rate limits, consider:
- Using a higher tier API key
- Reducing the frequency of generations
- Using a different model

## Development & Testing

### Watch Mode
For development, run TypeScript in watch mode:
```bash
npm run watch
```

### Testing Scenarios

1. **New file addition**
   - Create a new file with some content
   - Stage it and generate commit message
   - Expected: `feat: add [filename/functionality]`

2. **Bug fix**
   - Fix a bug in existing code
   - Stage the changes
   - Expected: `fix: [description of fix]`

3. **Documentation update**
   - Update README or comments
   - Stage and generate
   - Expected: `docs: [description]`

4. **Multiple file changes**
   - Modify several files
   - Stage all changes
   - Expected: Comprehensive message covering all changes

5. **Test both API providers**
   - Configure OpenAI, generate a message
   - Switch to Gemini in settings, generate a message
   - Both should work correctly

