const Pool = require('pg').Pool;

const pool = new Pool({
    user: "root",
    password: "root", //add your password
    database: "testwad",
    host: "localhost",
    port: "5432"
});

const execute = async(query) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query); // executes a query
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

/* 
gen_random_uuid() A system function to generate a random Universally Unique IDentifier (UUID)
An example of generated uuid:  32165102-4866-4d2d-b90c-7a2fddbb6bc8
*/

const createTblQuery1 = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

execute(createTblQuery1).then(result => {
    if (result) {
        console.log('If does not exists, create "users" table');
    }
});

const createTblQuery2 = `
    CREATE TABLE IF NOT EXISTS "posttable" (
	    "id" SERIAL PRIMARY KEY,         
	    "date" VARCHAR(200) NOT NULL,
        "title" VARCHAR(200) NOT NULL,
	    "body" VARCHAR(200) NOT NULL
    );`;

// A function to execute the previous query   
execute(createTblQuery2).then(result => {
    if (result) {
        console.log('If does not exists, create the "posttable" table');
    }
});

module.exports = pool;