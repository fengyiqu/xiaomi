$(function(){
    // var lid=location.search.split("=")[1];
    var $div=$("div#sp-details>div:nth-child(2)");
            $.ajax({
                url:"http://127.0.0.1:3000/user/shop_query",
                type:"get",
                xhrFields: {
                    //允许带上凭据
                    withCredentials: true
                },
                crossDomain: true,
                // data:{picture,typeA,details,price},
                dataType:"json",
                success:function(data){
                    var da=data; 
                    console.log(data)        
                    var  html="";
                    for(var d of da){        
                        html+=`<div class="border-bottom">
                                    <ul class="list-unstyled d-flex p-3 justify-content-between  row ">
                                        <li class="col-2"><input type="checkbox" /></li>
                                        <li class="d-flex col-4 style="width:80px;height:80px;">
                                            <img src="${d.picture}" alt="" style="width:80px;height:80px;"/>
                                            <span class="d-block">
                                                <span>${d.typeA}</span>
                                                <sapn>${d.details}</span>
                                            </span>
                                        </li>
                                        <li class="col-2">${d.price.toFixed(2)}</li>
                                        <li class="col-2">
                                            <button>+</button>
                                            <input type="text" value="1"/>
                                            <button>-</button>
                                        </li>
                                        <li class="col-1">${d.price.toFixed(2)}元</li>
                                        <li class="col-1" style="cursor:pointer">删除</li>
                                    </ul>
                            </div>`;                                     
                    } 
                    $div.prepend(html);
                    var allInput=$div.prev().find("input");
                    var input=$("#pro>.border-bottom>ul>li:first-child>input");
                    allInput.click(function(){
                        if($(this).hasClass("checked")){
                            $(this).removeClass("checked")
                        }else{
                            $(this).addClass("checked")
                        }
                        if(this.checked==true){
                            input.prop("checked",true);
                        }else{
                            input.prop("checked",false)
                        } 
                        var $tp=$("div#sp-details>div:nth-child(3)>ul>li:nth-child(2)>span:last-child");
                        var $xiaoji=$("#pro>div>ul>li:nth-child(5)");
                        if($(this).hasClass("checked")){
                            console.log($xiaoji)
                            for(var sum=0,i=0;i<=$xiaoji.length;i++){
                                var x=parseInt($xiaoji[i].innerHTML);
                                sum+=x;
                                console.log(sum)
                                $tp.html(sum+"元");
                            }
                            }else{
                                $tp.html(0+"元");
                            }
                    });
                    input.click(function () {
                        var $tp=$("div#sp-details>div:nth-child(3)>ul>li:nth-child(2)>span:last-child");
                        var $r=$(this).parent().parent().children(":last-child").prev();
                        if($(this).hasClass("checked")){
                            $(this).removeClass("checked")
                            $tp.html(parseInt($tp.html())-parseInt($r.html())+"元");
                        }else{
                            $(this).addClass("checked")
                            $tp.html(parseInt($tp.html())+parseInt($r.html())+"元");
                        }
                        if($(this).checked==true){
                            allInput.prop("checked", true);
                        }else{
                            allInput.prop("checked", false);
                        }
                        var $span1=$("#sp-details>div:nth-child(3)>ul>li:first-child>span:last-child>span:nth-child(1)")
                        var $span2=$span1.next().next();
                        var s = input.length;
                        var a=$("input:checked").length;
                        $span1.html(s);
                        $span2.html(a);
                        if (s != a) {
                            allInput.prop("checked", false);
                        } else {
                            allInput.prop("checked", true);
                        }    
                    });
                    var $btn=$("#pro>.border-bottom>ul>li>button");
                    $btn.click(function(){ 
                        var $ul=$(this).parent().parent();
                        var $input=$ul.children(":first-child").children(":first-child");
                        var $tp=$("div#sp-details>div:nth-child(3)>ul>li:nth-child(2)>span:last-child");
                        var $up=$(this).parent().prev();
                         var $xj=$(this).parent().next(); 
                        if($(this).html()=="+"){ 
                            var num=$(this).next().val();  
                            num++;
                            $(this).next().val(num);
                            if($input.hasClass("checked")){
                                $tp.html(parseInt($tp.html())+parseInt($up.html())+"元");
                            }
                         } 
                         if($(this).html()=="-"){ 
                            var num=$(this).prev().val();  
                            num--;
                            if(num==0){
                               return num=0;
                            }
                            $(this).prev().val(num);
                            if($input.hasClass("checked")){
                                $tp.html(parseInt($tp.html())-parseInt($up.html())+"元");
                            }
                         }
                        $xj.html($up.html()*num+"元");
                    })
                    var $re=$("#pro>div>ul>li:nth-child(6)")
                   
                    $re.click(function(){
                        var $re=$(this);
                       var $de=$(this).parent().parent();
                       $de.remove();
                       console.log(d.sid);
                    var name=$re.parent().find("span").children(":first-child").html();
                        console.log(name)
                        $.ajax({
                            url:"http://127.0.0.1:3000/user/shop_delect",
                            type:"get",
                            xhrFields: {
                                //允许带上凭据
                                withCredentials: true
                            },
                            crossDomain: true,
                            data:{name},
                            dataType:"json",
                            success:function(data){
                                console.log(data)
                                if(data.code==200){
                                    alert("删除成功")
                                }else(
                                    alert("删除失败")
                                )
                            }
                        })
                    })
                }
            })
        // }
    // })  
})