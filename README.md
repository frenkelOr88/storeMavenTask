# storeMavenTask
** Don't forget to run npm install before using node app **

To run this service you need to set up my sql and run migration ( create all tables)
To make your life easier, you have under package.json 3 scripts:

1. mysql-up -> run mysql using docker ( you need to have docker install on your computer)
2. migration-db ->run migration and create all schema
3. start -> run the service

** important: when you run mysql docker it take few sec to setup ( up to 30 sec) wait till mysql is ready to run the migration and service **

** DB user name and pass:**

1. username: root
2. password: password
