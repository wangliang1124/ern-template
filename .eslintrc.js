const spellcheckSkipWords = require('./script/spell-check-skip-words');

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'spellcheck'],
  rules: {
    'no-console': 0,
    'react/jsx-uses-vars': 2,
    'no-unused-vars': ['warn', { args: 'none' }],
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/no-string-refs': 0,
    'react/no-deprecated': 0,
    semi: ['warn', 'always'],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 0,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 2,
    'no-extra-boolean-cast': 0,
    'no-prototype-builtins': 0,
    'spellcheck/spell-checker': [
      'warn',
      {
        comments: false,
        strings: true,
        identifiers: false,
        lang: 'en_US',
        skipWords: spellcheckSkipWords,
        skipIfMatch: [
          'http://[^s]*',
          'file://[^s]*',
          'cid:[^s]*',
          'uber://[^s]*',
          '\\w-\\w',
          'http(s)?://[^s]*',
          // Auxiliary werbs
          // see: https://github.com/aotaduy/eslint-plugin-spellcheck/issues/7
          "(\\s|^)\\w+'t(\\s|$)",
          // ordinals
          // https://github.com/aotaduy/eslint-plugin-spellcheck/issues/8
          '(\\s|^|\\w+)\\d+(st|nd|rd|th)(\\s|[A-Z][a-zA-Z]+|$)',
          // pre/post prefixes both in kebab case and camel case
          '(\\s|^)(pre|post)([-\\w]|[A-Z])[a-zA-Z]+(\\s|$)',
          // mimetypes
          '^[-\\w]+/[-\\w\\.]+$',
          // xml tags
          '<(?:/)?[\\w-]+>',
          // cryptographic octal hashes
          '^[0-9a-f]{5,999}$',
          // hex colors
          '^#[0-9a-f]{3,6}$',
        ],
        skipWordIfMatch: [],
        minLength: 3,
      },
    ],
    'require-await': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'object-curly-newline': 0,
    'max-len': [
      'error',
      {
        code: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    'no-use-before-define': 0,
    'no-shadow': 0,
    'react/state-in-constructor': 0,
    'no-unused-expressions': ['error', { allowShortCircuit: true }],
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'comma-dangle': [0, { functions: 'never' }],
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'react/jsx-props-no-spreading': 0,
    'operator-linebreak': 0,
    'prefer-const': [
      'error',
      {
        destructuring: 'all',
        ignoreReadBeforeAssign: false,
      },
    ],
    'import/no-cycle': 0,
    'no-bitwise': 0,
    'no-alert': 0,
    'no-iterator': 0,
    'no-restricted-syntax': ['error', 'WithStatement', "BinaryExpression[operator='in']"],
    'no-underscore-dangle': ['warn', { allowAfterThis: true }],
    'no-nested-ternary': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'react/static-property-placement': 0,
    'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
    'no-return-await': 0,
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            group: 'external',
            pattern: '~/**',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'max-classes-per-file': 0,
    'import/prefer-default-export': 0,
    camelcase: ['warn', { ignoreImports: true, ignoreDestructuring: true, ignoreGlobals: true }],
    'react/sort-comp': 1,
    'react/prefer-stateless-function': 1,
    'import/no-named-as-default': 1,
    'react/destructuring-assignment': 'warn',
    'react/no-unused-prop-types': 1,
    'react/jsx-wrap-multilines': [1, { prop: 'ignore' }],
  },
};
