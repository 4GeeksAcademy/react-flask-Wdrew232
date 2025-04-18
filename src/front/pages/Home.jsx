import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    const loadMessage = async () => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

        const response = await fetch(`${backendUrl}/api/hello`);
        const data = await response.json();

        if (response.ok) dispatch({ type: "set_hello", payload: data.message });

        return data;
    };

    const login = async () => {
        const option = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email: email,
                password: password })
        };

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, option);
        if (!response.ok) throw new Error("Invalid login credentials");

        else{
            const data = await response.json();
            dispatch({ type: "updateToken", payload: data.token_value });
            console.log(data.token_value, "this is my token after login");
            navigate("/demo")
        }

        
    };

    const signup = async () => {
        const option = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                 email: signupEmail, 
                 password: signupPassword })
        };

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, option);
        if (!response.ok) throw new Error("Signup failed");

        const data = await response.json();
        dispatch({ type: "updateToken", payload: data.token_value });
        console.log(data.token_value, "this is my token after signup");
    };


    useEffect(() => {
        loadMessage();
    }, []);

    return (
        <div>
            <div className="login">
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                <button onClick={login}>Login</button>
            </div>

            <div className="signup">
                <input onChange={(e) => setSignupEmail(e.target.value)} value={signupEmail} type="text" placeholder="Signup Email" />
                <input onChange={(e) => setSignupPassword(e.target.value)} value={signupPassword} type="password" placeholder="Signup Password" />
                <button onClick={signup}>Sign Up</button>
            </div>
        </div>
    );
};
// how to log in and go to a different page
// 1. go to Routes.jsx
// 2. add navigate PATH TO login in then response after dispatch
// 3. add a "private page" with the instructions above
// 4. go to Routes.jsx
// login, refresh as it stays logged in with sessions