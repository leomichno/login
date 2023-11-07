import {useState} from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constant";
import type { AuthResonseError } from "../type/types";
import DefaultLayout from "../layout/DefaultLayout";

export default function Login (){
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const auth = useAuth();
    const [errorResponse,setErrorResponse] = useState("")
    const goTo = useNavigate()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/login`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            if (response.ok){
                console.log("login successfully");
                setErrorResponse("");
                goTo("/");
            }else{
                console.log("Something went wrong")
                const json = await response.json() as AuthResonseError;
                setErrorResponse(json.body.error)
                return
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (auth.isAuthenticated){
        return <Navigate to="/dashboard"/>
    }
    return(
    <DefaultLayout>
        <form className="form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            {!! errorResponse && <div className="errorMessage">{errorResponse}</div>}
            <label htmlFor="">Usarname</label>
            <input type="text" value={username} onChange={(e)=> setusername(e.target.value)}/>

            <label htmlFor="">Password</label>
            <input type="password" value={password} onChange={(e)=> setpassword(e.target.value)}/>

            <button>Login</button>
        </form>;
    </DefaultLayout>)
}
