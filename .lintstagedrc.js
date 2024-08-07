export default {
    '*.{vue,js,json,ts,jsx,tsx}': async (files) => [
        'eslint --fix' + files,
        'prettier --config .prettierrc --write' + files.join(' '),
    ],
    '*.{html,htm}': 'prettier --config .prettierrc --write ',
    '*.{css,scss}': 'stylelint --fix',
}
