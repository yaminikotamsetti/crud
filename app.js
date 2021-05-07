const mysql=require("mysql");
const express=require("express");
const bodyParser=require("body-parser");
const path=require("path");
const ejs=require("ejs");

var app=express();


var mysqlconn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"yamininov143@",
    database:"crud",

});

mysqlconn.connect((err)=>{
    if(err){
        console.log("Connection failed"+err.message);
    }
    else{
        console.log("Connected");
    }
});

//set views file
app.set('views',path.join(__dirname,'views'));
			
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',(req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM students";
    let query = mysqlconn.query(sql, (err, rows) => {
        if(err) 
            throw err;
        res.render('user_index', {
            title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            students : rows
        });
    });
});

app.get('/add',(req,res)=>{
    res.render('add',{
        title:'CRUD Operation using NodeJS / ExpressJS / MySQL'
    });
});

app.post('/save',(req,res)=>{
    let data= {name:req.body.name, course:req.body.course, college:req.body.clg};
    let sql="INSERT INTO students SET ?";
    let query= mysqlconn.query(sql,data,(err,results)=>{
        if(err)
            throw err;
        res.redirect('/');
    });
});

app.get('/edit/:studentid',(req,res)=>{
    const userId=req.params.studentid;
    let sql=`SELECT * from students where studentid= ${userId}`;
    let query= mysqlconn.query(sql,(err,result)=>{
        if(err) 
            throw err;
        res.render('edit',{
            title:'CRUD Operation using NodeJS / ExpressJS / MySQL',
            user: result[0]
        });
    });
});

app.post('/update',(req,res)=>{
    const id=req.body.id;
    let sql=`update students SET name='${req.body.name}', course='${req.body.course}',college='${req.body.clg}' where studentid=`+id;
    let query= mysqlconn.query(sql,(err,results)=>{
        if(err)
            throw err;
        res.redirect('/');
    });
});

app.get('/delete/:studentid',(req,res)=>{
    const userId=req.params.studentid;
    let sql=`DELETE  from students where studentid= ${userId}`;
    let query= mysqlconn.query(sql,(err,result)=>{
        if(err) 
            throw err;
        res.redirect('/');
        });
    });





// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});