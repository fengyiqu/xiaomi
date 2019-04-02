const express=require('express');
const bodyParser=require('body-parser');
const userRouter=require('./routes/user.js');
var server=express();
server.listen(3000);
// const cors=require('cors');
// server.use(cors({
// 	// origin:["http://127.0.0.1:3000","http://localhost:3000"],
// 	credentials:true
// }))
const session = require('express-session');
server.use(session({
	secret:"128位随意字符",
	resave:false,
	saveUninitialized:true,
	cookie:{
		maxAge:1000*60*60*8,
	}
}))
const cookieParser=require('cookie-parser')
server.use(cookieParser());
// server.use( function(req,res,next){
//     if( req.session.id ){
//         next();
//     }else{
//         res.send("<script>alert('您还没有登录，请先登录！');location.href='/user_login';</script>");
//     }
// } );
server.use(express.static('../public'));
server.use(bodyParser.urlencoded({
	extended:false
}));
server.use('/user',userRouter);