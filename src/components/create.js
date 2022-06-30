import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Create() {
    const [category, setCategory] = useState("");
    const [listID, setListID] = useState("");
    const [listIsGenerated, setListIsGenerated] = useState(false);
    // const navigate = useNavigate();
    
    async function onClick(event) {
        const value = event.target.value;
        setCategory(value);
        const response = await fetch("http://localhost:3000", {
            method: "POST",
            body: JSON.stringify(category)
        });

        if (!response.ok) {
            const message = "An error occurred: ${response.statusText}";
            window.alert(message);
            return;
        }

        const id = await response.json();
        setListID(id);
        setListIsGenerated(true);
        setCategory("");

        console.log("ID is " + id);

        // navigate("/");

    }

    return (
        <div>
            <h1>Trivia Categories</h1>

            <button onClick={onClick} value="random">Random</button>
            {listIsGenerated && <Link to={`/play/${listID}`}>Play</Link>}

            {/* <button onClick={onClick} value="random">Books</button> */}
            {/* <button onClick={onClick} value="random">Animals</button> */}

            

        </div>
    );

}

export default Create;

/* <div onClick={onClick}><h3>Random</h3></div>
            <div onClick={onClick}><h3>Books</h3></div>
            <div onClick={onClick}><h3>Film</h3></div>
            <div onClick={onClick}><h3>Cartoon</h3></div>

            <div onClick={onClick}><h3>Science & Nature</h3></div>
            <div onClick={onClick}><h3>Animals</h3></div>
            <div onClick={onClick}><h3>Computers</h3></div>
            <div onClick={onClick}><h3>Mathematics</h3></div>

            <div onClick={onClick}><h3>Mythology</h3></div>
            <div onClick={onClick}><h3>Sports</h3></div>
            <div onClick={onClick}><h3>Geography</h3></div>
            <div onClick={onClick}><h3>History</h3></div> */

