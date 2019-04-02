var $btn=$("input:button");
$btn.click(function(){
    var $uname=$("input:text");
    var $upwd=$("input:password");
    var uname=$uname.val();
    var upwd=$upwd.val();
    console.log(uname,upwd);
    $.ajax({
        url:"http://127.0.0.1:3000/user/user_login",
        type:"post",
        xhrFields: {
			//允许带上凭据
	        withCredentials: true
        },
        crossDomain: true,
        data:{uname,upwd},
        dataType:"json",
        success:function(res){
            console.log(res);
            function cl(name){
                name.css("color","red")
            }
            var $pwd=$upwd.next();
            var $name=$uname.next();
            if(res.code==401){  
                $name.html("用户名不能为空");
                cl($name)
            }
            if(res.code==402){
                $pwd.html("密码不能为空");
                cl($pwd)
            }
            if(res.code==403){
                alert("请检查用户名或者密码")
            }
            // if(res.code==404){
            //     $pwd.html("密码错误");
            //     cl($pwd)
            // }
            if(res.code==200){
                location.href="http://127.0.0.1:3000/index.html";

            }
        }
    })
})