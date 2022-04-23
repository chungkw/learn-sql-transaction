# SQL Transactions using the `mysql2` lib

Transactions are important in ensuring integrity of data manipulation in the database.

## Setup

Run the `init.sql` file to create the database and table.

Then, create a `.env` file and provide the following values:

```
db_host=localhost
db_port=3306
db_user=root
db_password=
db_name=
```

Use `node .` to start the server.

## Using `mysql2`

The library provides promises to work with and with `async`/`await`, we can avoid callback hell and write better code.

We create a promise-based connector to the database with this:

```js
const pool = mysql.createPool({
    host: DATABASE.HOST,
    port: DATABASE.PORT,
    user: DATABASE.USER,
    password: DATABASE.PASSWORD,
    database: DATABASE.NAME,
    debug: true
}).promise();
```

Now, we can work with the database using promises.

We can await for a connection from the pool, then use it to query the database. The query will also be promise-based.

```js
const conn = await pool.getConnection();

// start a transaction on the connection
await conn.beginTransaction();

try {
    const sql = `
        INSERT INTO user (username, description)
        VALUES (?, ?);
    `;

    const [rows, fields] = await conn.query(sql, [username, description]);

    // commit the changes
    await conn.commit();

    conn.release();
    return rows[0];
}
catch (error) {
    // undo changes
    await conn.rollback();

    // should release a connection always
    conn.release();
    // propagate error to caller
    throw error;
}
```
