https://github.com/sequelize/sequelize-auto#readme

npx sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port] --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -t [tableName] -l es6

npx sequelize-auto -h localhost -d liveAddict -u root -x rootpwd -p 5001 --dialect mariadb -o "./lib/DAL/models" -l esm
