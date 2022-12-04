module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: 'tsconfig.eslint.json'
  },
  rules: {
    'prettier/prettier': 'error',
    'import/no-unresolved': [
      'error',
      {
        plugins: [
          'module-resolve',
          {
            alias: {
              '@src': './src',
              '@routes': './src/routes',
              '@constrollers': './src/controllers',
              '@config': './src/confing'
            }
          }
        ]
      }
    ]
  }
};
