# ESLint Rule: no-single-word-imports


## Description

This ESLint rule enforces naming conventions for imports of single-word identifiers within specific directories. It is part of the [eslint-plugin-greenwich](https://www.npmjs.com/package/eslint-plugin-greenwich) plugin.

The rule checks that single-word import names do not violate specified naming conventions in certain directory paths. In this rule's context, a "single-word import" refers to an import statement that imports a default export with a single-word identifier.

## Installation

To use this rule in your ESLint configuration, you can install the [eslint-plugin-greenwich](https://www.npmjs.com/package/eslint-plugin-greenwich) plugin using your preferred package manager.

1. **Using pnpm:**

   ```bash
   pnpm install eslint-plugin-greenwich --save-dev
   ```
2. **Using npm:**

   ```bash
   npm install eslint-plugin-greenwich --save-dev
   ```
3. **Using yarn:**

   ```bash
   yarn add eslint-plugin-greenwich --dev
   ```

## Rule Details

This rule checks import statements within specified directories (e.g., "/components/") and ensures that single-word import names adhere to specific naming conventions.

### Options

This rule supports the following configuration options:

- `allowedPrefixes` (array of strings, default: `[]`): Specifies a list of allowed prefixes for single-word import names. If provided, the rule allows import names that start with any of the specified prefixes.

## ESLint Configuration

To configure ESLint for your project, you can create or edit an ESLint configuration file (e.g., `.eslintrc.js`) in your project's root directory. Below is an example ESLint configuration:

```javascript
module.exports = {
  extends: ['eslint:recommended'], // Use recommended rules as a starting point
  plugins: ['greenwich'], // Add the 'greenwich' plugin
  rules: {
    'greenwich/no-single-word-imports': [
      'error',
      {
        allowedPrefixes: ['V', 'My'], // Customize allowed prefixes
      },
    ],
    // Add more rules and configurations as needed
  },
};
```

## Examples

Here are some examples of how this rule works:

```javascript
// Incorrect: Import name "Button" does not start with an allowed prefix.
import Button from './components/Button';

// Correct: Import name "VButton" starts with an allowed prefix "V."
import VButton from './components/Button';

// Correct: Import name "MyButton" starts with an allowed prefix "My."
import MyButton from './components/Button';
