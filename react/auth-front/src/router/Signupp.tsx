import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constant";
import { AuthResonseError } from "../type/types";
import DefaultLayout from "../layout/DefaultLayout";

export default function Signupp (){
    const [username,setusername] = useState("")
    const [name,setname] = useState("")
    const [password,setpassword] = useState("")
    const auth = useAuth();
    const [errorResponse,setErrorResponse] = useState("")
    const goTo = useNavigate()
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/signup`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    username,
                    name,
                    password,
                }),
            });
            if (response.ok){
                console.log("Use created successfully");
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
        <form onSubmit={handleSubmit}>
            <h1>Signout</h1>
            {!! errorResponse && <div className="errorMessage">{errorResponse}</div>}
            <label htmlFor="">Usarname</label>
            <input type="text" value={username} onChange={(e) => setusername(e.target.value)}/>

            <label htmlFor="">Name</label>
            <input type="text" value={name} onChange={(e) => setname(e.target.value)}/>

            <label htmlFor="">Password</label>
            <input type="password" value={password} onChange={(e) => setpassword(e.target.value)}/>

            <button>Signupp</button>
        </form>;
    </DefaultLayout>)
}
