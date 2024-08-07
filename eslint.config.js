import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
export default [
    {
        ...tseslint.config,
        ...reactRecommended,
        files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        ignores: ['**/*/config.js'],
        settings: {
            version: 'detect',
        },
        languageOptions: {
            ...reactRecommended.languageOptions,
            parser: typescriptParser,
            parserOptions: {
                project: true,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: { '@typescript-eslint': typescriptPlugin, react: reactPlugin },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            'no-duplicate-imports': 2,
            'no-unreachable-loop': 2,
            complexity: 1,
            eqeqeq: 1,
            'max-depth': 2,
            'no-empty-function': 1,
            'no-var': 1,
            'no-void': 1,
            'prefer-const': 1,
            'prefer-destructuring': 1,
            '@typescript-eslint/no-unused-vars': 1,
            '@typescript-eslint/no-explicit-any': 2,
            '@typescript-eslint/no-extra-non-null-assertion': 2,
            '@typescript-eslint/no-import-type-side-effects': 1,
            '@typescript-eslint/no-meaningless-void-operator': 1,
            '@typescript-eslint/no-namespace': 2,
            '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 2,
            '@typescript-eslint/no-redeclare': 2,
            '@typescript-eslint/no-require-imports': 2,
            '@typescript-eslint/no-unsafe-declaration-merging': 2,
            'react/jsx-key': 2,
            'react/display-name': 2,
            'react/jsx-no-comment-textnodes': 2,
            'react/jsx-no-duplicate-props': 2,
            'react/jsx-no-target-blank': 2,
            'react/jsx-no-undef': 2,
            'react/jsx-uses-react': 1,
            'react/jsx-uses-vars': 2,
            'react/no-danger': 2,
            'react/no-direct-mutation-state': 2,
            'react/no-find-dom-node': 2,
            'react/no-unknown-property': 2,
        },
    },
]
