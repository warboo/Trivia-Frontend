import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register () {
    const navigate = useNavigate();
    
    const [user, setUser] = useState({
        name: "",
        password: ""
    });

    function onChange(event) {
        const {name, value} = event.target;
        setUser( prevState => {
            return {
                ...prevState,
                [name]: value
            };
        })
    }

    async function onSubmit(event) {
        event.preventDefault();
        const response = await fetch ("http://localhost:3000/register", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json'  }
        });

        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const data = await response.json();
        console.log("Register: User ID is " + data.id);

        setUser({name: "", password: ""});

        navigate("/home", {state: {userID: data.id, userName: data.name}});
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} name="name" value={user.name} placeholder="Name" autoComplete="off"></input>
                <input type="password" onChange={onChange} name="password" value={user.password} placeholder="Password"></input>
                <button type="submit">Submit</button>
            </form>
            

        </div>
    );
}

export default Register;