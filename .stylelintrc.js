export default {
    plugins: ['stylelint-order'],
    extends: ['stylelint-config-recommended', 'stylelint-config-recess-order', 'stylelint-config-standard'],
    ignoreFiles: [
        'node_modules/**/*',
        'src/test/unit/coverage/**/*',
        'cordova/**/*',
        'src/static/**',
        'src/public/**',
        '.output/**',
    ],
    rules: {
        'no-unknown-custom-properties': true,
        'max-nesting-depth': 3,
        'declaration-property-value-no-unknown': true,
        'no-unknown-animations': true,
        'no-unknown-custom-media': true,
    },
}
