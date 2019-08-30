const nuxtWebpackConfig = require('@nuxt/webpack');

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true
    },
    extends: [
        'plugin:vue/recommended',
        'airbnb-base'
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['vue'],
    rules: {
        'vue/script-indent': [
            'error',
            2,
            {
                baseIndent: 0
            }
        ],
        indent: ['error', 2],
        'vue/html-indent': [
            'error',
            2,
            {
                attribute: 1,
                baseIndent: 0,
                alignAttributesVertically: true
            }
        ],
        // TODO временно
        // 'no-restricted-syntax': 'off',
        // 'import/prefer-default-export': 'off',
        // 'no-plusplus': 'off',
        // 'no-restricted-globals': 'off',
        // 'func-names': 'off',
        'import/no-extraneous-dependencies': 'off',
        'vue/no-v-html': 'off',
        // 'guard-for-in': 'off',
        // 'no-shadow': 'off',
        // 'no-param-reassign': 'off',
        // 'consistent-return': 'off',
        // 'brace-style': 'off',
        // 'no-used-vars': 'on',
        // 'no-unused-expressions': 'off',
        // 'import/no-named-as-default-member': 'off',
        // 'no-multi-assign': 'off',
        // 'no-prototype-builtins': 'off',
        'max-len': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    settings: {
        'import/resolver': {
            nuxt: {
                extensions: ['.js', '.vue'],
            },
        },
    },
};
