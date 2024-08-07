export default {
    '*.{vue,js,json,ts,jsx,tsx}': ['eslint --fix --max-warnings=0', 'prettier --config .prettierrc --write'],
    '*.{html,htm}': 'prettier --config .prettierrc --write',
    '*.{css,scss}': 'stylelint --fix',
}
