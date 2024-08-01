/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatters: ["apps/**", "packages/**", "config/**"],
  extends: ["@saas/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true
  }
}