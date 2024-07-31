const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  env: {
    "AUTH_TOKEN": "762e48e3af3f2d41772685e5575c9f917b1eec16244b2576b7fb91e88d45e56b"
  },
  },
});
