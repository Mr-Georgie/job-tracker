module.exports = {
    root: true,
    rules: {
      'prettier/prettier': 0,
      "react/prop-types": "off",
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: "module",
    },
    plugins: ["react", "import", "react-hooks"],
};