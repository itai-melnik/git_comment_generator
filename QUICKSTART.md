# Quick Start Guide

Get the Git Commit Message Generator extension running in 5 minutes!

## Prerequisites

- Node.js and npm installed
- VS Code installed
- An OpenAI or Google Gemini API key

## Steps

### 1. Install Dependencies (30 seconds)

```bash
npm install
```

### 2. Compile the Extension (10 seconds)

```bash
npm run compile
```

### 3. Launch Extension Development Host (5 seconds)

- Open this project in VS Code
- Press `F5` (or go to Run > Start Debugging)
- A new VS Code window will open with the extension loaded

### 4. Test the Extension (2 minutes)

In the new VS Code window:

1. **Open a Git repository** (or initialize one):
   ```bash
   git init
   ```

2. **Create/modify a file**:
   ```javascript
   // example.js
   function hello() {
       console.log("Hello, World!");
   }
   ```

3. **Stage the change**:
   ```bash
   git add example.js
   ```

4. **Generate commit message**:
   - Click the sparkle (✨) icon in the Source Control view, OR
   - Press `Cmd+Shift+P` (Mac) / `Ctrl+Shift+P` (Windows), type "Generate Commit Message"

5. **Enter API key** (first time only):
   - Choose your provider in Settings: `gitCommentGenerator.apiProvider`
   - Enter your API key when prompted

6. **Review and commit**:
   - The generated message appears in the commit input box
   - Edit if needed
   - Click checkmark to commit

## Done! 🎉

You've successfully run the Git Commit Message Generator extension!

## Next Steps

- Read [USAGE.md](./USAGE.md) for detailed instructions
- Check [TESTING.md](./TESTING.md) for comprehensive testing
- Follow [DEMO.md](./DEMO.md) for a full walkthrough

## Get API Keys

- **OpenAI**: https://platform.openai.com/api-keys
- **Gemini**: https://makersuite.google.com/app/apikey

## Troubleshooting

**Extension doesn't start?**
- Check terminal for errors
- Make sure `npm install` completed successfully
- Try `npm run compile` again

**No sparkle icon?**
- Make sure you're in the Source Control view
- Ensure you're in a Git repository
- Check that Git extension is enabled

**API errors?**
- Verify your API key is correct
- Check your API provider setting matches your key
- Ensure you have API credits/quota available

## Support

For issues or questions, check:
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Complete technical overview
- [TESTING.md](./TESTING.md) - Common issues and solutions
- VS Code Extension Development docs

---

**Total setup time**: ~5 minutes  
**First use experience**: Generate your first AI-powered commit message!

