export default {
    auth:false,
    check(){
        if(sessionStorage.getItem('user') != null){
            this.auth = true;
        }
        else{
            this.auth = false
        }
    }

}