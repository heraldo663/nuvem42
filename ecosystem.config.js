module.exports = {
  apps: [
    {
      name: "Nuvem42",
      script: "./src/bin/www",
      watch: true,
      instances: 2
    }
  ]
};
