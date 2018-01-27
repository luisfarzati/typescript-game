module.exports = {
  "hooks": {
    "pre-commit": "yarn test && ./scripts/version-check"
  }
}