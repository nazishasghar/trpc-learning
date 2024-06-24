module.exports = {
    root: true,
    env: {
        node: true,
        jest: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
        // Interfaceの前にかならずIをつける
        'interface-name-prefix': 0,
        // functionの返値の型指定を必須にする
        'explicit-function-return-type': 0,
        // any の型定義を禁止
        '@typescript-eslint/no-explicit-any': 2,

        // 多すぎる括弧はPrettierで消されるのでこちらはエラーを出さない
        '@typescript-eslint/no-extra-parens': 0,
        // 無駄なスペースは削除
        'no-multi-spaces': 2,
        // 不要な改行は削除
        'no-multiple-empty-lines': [2, { max: 2 }],
        // 関数とカッコはあけない
        'space-before-function-paren': [0, 'never'],
        // true/falseを無駄に使うな
        'no-unneeded-ternary': 2,
        // varは禁止
        'no-var': 2,
        // コンソールは使用しない
        'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
        // 配列のindexには空白入れるな(hogehoge[ x ])
        'computed-property-spacing': 2,
        // キー
        'key-spacing': 2,
        // キーワードの前後には適切なスペースを
        'keyword-spacing': 2,
        // 使ってない変数は警告
        '@typescript-eslint/no-unused-vars': [
            1,
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: false,
                argsIgnorePattern: '^_',
            },
        ],
        // nullableのメソッドからの返り値をnon nullに強制キャストしない
        '@typescript-eslint/no-non-null-assertion': 0,
        // キャメルケースの使用を容認
        camelcase: 0,
        // ts-ignoreを使わない
        '@typescript-eslint/ban-ts-comment': [
            2,
            {
                'ts-expect-error': false,
            },
        ],
        'prettier/prettier': [
            'error',
            {
                printWidth: 120,
                tabWidth: 4,
                useTabs: false,
                semi: false,
                singleQuote: true,
                trailingComma: 'all',
                bracketSpacing: true,
                arrowParens: 'always',
            },
        ],
    },
}

