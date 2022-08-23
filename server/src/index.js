const express = require('express');
const cors = require('cors');
const {ErrorHandler} = require('./middleware/errorHandler');
const ConnectSqlDB = require('./db/sqlConnect');

const adminRouter = require('./routers/AdminRouter');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(adminRouter);
app.use(ErrorHandler);

app.listen(port, async ()=>{ console.log(`Server is on Port ${port}, Awaiting DB Connection...`); await ConnectSqlDB(); console.log('Connected to SQL DB.'); })

