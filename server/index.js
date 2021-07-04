const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors")
const multer = require('multer');
const uuid = require('uuid').v4;


const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 5;

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET","POST"],
    credentials: true,
}))
app.use(express.json())


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      key: "user_id",
      secret: "hackathon",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24*1000,
      },
    })
  );


const db = mysql.createConnection({
    user: 'root',
    host:'localhost',
    password: 'password',
    database: 'newsfeed',
    multipleStatements:true
})


//Posts and Gets for authentication starsts-----------------------------------------------------------------------------------------------------------------------------------------------------------

//Register
app.post('/Signup',(req,res)=>{
     const user_name= req.body.user_name;
     const password= req.body.password;
     
    
     bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
        }

        db.query('select * from users where user_name=?',[user_name],(err,result)=>{
            if(err){
                console.log(err)
            }
            if(result.length>0){
               res.send({message:'No'})
            }
            else{
                db.query(
                    "insert into users (user_name, password) VALUES (?,?)",
                    [user_name, hash],
                    (err, result) => {
                        if(err){
                          console.log(err);
                        }
                        else{
                           
                            res.send({message:'Yes'})
                        }
                    }
                  );

            }
        }
        )
        
        
        
    
      });


})



//Login 

app.get("/Login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } 
    else {
      res.send({ loggedIn: false });
    }
  });



app.post('/Login',(req,res)=>{
    const user_name= req.body.user_name;
    const password= req.body.password;
    
    db.query("select * from users where user_name=?;",
        [user_name],
            (err,result)=>{
        
                if(err) {
                    console.log(err)
                }

                if (result.length > 0) {
                    bcrypt.compare(password, result[0].password, (error, response) => {
                            if (response) {
                                req.session.user = result
                                
                                res.send(result);
                            } 
                            else {
                                res.send({ message: "Wrong username/password combination!" });
                            }
                        
                        }
                    );
                } 
                else {
                    res.send({ message: "User doesn't exist" });
                }
        
            
            }
    )


})

//Logout

app.post('/Logout', (req, res) => {
     
      req.session.destroy((err) => {
          if(err) res.send(err);
          
        }
      )
      res.clearCookie('user');
      
      
    
  })
//Posts and Gets for authentication Ends-----------------------------------------------------------------------------------------------------------------

//For Voting starts---------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.post('/vote',(req,res)=>{
    const current_user = req.body.current_user;
    const image_path = req.body.image_path;
   
    db.query("SELECT * FROM votes_added where image_path=? and user_name=?",[image_path,current_user],(err,result)=>{
                    if(err) {
                        console.log(err)
                    }
                    else{
                        
                        res.send(result)
                    }
                }
            )
})

app.post('/voteAdd',(req,res)=>{
    const user_name = req.body.user_name;
    const current_user= req.body.current_user;
    const image_path = req.body.image_path;
   
    db.query("Insert into votes_added (image_path,user_name) values(?,?);  update uploads set total_votes=total_votes+1 where image_path=? and user_name=?;",
                [image_path,current_user,image_path,user_name],(err,result)=>{
                    if(err) {
                        console.log(err)
                    }
                    else{
                        
                        res.send(result)
                    }
                }   
           )
})

//For Voting ends----------------------------------------------------------------------------------------------------------------------------------------------------------------



//For File upload & manipulation Starts--------------------------------------------------------------------------------------------------------------------------------------------------------------------

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
         cb(null, '../client/public/images')
     },
     filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, originalname);
    }
   
 })
  const upload = multer({ storage }); 




app.post('/upload', upload.single('image'), (req, res) => {
    
   
    const user_name = req.body.name
    const filename= req.file.filename
    const caption= req.body.caption
    const postedTime=req.body.postedTime

  
    db.query("INSERT INTO uploads (user_name,image_path,total_votes,caption,postedTime) VALUES (?,?,?,?,?)",
            [user_name,filename,0,caption,postedTime],
                (err,result)=>{
                if(err) {
                    console.log(err)
                }
                else{
                    res.send('Values Inserted')
                }
                }
           )
   
});



app.get('/content',(req,res)=>{
    db.query("SELECT upload_id,user_name,image_path,total_votes,caption,postedTime FROM uploads",(err,result)=>{
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})


//For File upload & manipulation Ends----------------------------------------------------------------------------------------------------------------------------------------------------



app.listen(3001, ()=>{
    console.log("Hooray it is running in server 3001!")
})
