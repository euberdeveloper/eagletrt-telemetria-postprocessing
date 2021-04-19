const path = require('path');

module.exports = {
    parserOptions: {
        project: path.join(__dirname, 'tsconfig.json') // The path to your tsconfig.json
    },
    plugins: ['@euberdeveloper'],
    extends: [
        'plugin:@euberdeveloper/typescript',
        'plugin:@euberdeveloper/unicorn',
        'plugin:@euberdeveloper/prettier'
    ],
    rules: {
        '@typescript-eslint/naming-convention': ['error',
            {
                selector: 'default',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: 'variable',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: 'variable',
                modifiers: ['const'],
                format: ['camelCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: 'classProperty',
                modifiers: ['static'],
                format: ['camelCase', 'UPPER_CASE']
            },
            {
                selector: 'objectLiteralProperty',
                format: ['camelCase', 'snake_case'],
            },
            {
                selector: 'objectLiteralMethod',
                format: ['camelCase', 'snake_case', 'UPPER_CASE'],
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'enumMember',
                format: ['UPPER_CASE'],
            }
        ],
        '@typescript-eslint/restrict-template-expressions': 'off'
    }
};
