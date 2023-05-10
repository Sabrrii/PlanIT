import {signIn} from "next-auth/react"
import {useSession} from "next-auth/react";
import {useState} from "react";

export default function loginSign() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const {data:session} = useSession();
    console.log(session);
    console.log('username: ' + username);
    console.log('password: ' + password);
    return (
        <>
            <label>
                Username
                <input name="username" type="text" onChange={(e)=>{setUsername(e.target.value)} }/>
            </label>
            <label>
                Password
                <input name="password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            </label>
            <button  onClick={()=>signIn("credentials",{username: username, password: password})}>Sign in</button>
        </>
    )
}