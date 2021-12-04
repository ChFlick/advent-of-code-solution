module.exports = {
  extends: [
    '@antfu',
  ],
  rules: {
    // force semicolons
    'semi': ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
    'curly': ['error', 'all'],
  },
};
