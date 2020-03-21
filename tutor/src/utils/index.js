export const getRedirectTo = (type,header)=>{
   
    let path='';

    if(type==="teacher"){
        path = '/teacher';
    }else{
        path = '/student';
    }
    // 用 header 判斷是否完善訊息
    if(!header){
        path = path+"info";
    }
    
    return path;
}
