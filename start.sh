sequelize db:create
sequelize db:migrate
#build client
#npm run install:client
#npm run build:client
# start the server
pm2 start ecosystem.config.js --env production

pm2 monitor
