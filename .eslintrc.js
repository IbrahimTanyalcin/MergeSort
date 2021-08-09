module.exports = {
  "extends": "eslint-config-airbnb-es5",
  "env": {
        "browser": true,
        "node": true,
		"amd": true
  },
  "eslint quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }]
};