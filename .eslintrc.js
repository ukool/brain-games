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
        'import/no-extraneous-dependencies': 'off',
        "max-len": ["error", { code: 120 }],
        "no-shadow": ["error", { "allow": ["state", "getters"] }],
        "no-param-reassign": ["error", { "ignorePropertyModificationsFor": ["state"] }],
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
