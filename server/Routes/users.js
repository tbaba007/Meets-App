const { response } = require("express");
const express = require("express");
const AppPool = require("../db/dbConnection");
const app = express.Router();

app.use((req, res, next) => {
  next();
});

app.get("/GetAll", async (req, res) => {
  AppPool.query(`select * from meets."User" where "isactive"=true order by "UserId" desc `, (err, results) => {
    if (!err) res.send(results.rows);
    else res.send(err);
  });
});


app.get("/CheckEmail/:email", (req, res) => {
  const { email } = req.params;
  AppPool.query(
    'Select "FirstName","LastName","Email","Mobile" from meets."User" where "Email"=$1',
    [email],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.post("/AddUser", async (req, res, next) => {
  const { FirstName, LastName, Email, StudentId, Mobile, Password } = req.body;
    AppPool.query(
    `insert into meets."User" 
    ("FirstName", "LastName", "Email", "StudentId", "Mobile", "Password", "isactive", "RoleId")
     values ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [FirstName, LastName, Email, StudentId, Mobile, Password, true, 2],(err,result)=>{
      if(err){
        res.send(err.message);
      }
      else{
        res.status(200).json("ok");

      }
    }
  );
 
});


app.put("/UpdateUser/:id", (req, res) => {
  const { FirstName, LastName, Mobile } = req.body;
  const { id } = req.params;
  AppPool.query(
    'update meets."User" set "FirstName"=$1, "LastName"=$2, "Mobile"=$3 where "UserId"=$4',
    [FirstName, LastName, Mobile, id],
    (err, result) => {
      if (!err) {
        res.sendStatus(200);
      } else {
        res.send(err.message);
      }
    }
  );
});

app.post("/auth", (req, res) => {
  const { Email, Password } = req.body;
  AppPool.query(`
  select U."FirstName",U."UserId",U."StudentId",r."name" as Role from meets."User" U
  JOIN 
  meets."Role" r
  on r.roleid = U."RoleId" 
  where U."Email"=$1 and U."Password"=$2`, [Email, Password], (err, results) => {
    if (err) {
      res.send(err)
    }
    else {
      res.send(results.rows)
    }
  })
})

app.put("/Disable/:id", (req, res) => {
  const { id } = req.params;
  AppPool.query('update meets."User" set "isactive"=false where "UserId"=$1', [id], (err, results) => {
    if (err) {
      res.send(err.message)
    }
    else {
      res.sendStatus(200)
    }
  })
})


module.exports = app;
