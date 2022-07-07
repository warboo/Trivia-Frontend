import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Enter_Name () {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    function onChange(event) {
        const {value} = event.target;
        setUserName(value);
    }

    function onSubmit(event) {
        event.preventDefault();
        setUserName("");
        navigate("/home", {state: {userName: userName}});
    }

    return (

        <body class="text-center login">
        <main class="form-signin w-100 m-auto mt-5 text-center">
            <form onSubmit={onSubmit}>
                <img class="mb-4" src={process.env.PUBLIC_URL+`image/brain.png`} alt="" width="72" height="72" />
                <h1 class="h3 mb-3 fw-normal red-text">Enter your name</h1>

                <div class="form-floating">
                <input type="text" class="form-control" id="floatingName" onChange={onChange} name="name" value={userName} placeholder="Name" autoComplete="off" />
                <label for="floatingName">Name</label>
                </div>

                <button class="w-100 btn btn-lg btn-secondary" type="submit">Submit</button>
                <p class="mt-5 mb-3 text-muted">This name will be display in the rankings.</p>
            </form>
        </main>
        </body>
    );
}

export default Enter_Name;