const url = 'http://localhost:5000';

async function AdminLogin(credentials)
{
    const res = await fetch(`${url}/login`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return errorHandler(await res.json());
}

async function IsAdminLogged(token)
{
    const res = await fetch(`${url}/auth`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(token)
    });
    return errorHandler(await res.json());
}

async function GetProductList(token)
{
    const res = await fetch(`${url}/products`,{ 
        method: 'GET',
        headers: {token}
    });
    return errorHandler(await res.json());
}

function errorHandler( ob )
{
    if( ob.Message ) return { error: ob.Message };
    else return ob;
}

module.exports = {AdminLogin,IsAdminLogged,GetProductList};