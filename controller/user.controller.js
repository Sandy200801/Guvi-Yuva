const { json } = require('body-parser');
const userService = require('../services/user.service');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


//handleError
const handleError= (err)=>{
   console.log(err.message,err.code);
   let error ={email:'',password:'',contact:''};

   //validation error

   if(err.message.includes('user validation failed')){
       console.log("Inside Include: "+ Object.values(err.errors));
   }
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id)=>{
    const token = jwt.sign({ id },"Secrets",{expiresIn:maxAge });

     return token;
}

exports.register_post = async (req,res)=>{

    const username= req.body.username;
     const password = req.body.password;
     const contact = req.body.contact;

     try{
        

        var passwordCrypted =  await bcrypt.hash(password,saltRounds);
    try{
        const response = await userService.createUser(username,passwordCrypted);

        if(response != null){

              
              res.render("login");
        }else{
            res.render("register");
           
        }

       
    }catch(err)
    {
        handleError(err);
    }

       }catch(err){
        handleError(err);
      }

    
}

exports.login_post = async (req,res)=>{
    const {username,password,contact,name} = req.body;

    const response = await userService.findUser(username);

    
  

    bcrypt.compare(password,response.password,(err,success)=>{
             if(success == true){
               // res.render('events', {data : some});
               const token = createToken(response._id);
               res.cookie('jwt',token,{httpOnly:true,maxAge :maxAge * 1000})
                return res.redirect('/welcome?useremail='+response.username);
             }else{
                return res.send(`<script>alert("Login Failed"); window.location.href = "/login"</script>`);
             }
    });
}

exports.login_get = (req,res)=>{
    res.render('login');
}

exports.register_get = (req,res)=>{
    res.render('register');
}

exports.welcome_get = (req,res)=>{

    var passedUserName = req.query.useremail;
    var passedUserContact = req.query.contact;

     req.body.name = passedUserName;

    res.render('welcome',{ username: passedUserName , contact: passedUserContact });
}

exports.post_text = (req,res)=>{
    const {email,password,contact} = req.body;
    res.json({email:email,password:password,contact:contact});
    res.send("Hello");
}


exports.setCookies = (req,res)=>{
    res.cookie('name','Yuva');
    res.cookie('sessionTime',true,{maxAge: 1000 * 60 * 60 *40,secure: true});
     res.send('You got a cookies');
};

exports.getCookies= (req,res)=>{
     const cookies = req.cookies;

     res.json(cookies.Email);
};
