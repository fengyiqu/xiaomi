$(function(){
    $.ajax({
        url:"http://127.0.0.1:3000/user/phoneList",
        type:"get",
        // xhrFields: {
        //     //允许带上凭据
        //     withCredentials: true
        // },
        // crossDomain: true,
        dataType:"json",
        success:function(res){
            var res = res;
            var $list1=$(".container>div:first-child");
            var $list2=$(".container>div:last-child");
            var p1=res.slice(0,5);
            var html1="";
            for(var key of p1){
                html1+=`<div class="bg-light col-2  text-center h-100 p-4" onclick="fn(${key.lid})">
                            <img src="${key.picture}" alt=""class="w-100 h-100"/>
                            <h6 class="mt-2">${key.typeA}</h6>
                            <p class=" p-2 ">${key.details}</p>
                            <h6>${key.price.toFixed(2)}</h6>
                        </div>`
            }
            $list1.html(html1);
            var p2=res.slice(-5);
            var html2="";
            for(var key1 of p2){
                html2+=`<div class="bg-light col-2  text-center h-100 p-4" onclick="fn(${key1.lid})">
                <img src="${key1.picture}" alt=""class="w-100 h-100"/>
                <h6 class="mt-2">${key1.typeA}</h6>
                <p class=" p-2 ">${key1.details}</p>
                <h6>${key1.price.toFixed(2)}</h6>
            </div>`
            }
            $list2.html(html2);
        } 
    })   
})
function fn(id){
    if(id){
        console.log(id);
        location.href="http://127.0.0.1:3000/detail.html?id="+id;
    }        
}