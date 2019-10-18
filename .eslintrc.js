module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
  ],
  "parser": "babel-eslint",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/webpack.config.js",
          "**/webpack.config.*.js",
        ],
      }
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": [
          "Link"
        ],
        "specialLink": [
          "to"
        ],
      }
    ],
    "max-len": [
      "error",
      100,
      2,
      {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
        // ignore function with specified types for parameters and return type
      ignorePattern: '.+=.*\\(.+:.+\\):\\s.+'
      }
    ],
    "react/require-default-props": [
      2,
      { forbidDefaultForRequired: false
      }
    ],
    "react/default-props-match-prop-types": [
      2,
      { allowRequiredDefaults: true
      }
    ],
  },
  "settings": {
    "import/resolver": {
      "node": {
        "moduleDirectory": [
          "src",
          "node_modules"
        ],
        "paths": [
          "src"
        ]
      },
    },
  }
};