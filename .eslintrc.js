module.exports = {
    env: {
        browser: true
    },
    extends: 'airbnb-base',
    rules: {
        'no-console': ['warn', { allow: [ 'warn' ] }],
        'prefer-destructuring': ['off']
    }
};