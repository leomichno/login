export interface AuthResonse {
    body:{
        user:User;
        accesstoken:string;
        refreshtoken:string;
    };
}
export interface AuthResonseError{
    body:{
        error:string;
    }
}
export interface User{
    _id:string;
    name:string;
    username:string;
}