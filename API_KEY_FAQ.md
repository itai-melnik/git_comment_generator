# API Key Management - FAQ

## Where is my API key stored?

Your API key is stored securely using **VS Code's SecretStorage API**, which means:

- ✅ **Encrypted** - Your key is encrypted, not stored in plain text
- ✅ **System Keychain** - Uses your operating system's secure storage:
  - **macOS**: Keychain
  - **Windows**: Credential Manager
  - **Linux**: Secret Service API (libsecret)
- ✅ **Not in settings.json** - Never appears in any configuration file
- ✅ **Not in version control** - Can't accidentally be committed to Git
- ✅ **Per workspace** - Each workspace can have its own key

## How do I change my API key?

If you entered the wrong key or want to use a different one:

1. Open Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`)
2. Type: **"Git Commit Generator: Change API Key"**
3. Enter your new API key
4. ✅ Done! New key is saved

## How do I delete/reset my API key?

To completely remove your stored API key:

1. Open Command Palette
2. Type: **"Git Commit Generator: Reset API Key"**
3. Confirm "Yes"
4. Your key is deleted securely

Next time you generate a commit message, you'll be prompted to enter a new key.

## I switched from OpenAI to Gemini (or vice versa). What do I do?

When switching AI providers:

1. **Change the provider setting**:
   - Go to Settings (`Cmd+,` or `Ctrl+,`)
   - Search: "Git Commit Generator"
   - Change `apiProvider` to `openai` or `gemini`

2. **Update your API key**:
   - Open Command Palette
   - Run: **"Git Commit Generator: Change API Key"**
   - Enter the API key for your new provider

That's it! The extension will now use the new provider and key.

## Common Scenarios

### ❌ "Unauthorized" or "Invalid API Key" error

**Solution:**
1. Your API key might be wrong or expired
2. Use **"Change API Key"** command to enter the correct one
3. Verify the key is for the right provider (OpenAI vs Gemini)

### 🔄 Switching between multiple projects with different keys

Each workspace can have its own API key! When you open a different project:
- The extension will use that workspace's stored key
- Or prompt you to enter one if it doesn't have one yet

### 🔒 I think my API key was compromised

**Immediate steps:**
1. Go to your AI provider's website and revoke/regenerate the key
2. In VS Code, run **"Reset API Key"** to delete the old one
3. When prompted, enter your new key

### 🌐 Can other extensions see my API key?

**No.** VS Code's SecretStorage is isolated per extension. Only the Git Commit Generator extension can access its stored secrets.

## Commands Reference

All commands are available in the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`):

| Command | What it does |
|---------|-------------|
| **Generate Commit Message** | Main feature - generates a commit message |
| **Git Commit Generator: Change API Key** | Update/change your API key |
| **Git Commit Generator: Reset API Key** | Delete your stored API key |

## Behind the Scenes

When you enter an API key, here's what happens:

1. ✅ Extension receives the key (via password-protected input)
2. ✅ Stores it using `context.secrets.store()`
3. ✅ VS Code encrypts it with system-level security
4. ✅ Key is saved to OS keychain
5. ✅ Never written to disk in plain text
6. ✅ Never logged or exposed

When generating a commit:
1. ✅ Extension retrieves key using `context.secrets.get()`
2. ✅ VS Code decrypts it
3. ✅ Key is used only for the API call
4. ✅ Never displayed or logged

## API Provider Settings

The **provider selection** (OpenAI vs Gemini) is stored in regular VS Code settings because:
- It's not sensitive information
- It's useful to see and change easily
- Different workspaces might use different providers

The **API key** is stored in SecretStorage because:
- It IS sensitive information
- It should never be visible
- It requires OS-level encryption

## Best Practices

✅ **DO:**
- Keep your API keys private
- Use separate keys for different projects if needed
- Regenerate keys periodically for security
- Use the "Change API Key" command to update keys

❌ **DON'T:**
- Don't share your API keys
- Don't commit keys to version control (the extension prevents this)
- Don't try to find the key in config files (it's encrypted)
- Don't use compromised keys - reset immediately

## Technical Details

For developers interested in the implementation:

- **Storage mechanism**: `vscode.ExtensionContext.secrets`
- **API**: Async get/store/delete methods
- **Key identifier**: `'gitCommentGenerator.apiKey'`
- **Encryption**: Handled automatically by VS Code
- **Platform integration**: Native keychain/credential manager

See `src/config.ts` for implementation details.

## Still Have Questions?

Check out:
- [USAGE.md](./USAGE.md) - Complete usage guide
- [README.md](./README.md) - Quick overview
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Technical details

