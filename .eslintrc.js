module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "indent": ["error", 4],
        "class-methods-use-this": "off",
        "no-use-before-define": "off",
        "comma-dangle": "off",
        "max-len": ["error", { "code": 140 }],
        "implicit-arrow-linebreak": "off",
        "eqeqeq": "off",
        "arrow-body-style": "off",
        "function-paren-newline": ["error", "never"],
        "no-param-reassign": "off",
        "no-underscore-dangle": "off",
        "no-useless-return": "off",
        "no-trailing-spaces": ["error", { "ignoreComments": true }],
        "object-shorthand": "off",
        "no-prototype-builtins": "off",
        "prefer-destructuring": ["error", {
            "object": true,
        }, {
                "enforceForRenamedProperties": false
            }],
        "no-plusplus": "off",
        "radix": ["error", "as-needed"],
        "global-require": "off",
        "no-shadow": ["error", { "allow": ["err", "resolve", "reject", "result", "index", "connection"] }],
        "consistent-return": "off",
        "no-console": ["error", { allow: ["warn", "error", "log"] }],
        "func-names": ["error", "never"],
        "curly": "off",
        "prefer-template": "off",
        "nonblock-statement-body-position": ["error", "below"],
        "no-await-in-loop": "off",
        "max-len": "off",
        "import/no-unresolved": "off",
        "no-shadow": "off",
        "indent": "off",
        "no-continue": "off",
        "no-useless-escape": "off",
        "linebreak-style": "off",
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "object-curly-newline": "off",
        "no-lonely-if": "off",
        "default-case": "off",
        "no-case-declarations": "off"
    },
    "globals": {
        "logs": "readonly",
        "response": "readonly",
        "messages": "readonly",
        "statusCode": "readonly",
        "_": "readonly",
        "db": "readonly",
        "download": "readonly",
        "log": "readonly",
        "logStack": "readonly",
        "logRequest": "readonly",
        "monitor": "readonly",
    }
};