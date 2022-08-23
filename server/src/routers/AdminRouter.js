const express = require('express');
const sql = require('mssql');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async(req,res,next)=>{
    try{
        const admin = await sql.query(`SELECT AdminID FROM dbo.Manager WHERE (AdminID = '${req.body.adminID}' AND AdminPassword = '${req.body.password}')`);
        if( admin.recordset.length === 0 ) return res.status(404).send( {Message: 'User does not exist.'} );
        const token = jwt.sign( {payload: admin.recordset[0]}, process.env.SECRET, {expiresIn: "1h"} );
        return res.send( {name: admin.recordset[0].AdminID,token} );
    }catch(e){ return next(e); }
});

router.post('/auth', async(req,res,next)=>{
    try{
        const { token } = req.body;
        if( !token ) return res.status(403).send( {Message: 'No Authentication'} );
        const decoded = jwt.verify(token,process.env.SECRET);
        const admin = await sql.query(`SELECT AdminID FROM dbo.Manager WHERE AdminID = '${decoded.payload.AdminID}'`);
        res.send( {name: admin.recordset[0].AdminID } );
    }catch(e) { return next(e);}
});

router.get('/products', async(req,res,next)=>{
    try{
        const token = req.headers.token;
        if( !token ) return res.status(403).send( {Message: 'No Authentication'} );
        jwt.verify(token,process.env.SECRET);
        const products = (await sql.query(`SELECT * FROM Products`)).recordset;
        res.send( products );
    } catch(e){ return next(e); }
});

module.exports = router;