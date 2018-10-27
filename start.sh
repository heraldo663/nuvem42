sequelize db:create
sequelize db:migrate
#build client
npm run client:build
# start the server
pm2 start ecosystem.config.js --env production

pm2 monitor