const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'o85qn2',
  e2e: {
    baseUrl: "http://localhost:5173",
  },

  component: {
    projectId: "o85qn2",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
