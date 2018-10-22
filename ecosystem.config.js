module.exports = {
  apps: [
    {
      name: "fileserver",
      script: "./bin/www",
      watch: true,
      instances: 2
    }
  ]
};
