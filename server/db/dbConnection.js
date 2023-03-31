const Pool = require('pg').Pool;
const User=process.env.User;
const Host=process.env.Host;
const Database=process.env.Database;
const Password=process.env.Password;
const Port=process.env.DBPort;


 const AppPool=new Pool({
    user:User,
    host:Host,
    database:Database,
    password:Password,
    port:Port,
})

module.exports=AppPool