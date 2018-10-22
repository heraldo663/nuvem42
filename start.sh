sequelize db:create
sequelize db:migrate
# start the server
pm2 start ecosystem.config.js --env production

pm2 monitor