# README #

* Create sample database:
npm run migration

* Install the project:
change .env.example to .env
cd /server
npm install

* Run the project:
npm start

* Backup database:
mongodump -d <database_name> -o <directory_backup>
ex:
mongodump -d pscd-spa -o /var/backups/mongobackups

* Restore database:
mongorestore -d <database_name> <directory_backup>
ex:
mongorestore -d  pscd-spa /var/backups/mongobackups/pscd-spa