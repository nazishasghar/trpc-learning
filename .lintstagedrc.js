export default {
    '*.{vue,js,ts,jsx,tsx}': [
        'npm run ts-check',
        'eslint --fix --max-warnings=0',
        'prettier --config .prettierrc --write',
    ],
    '*.{html,htm}': 'prettier --config .prettierrc --write',
    '*.{css,scss}': 'stylelint --fix',
}
