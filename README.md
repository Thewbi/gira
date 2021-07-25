# Awesome Project Build with TypeORM

## Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm run start` command

## Add a new router

1. Stop the app
1. create typescript file in /routes
1. In /index.ts, import the router and add it to the app
```
app.use('/tasks', taskRouter);
```
1. Save all files
1. Start the app

## Prepare the database

https://www.postgresql.org/docs/12/tutorial-createdb.html

1. Install postgres
2. Create the database

```
$ cd /Library/PostgreSQL/13/bin
$ ./createdb --username=postgres gira
```

## Update TypeORM to work with postgresql 13

in api/package.json change
```
"typeorm": "^0.2.20"
```
to
```
"typeorm": "^0.2.21"
```

