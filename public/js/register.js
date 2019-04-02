    function name(){
        var $span1=$("div.rs-body>span:nth-child(2)");
        if(!$uname.val()){
            $span1.html("用户名不能为空");
            $span1.css("color","red");
        }else{
            $span1.html("用户名正确").css("color","#ccc");
        }      
    }  
    function pwd(){
        var $span2=$("div.rs-body>span:nth-child(5)");
        var res=/^(\d|\w){8,}$/ig;
        if(res.test($upwd.val())!=true){
            $span2.html("密码必须大于8位");
            $span2.css("color","red");
        }else{
            $span2.html("密码正确").css("color","#ccc");
        }    
    }
    function pwd1(){
        var $span3=$("div.rs-body>span:nth-child(8)");
        if($upwd.val()!=$upwd1.val()){
            $span3.html("密码不一致");
            $span3.css("color","red");
        }else{
            $span3.html("验证密码通过").css("color","#ccc");
        }     
    }
    function phone(){
        var $span4=$("div.rs-body>span:nth-child(11)");
        var res=/^1[3-8]\d{9}$/ig;
        if(res.test($phone.val())!=true){
            $span4.html("请填写正确的手机号");
            $span4.css("color","red");
        }else{
            $span4.html("号码正确").css("color","#ccc");
        } 
    }
    // 用户名验证  
    var $uname=$("input[name=uname]");
        $uname.blur(function(){
           name();
        })
     
    // 密码验证
    var $upwd=$("input[name=upwd]");
        $upwd.blur(function(){
            pwd();
        })
    var $upwd1=$("input[name=upwd1]");
        $upwd1.blur(function(){
             pwd1();
        })
    // 手机号验证
    var $phone=$("input[name=uphone]");
        $phone.blur(function(){
          phone();
        })
   
    //发送数据
    var $submit=$("div.rs-foot>input");
        $submit.click(function(){
            uname=$uname.val();
            upwd=$upwd.val();
            upwd1=$upwd1.val();
            uphone=$phone.val();
            $.ajax({
                url:"http://127.0.0.1:3000/user/user_register",
                type:"post",
                data:{uname,upwd,upwd1,uphone},
                dataType:"json",
                success:function(res){
                     if(res.code==401){
                        name();
                     }
                    if(res.code==402){
                        pwd();
                     }  
                    if(res.code==403){
                        pwd1();      
                    }
                    if(res.code==404){
                        phone();
                    }
                    if(res.code==407){
                        console.log(res);
                        var $span1=$("div.rs-body>span:nth-child(2)");
                        $span1.html("用户名已被占用");
                        $span1.css("color","red");
                    }
                    if(res.code==408){
                        var $span4=$("div.rs-body>span:nth-child(11)");
                        $span4.html("此号码已注册");
                        $span4.css("color","red");
                    } 
                    if(res.code==200){
                         location.href="http://127.0.0.1:3000/login.html";
                     } 
                }
            })
        })
        
