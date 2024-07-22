import reactPlugin from 'eslint-plugin-react'
import eslintPlugin from 'eslint-plugin-eslint-plugin'

export default [
    {
        files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        ...reactPlugin.configs.flat.recommended,
        ...eslintPlugin.configs['flat/recommended'],
        ignores: ['**/*.config.js'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: { react: reactPlugin },
        rules: {
            'no-duplicate-imports': 2,
            'no-unreachable-loop': 2,
            camelcase: 2,
            complexity: 2,
            eqeqeq: 2,
            'max-depth': 2,
            'no-empty-function': 2,
            'no-var': 2,
            'no-void': 2,
            'prefer-const': 2,
            'prefer-destructuring': 2,
            'react/jsx-key': 2,
            'react/display-name': 2,
            'react/jsx-no-comment-textnodes': 2,
            'react/jsx-no-duplicate-props': 2,
            'react/jsx-no-target-blank': 2,
            'react/jsx-no-undef': 2,
            'react/jsx-uses-react': 2,
            'react/jsx-uses-vars': 2,
            'react/no-children-prop': 2,
            'react/no-danger': 2,
            'react/no-direct-mutation-state': 2,
            'react/no-find-dom-node': 2,
            'react/no-unknown-property': 2,
        },
    },
]
