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


mongodb+srv://spa-project:spa-project@cluster0-ehldv.mongodb.net/pscd-spa?retryWrites=true&w=majority