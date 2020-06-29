# README #
* Make sure node version >=10

* Install the project:
change .env.example to .env
cd /server
npm install

* Create sample database:
npm run migration

* Run the project:
npm start

* Project will be run at localhost:3002 in dev

* Backup database:
mongodump -d <database_name> -o <directory_backup>
ex:
mongodump -d pscd-spa -o /var/backups/mongobackups

* Restore database:
mongorestore -d <database_name> <directory_backup>
ex:
mongorestore -d  pscd-spa /var/backups/mongobackups/pscd-spa

* Account default to login
/admin/login
admin@gmail.com/12345
spa@gmail.com/12345
user@gmail.com/12345

* Deploy to server:
- Login by SSH
- cd /var/wwww/spa.com
- git pull origin master 
- pm2 start index.json
- exit

Account:
pscd-spa e2p0jJ70W2tHSnpM

Alas DB:
Account: laule

mongodump --host Cluster0-shard-0/cluster0-shard-00-00-59lbw.mongodb.net:27017,cluster0-shard-00-01-59lbw.mongodb.net:27017,cluster0-shard-00-02-59lbw.mongodb.net:27017 --ssl --username pscd-spa --password e2p0jJ70W2tHSnpM --authenticationDatabase admin --db pscd-spa

mongorestore --host Cluster0-shard-0/cluster0-shard-00-00-59lbw.mongodb.net:27017,cluster0-shard-00-01-59lbw.mongodb.net:27017,cluster0-shard-00-02-59lbw.mongodb.net:27017 --ssl --username pscd-spa --password e2p0jJ70W2tHSnpM --authenticationDatabase admin 

MONGOOSE_DB_URL=mongodb+srv://pscd-spa:e2p0jJ70W2tHSnpM@cluster0-59lbw.mongodb.net/pscd-spa?retryWrites=true&w=majority

http://103.226.249.47:3002/admin/login
http://103.226.249.47:3002/login
admin@gmail.com/12345
spa@gmail.com/12345
editor@gmail.com/12345