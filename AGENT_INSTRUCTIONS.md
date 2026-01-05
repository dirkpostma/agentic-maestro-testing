# Agent Instructions for Maestro Testing

This document provides step-by-step instructions for AI agents to set up, run, and fix issues in this Expo app using Maestro E2E tests.

## Your Mission

1. Set up the development environment
2. Run Maestro E2E tests
3. If tests fail: analyze, fix, and re-run
4. Repeat until all tests pass

## Step 1: Environment Check

Check if required tools are installed:

```bash
# Check Node.js
node --version  # Should be v16+

# Check if Maestro is installed
maestro --version
```

If Maestro is not installed, install it:
```bash
# Mac/Linux
curl -fsSL "https://get.maestro.mobile.dev" | bash

# Or via Homebrew (Mac)
brew tap mobile-dev-inc/tap
brew install maestro
```

## Step 2: Install Dependencies

```bash
# Navigate to project directory
cd ~/development/playground/agentic-maestro-testing

# Install npm packages
npm install
```

## Step 3: Start the Application

```bash
# Start Expo dev server
npm start

# Or run on specific platform
npm run ios     # For iOS Simulator (Mac only)
npm run android # For Android Emulator
npm run web     # For web browser
```

**Important**: The app must be running before executing Maestro tests.

## Step 4: Run Maestro Tests

In a new terminal (while app is running):

```bash
# Run all tests
maestro test .maestro

# Or run specific test
maestro test .maestro/counter-flow.yaml
```

## Step 5: Analyze Test Results

### If Tests Pass ✓
Great! Document what passed.

### If Tests Fail ✗
1. **Read the error message** carefully
2. **Identify the failing step** in the Maestro flow
3. **Locate the issue** in the code:
   - Missing `testID` attribute?
   - Wrong element text?
   - Logic error in component?
4. **Fix the code**
5. **Re-run the tests**
6. **Repeat** until tests pass

## Common Test Failure Patterns

### Pattern 1: Element Not Found
```
Error: Could not find element with testID="increment-button"
```
**Fix**: Add `testID="increment-button"` to the TouchableOpacity

### Pattern 2: Unexpected Text
```
Error: Expected "Count: 1" but found "Count: 0"
```
**Fix**: Check counter state logic, ensure increment function works

### Pattern 3: Wrong Initial State
```
Error: Expected counter to start at 0
```
**Fix**: Check initial state in useState

## Test Flow Structure

Maestro tests are in `.maestro/` directory as YAML files:

```yaml
appId: [package-id]
---
- launchApp
- assertVisible: "Counter: 0"
- tapOn:
    id: "increment-button"
- assertVisible: "Counter: 1"
```

## Expected Behavior

The counter app should:
- Start with count at 0
- Increment adds 1
- Decrement subtracts 1
- Reset returns to 0
- All buttons have proper testID attributes

## Debugging Tips

1. **Check testID attributes**: Every interactive element needs a testID
2. **Verify text content**: Maestro matches exact text
3. **Check component logic**: Ensure state updates correctly
4. **Run tests individually**: Isolate which test is failing
5. **Read App.tsx**: Understand the component structure

## Success Checklist

- [ ] Dependencies installed
- [ ] App runs without errors
- [ ] All Maestro tests execute
- [ ] All tests pass
- [ ] Code has proper testID attributes
- [ ] Counter logic works correctly

## IMPORTANT: Before Committing

**ALWAYS run E2E tests before committing code!**

```bash
# 1. Start the app
npm start

# 2. In another terminal, run tests
maestro test .maestro

# 3. Only commit if all tests pass
git add .
git commit -m "Your message"
git push
```

Never commit code with failing tests.

## Reporting Results

After completing the testing loop, report:
1. How many test runs were needed
2. What issues were found
3. What fixes were applied
4. Final test status (pass/fail)

## Next Steps After Success

Once tests pass, consider:
- Adding more test scenarios
- Testing edge cases (negative numbers, large numbers)
- Adding more complex interactions
- Testing error states
