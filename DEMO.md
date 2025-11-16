# Demo Guide

This guide walks you through a quick demo of the Git Commit Message Generator extension.

## Step-by-Step Demo

### 1. Setup

1. Open this project in VS Code
2. Press `F5` to launch the Extension Development Host
3. A new VS Code window opens with the extension loaded

### 2. Prepare Test Changes

In the Extension Development Host window:

1. Open the `test-sample.js` file
2. Make a simple change, for example, add a new function:

```javascript
function power(base, exponent) {
    return Math.pow(base, exponent);
}
```

3. Save the file

### 3. Stage the Changes

Open the terminal and run:
```bash
git add test-sample.js
```

Or use VS Code's Source Control view:
- Click the Source Control icon in the sidebar
- Click the `+` icon next to `test-sample.js`

### 4. Generate Commit Message

**Method A: Using Command Palette**
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Generate Commit Message"
3. Press Enter

**Method B: Using Source Control Button**
1. Open Source Control view
2. Look for the sparkle (✨) icon in the title bar
3. Click it

### 5. Configure API Key (First Time Only)

When prompted:
1. Choose your API provider in settings (OpenAI or Gemini)
2. Enter your API key
3. The key will be saved securely

### 6. Review Generated Message

The extension will:
1. Show a progress notification
2. Generate a commit message (e.g., `feat: add power function`)
3. Insert it into the commit input box
4. Show a success notification

### 7. Edit and Commit

1. Review the generated message
2. Edit if needed (it's just a suggestion!)
3. Click the checkmark or press `Cmd+Enter` to commit

## Expected Results

For the demo change (adding a power function), you should see something like:
- `feat: add power calculation function`
- `feat: implement exponentiation method`
- `feat: add power function to calculator`

The exact wording may vary based on the AI provider and model.

## Testing Different Scenarios

### Bug Fix
1. Modify the `divide` function to improve error handling
2. Stage and generate
3. Expected: `fix: improve error handling in divide function`

### Documentation
1. Add JSDoc comments to functions
2. Stage and generate
3. Expected: `docs: add function documentation`

### Refactor
1. Rename variables or restructure code
2. Stage and generate
3. Expected: `refactor: improve code structure`

## Tips

- The quality of the commit message depends on the quality of your changes
- More descriptive code changes lead to better commit messages
- You can always edit the generated message before committing
- Try both OpenAI and Gemini to compare results

## Troubleshooting Demo Issues

**Extension doesn't load**
- Check the Debug Console for errors
- Make sure all dependencies are installed: `npm install`
- Recompile: `npm run compile`

**No API key prompt**
- Open VS Code Settings
- Search for "Git Commit Generator"
- Verify the API provider is selected

**Button not visible**
- Make sure you're in the Source Control view
- Check that the Git extension is enabled
- Ensure you're in a Git repository

## Video Walkthrough Script

If recording a demo:

1. [00:00] Introduction - "I'm going to show you the Git Commit Message Generator"
2. [00:10] Open project, press F5
3. [00:20] Make a code change
4. [00:30] Stage the change
5. [00:40] Click sparkle button or use Command Palette
6. [00:50] Show API key configuration (if first time)
7. [01:00] Wait for generation
8. [01:10] Show generated message in commit input
9. [01:20] Demonstrate editing capability
10. [01:30] Complete the commit
11. [01:40] Show in git log
12. [01:50] Conclusion - "Clean, conventional commit messages with AI!"

Total demo time: ~2 minutes

