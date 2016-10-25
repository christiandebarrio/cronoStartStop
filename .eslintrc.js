module.exports = {
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended", 
        "plugin:react/recommended"
    ],
    "env": {
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },

    "rules": {
        "no-set-state": "off",
        "indent": [ "error", 2],
        "linebreak-style": [ "error", "unix" ],
        "semi": [ "error", "always" ]
    }
};