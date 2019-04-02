const pool=require('../pool.js');
const express=require('express');
var router=express.Router();
//用户注册
router.post('/user_register',(req,res)=>{
    var obj=req.body;  
    var uname=obj.uname;
    var upwd=obj.upwd;
    var upwd1=obj.upwd1;
    var uphone=obj.uphone;
    if(!uname){
        res.send({code:401,msg:'uname required'});
    return;
    }
    var res1=/^(\d|\w){8,}$/ig;
    if(res1.test(upwd)!=true){
        res.send({code:402,msg:'upwd required'});
    return;
    }
    if(upwd1!=upwd){
        res.send({code:403,msg:"upwd1 required"});
        return;
    }
    var res2=/^1[3-8]\d{9}$/ig;
    if(res2.test(uphone)!=true){
        res.send({code:404,msg:'phone required'});
    return;
    }
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"*"
    })
    var sql="SELECT COUNT(*) AS c  FROM xm_user WHERE uname =? "
    pool.query(sql,[uname],(err,result)=>{
    if(err) throw err;
    if(result[0].c>0){
            res.write(JSON.stringify({code:407,msg:"用户名已存在"}));
            res.end();     
    }else{
            var   sql="SELECT COUNT(*) AS c  FROM xm_user WHERE uphone =? " 
            pool.query(sql,[uphone],(err,result)=>{
            if(err) throw err; 
            if(result[0].c>0){
                res.write(JSON.stringify({code:408,msg:"号码已注册"}));
                res.end(); 
            }else{
                var sql="INSERT INTO xm_user SET ?";
                pool.query(sql,[obj],(err,result)=>{
                    if(err) throw err ;
                    if(result.affectedRows>0){
                        res.write(JSON.stringify({code:200,msg:"注册成功"}));
                        res.end();
                    }
                })
            }
            }) 
        }  
    })
});
//用户登录
router.post('/user_login',(req,res)=>{
    var obj=req.body;
    var uname=obj.uname;
    var upwd=obj.upwd;
    if(!uname){
        res.send({code:401,msg:"用户名为空"})
    }
    if(!upwd){
        res.send({code:402,msg:"密码为空"})
    }
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"*",
        "Access-Allow-Credentials":true
    })
    var sql="SELECT uid FROM xm_user WHERE uname=? AND upwd=?"
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length==0){
            res.write(JSON.stringify({code:403,msg:"用户名或者密码错误"}));
            res.end();
        }else{
            var uid=result[0].uid;
            req.session.uid=uid;
            console.log(req.session);
            console.log( req.session.uid)
            res.write(JSON.stringify({code:200,msg:"登录成功"}));
            res.end();
        }
    })
});

//用户详细信息
router.post('/user_details',(req,res)=>{

});
//添加购物车
router.get('/user_shopping',(req,res)=>{
    var uid=req.session.uid;
    console.log(req.session);
    console.log(uid);
    if(!uid){
        res.send({code:203,msg:"请登录"});
    }else{
    var obj=req.query;
    
    var picture=obj.picture;
    var typeA=obj.typeA;
    var details=obj.details;
    var price=obj.price;
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"*",
        // "Access-Allow-Credentials":true
    });
    var sq="SELECT COUNT(*) AS c FROM xm_user_shoppingcat WHERE typeA=? AND uid=?";
    pool.query(sq,[obj.typeA,uid],(err,result)=>{
        if(err) throw err;
        var c=result[0].c
        if(c==0){
            var sql ="INSERT INTO xm_user_shoppingcat VALUES(?,?,?,?,?,?)";
            pool.query(sql,["",picture,typeA,details,price,uid],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.write(JSON.stringify({code:201,msg:"加入购物车成功"})); 
                    res.end();
                }
            })
        }else{
            res.write(JSON.stringify({code:202,msg:"购物车已存在"})); 
            res.end();
        }
    }) 
}     
});
//查询购物车
router.get("/shop_query",(req,res)=>{
     var uid=req.session.uid;
     console.log(uid)
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"*",
        // "Access-Allow-Credentials":true
    });
    var sql ="SELECT * FROM xm_user_shoppingcat WHERE uid=?";
        pool.query(sql,[uid],(err,result)=>{
            if(err) throw err;
            res.write(JSON.stringify(result));
            res.end();
        })
})
//购物车删除
router.get("/shop_delect",(req,res)=>{
    var name=req.query.name;
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"*",
        // "Access-Allow-Credentials":true
    });
    var sql="DELETE FROM xm_user_shoppingcat WHERE typeA=?"
    pool.query(sql,[name],(err,result)=>{
        if (err) throw err;
        console.log(result)
        if(result.affectedRows>0){
            res.write(JSON.stringify({code:200,msg:"删除成功"}));
            res.end();
        }else{
            res.write(JSON.stringify({code:201,msg:"删除失败"}));
            res.end();
        }
    })

})
//用户订单
router.get('/user_order',(req,res)=>{

});
//手机列表
router.get('/phoneList',(req,res)=>{
    var sql=`SELECT * FROM xm_phone_list`;
    pool.query(sql,(err,result)=>{
        if (err) throw err;
        res.writeHead(200,{
            "Access-Control-Allow-Origin":"*",
            // "Access-Allow-Credentials":true
        });
        res.write(JSON.stringify(result));
        res.end();
    })
});
//手机详情
router.get('/phone_details',(req,res)=>{
    var id=req.query.lid;
    var sql="SELECT * FROM xm_phone_list WHERE lid=?";
    pool.query(sql,[id],(err,result)=>{
        if (err) throw err;
        res.writeHead(200,{
            "Access-control-Allow-Origin":"*",
            // "Access-Allow-Credentials":true
        });
        res.write(JSON.stringify(result));
        res.end();
    })
});
//轮播图
router.get('/slideshow',(req,res)=>{});
//小米配件
router.get('/peijian',(req,res)=>{});
module.exports=router;
