# Testing Guide for Git Commit Message Generator

This guide provides comprehensive testing scenarios to ensure the extension works correctly.

## Prerequisites

1. Extension is compiled (`npm run compile`)
2. Running in Extension Development Host (Press `F5`)
3. Have API keys ready for OpenAI and/or Gemini
4. Working in a Git repository

## Test Scenarios

### Test 1: Basic Functionality - New Feature

**Setup:**
1. Create a new file `test-feature.js`:
```javascript
function calculateSum(a, b) {
    return a + b;
}
module.exports = { calculateSum };
```

2. Stage the file: `git add test-feature.js`

**Execute:**
1. Click the sparkle icon in Source Control view
2. If prompted, enter your API key

**Expected Result:**
- Progress notification appears
- Commit message generated in format: `feat: add sum calculation function` (or similar)
- Message appears in commit input box
- Success notification shown

**Status:** ✅ Pass / ❌ Fail

---

### Test 2: Bug Fix

**Setup:**
1. Modify an existing file to fix a bug:
```javascript
// Before:
function divide(a, b) {
    return a / b;
}

// After:
function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero');
    }
    return a / b;
}
```

2. Stage the changes: `git add <file>`

**Execute:**
1. Use Command Palette: `Cmd+Shift+P` → "Generate Commit Message"

**Expected Result:**
- Message starts with `fix:`
- Describes the bug fix (e.g., `fix: handle division by zero error`)

**Status:** ✅ Pass / ❌ Fail

---

### Test 3: Documentation Update

**Setup:**
1. Update README or add comments:
```markdown
## New Section
Added documentation about API usage
```

2. Stage changes: `git add README.md`

**Execute:**
1. Generate commit message

**Expected Result:**
- Message starts with `docs:`
- Example: `docs: add api usage documentation`

**Status:** ✅ Pass / ❌ Fail

---

### Test 4: Multiple File Changes

**Setup:**
1. Modify 3 different files:
   - Add a feature to `auth.js`
   - Fix a bug in `utils.js`
   - Update `README.md`

2. Stage all: `git add .`

**Execute:**
1. Generate commit message

**Expected Result:**
- Message covers the main theme of changes
- Uses appropriate type (likely `feat` or `chore` for multiple changes)
- Example: `feat: implement authentication and fix utilities`

**Status:** ✅ Pass / ❌ Fail

---

### Test 5: No Staged Changes

**Setup:**
1. Make sure no files are staged
2. Run: `git reset` to unstage everything

**Execute:**
1. Try to generate commit message

**Expected Result:**
- Error notification: "No staged changes found. Please stage your changes first."
- No crash or unexpected behavior

**Status:** ✅ Pass / ❌ Fail

---

### Test 6: OpenAI Provider

**Setup:**
1. Open Settings
2. Set `gitCommentGenerator.apiProvider` to `openai`
3. Set `gitCommentGenerator.model` to `gpt-3.5-turbo`
4. Have staged changes ready

**Execute:**
1. Generate commit message

**Expected Result:**
- Successfully generates message using OpenAI
- Message follows Conventional Commits format

**Status:** ✅ Pass / ❌ Fail

---

### Test 7: Gemini Provider

**Setup:**
1. Open Settings
2. Set `gitCommentGenerator.apiProvider` to `gemini`
3. Set `gitCommentGenerator.model` to `gemini-pro`
4. Have Google Gemini API key
5. Have staged changes ready

**Execute:**
1. Generate commit message
2. Enter Gemini API key if prompted

**Expected Result:**
- Successfully generates message using Gemini
- Message follows Conventional Commits format

**Status:** ✅ Pass / ❌ Fail

---

### Test 8: API Key Persistence

**Setup:**
1. Enter API key when prompted
2. Close the Extension Development Host
3. Restart it (Press `F5` again)

**Execute:**
1. Generate commit message without being prompted for API key

**Expected Result:**
- API key is remembered
- No prompt for API key on subsequent uses

**Status:** ✅ Pass / ❌ Fail

---

### Test 9: Invalid API Key

**Setup:**
1. Clear stored API key (or enter invalid one)
2. Have staged changes

**Execute:**
1. Generate commit message
2. Enter an invalid API key (e.g., "invalid-key-123")

**Expected Result:**
- Error notification with meaningful message
- Example: "Failed to generate commit message: Unauthorized" or similar
- Extension doesn't crash

**Status:** ✅ Pass / ❌ Fail

---

### Test 10: Large Diff

**Setup:**
1. Create a file with 200+ lines of code
2. Stage it

**Execute:**
1. Generate commit message

**Expected Result:**
- Message generated successfully (diff truncated if needed)
- No timeout or error
- Reasonable commit message based on truncated diff

**Status:** ✅ Pass / ❌ Fail

---

### Test 11: Different Change Types

**Setup & Execute:**
Test each scenario separately:

a) **Refactor**: Reorganize code without changing functionality
b) **Style**: Format code, add/remove whitespace
c) **Test**: Add unit tests
d) **Chore**: Update dependencies or config files

**Expected Results:**
- Each should generate appropriate type prefix:
  - `refactor:` for reorganization
  - `style:` for formatting
  - `test:` for tests
  - `chore:` for maintenance

**Status:** ✅ Pass / ❌ Fail

---

### Test 12: Source Control Button Visibility

**Setup:**
1. Open Source Control view

**Execute:**
1. Look for sparkle icon in title bar

**Expected Result:**
- Sparkle icon visible in Source Control view
- Icon clickable and triggers command

**Status:** ✅ Pass / ❌ Fail

---

### Test 13: Non-Git Repository

**Setup:**
1. Open a folder that is NOT a Git repository

**Execute:**
1. Try to generate commit message

**Expected Result:**
- Error notification: "No Git repository found in workspace"
- Graceful handling, no crash

**Status:** ✅ Pass / ❌ Fail

---

## Testing Checklist Summary

- [ ] Test 1: Basic Functionality - New Feature
- [ ] Test 2: Bug Fix
- [ ] Test 3: Documentation Update
- [ ] Test 4: Multiple File Changes
- [ ] Test 5: No Staged Changes
- [ ] Test 6: OpenAI Provider
- [ ] Test 7: Gemini Provider
- [ ] Test 8: API Key Persistence
- [ ] Test 9: Invalid API Key
- [ ] Test 10: Large Diff
- [ ] Test 11: Different Change Types
- [ ] Test 12: Source Control Button Visibility
- [ ] Test 13: Non-Git Repository

## Manual Verification Steps

After running automated tests, manually verify:

1. ✅ Extension activates without errors
2. ✅ Command appears in Command Palette
3. ✅ Button appears in Source Control view
4. ✅ Configuration options appear in Settings
5. ✅ API key stored securely (check SecretStorage)
6. ✅ Generated messages follow Conventional Commits format
7. ✅ Messages are inserted correctly into commit input
8. ✅ Progress indicators work properly
9. ✅ Error messages are clear and helpful
10. ✅ Both OpenAI and Gemini providers work

## Bug Reporting

If you find issues, note:
- Test scenario number
- Steps to reproduce
- Expected vs actual behavior
- Error messages or console output
- VS Code version
- Extension version

## Performance Testing

- Response time should be < 10 seconds for typical diffs
- Extension should not impact VS Code performance
- Memory usage should be reasonable (check with Developer Tools)

