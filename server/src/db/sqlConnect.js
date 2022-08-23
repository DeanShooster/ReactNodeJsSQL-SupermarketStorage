const sql = require('mssql');

const sqlConfig = {
    user: process.dev.SQLUSER,
    password: process.dev.SQLPASSWORD,
    database: process.dev.SQLDB,
    server: process.dev.SQLSERVER,
    options: {
        trustedConnection: true,
        keepAlive: true,
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const connectDb = async () => {
    try {
        await sql.connect(sqlConfig)
    } catch (err) {
        console.log(`mssql err connection: ${err}`)
    }
}

module.exports = connectDb;