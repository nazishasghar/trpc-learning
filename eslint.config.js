import reactPlugin from 'eslint-plugin-react'
import eslintPlugin from 'eslint-plugin-eslint-plugin'
import tsEslint from 'typescript-eslint'

export default [
    {
        files: ['src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        ...reactPlugin.configs.flat.recommended,
        ...eslintPlugin.configs['flat/recommended'],
        ...tsEslint.configs.strict,
        ...tsEslint.configs.stylistic,
        ignores: ['**/*.config.js'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: [{ react: reactPlugin }],
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
            'jsx-key': 2,
            'display-name': 2,
            'jsx-no-comment-textnodes': 2,
            'jsx-no-duplicate-props': 2,
            'jsx-no-target-blank': 2,
            'jsx-no-undef': 2,
            'jsx-uses-react': 2,
            'jsx-uses-vars': 2,
            'no-children-prop': 2,
            'no-danger': 2,
            'no-direct-mutation-state': 2,
            'no-find-dom-node': 2,
            'no-unknown-property': 2,
            'no-identical-tests': 2,
        },
    },
]
