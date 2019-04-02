$(function(){
    var lid=location.search.split("=")[1];
    $.ajax({
        url:"http://127.0.0.1:3000/user/phone_details",
        type:"get",
        data:{lid},
        // xhrFields: {
        //     //允许带上凭据
        //     withCredentials: true
        // },
        // crossDomain: true, 
        dataType:"json",
        success:function(res){
            var d=res[0];
            console.log(d.lid);
            var details=$("#detail>div:last-child");
            var html=`<div >
                        <img src="${d.picture}" alt=""/>
                      </div>
                      <div>
                        <div>${d.typeA}</div>
                        <div>${d.details}</div>
                        <div>${d.price}元</div>
                        <div>选择版本</div>
                        <div>
                            <a href="javascript:;">全网通版6GB+64GB | 2499元</a>
                            <a href="javascript:;">全网通版6GB+128GB | 2899元</a>
                        </div>
                        <div>选择颜色</div>
                        <div>
                            <a href="javascript:;">亮黑色</a>
                        </div>
                        <div>
                            <div class="d-flex">
                                <div class="mr-5">${d.typeA}</div>
                                <div class="mr-5">全网通版 6GB内存 64GB </div>
                                <div class="ml-5">亮黑色</div>
                            </div>
                            <div class="pt-4">总计:<span>2499元</span></div>
                        </div>
                        <div >
                            <button>立即选购</button>
                            <button onclick="fun(${d.lid})">加入购物车</button>
                        </div>
                      </div>`
            details.html(html);
            var $a1=$(".detail2>div:last-child>div:nth-child(5)>a:first-child");
            var $a2=$a1.next();
            var pri=$a1.html().split("|")[1];
            var type=$a1.html().split("|")[0];
            var pri1=$a2.html().split("|")[1];
            var type1=$a2.html().split("|")[0];
            var $div=$(".detail2>div:last-child>div:nth-child(3)");
            var $div1=$(".detail2>div:last-child>div:nth-child(8)>div:last-child>span");
            var $div2=$(".detail2>div:last-child>div:nth-child(8)>div:first-child>div:nth-child(2)")
            // console.log($div2);
            // console.log(type1,type);
            $a1.click(function(){
                $div.html(pri);
                $div1.html(pri);
                $div2.html(type);
            })
            $a2.click(function(){
                $div.html(pri1);
                $div1.html(pri1);
                $div2.html(type1);
            }) 
        }
    }) 
})
function fun(lid){
        $.ajax({
            url:"http://127.0.0.1:3000/user/phone_details",
            type:"get",
            data:{lid},
            dataType:"json",
            xhrFields: {
                //允许带上凭据
                withCredentials: true
            },
            crossDomain: true,
            success:function(res){
            var r=res[0];
            var picture=r.picture;
            var typeA=r.typeA;
            var details=r.details;
            var price=r.price;
            $.ajax({
                url:"http://127.0.0.1:3000/user/user_shopping",
                type:"get",
                // xhrFields: {
                //     //允许带上凭据
                //     withCredentials: true
                // },
                // crossDomain: true,
                data:{picture,typeA,details,price},
                dataType:"json",
                success:function(data){
                    if(data.code==203){
                        alert("请登录")
                    }
                    if(data.code==201){
                        alert("加入购物车成功")
                    }
                    if(data.code==202){
                        alert("购物车已存在")
                    }
                }
        })

            }
        })
    }