module.exports = {
    env: {
        browser: true
    },
    extends: 'airbnb-base',
    rules: {
        'no-console': ['warn', { allow: [ 'warn' ] }],
        'no-underscore-dangle': ['off'],
        'prefer-destructuring': ['off']
    }
};