module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es6: true
    },
    extends: [
      'airbnb',
      'prettier',
      'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
      ecmaFeatures: {
        experimentalObjectRestSpread: true,
        jsx: true,
        tsx: true
      },
      sourceType: 'module',
      allowImportExportEverywhere: true
    },
    plugins: ['prettier', 'babel', "@typescript-eslint"],
    parser: ['babel-eslint', '@typescript-eslint/parser'],
    rules: {
      'template-curly-spacing': 'off',
      'linebreak-style': ['error', 'unix'],
      quotes: ['warn', 'single'],
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 2,
          singleQuote: true,
          bracketSpacing: true,
          semi: true
        }
      ],
      'no-console': 'off',
      'no-unused-vars': 'off',
      'react/prop-types': 0,
      '@typescript-eslint/no-inferrable-types': 'off'
    },
    globals: {
      __dirname: false,
      process: false
    }
  };
  