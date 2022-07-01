import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Create() {
    const [listID, setListID] = useState("");
    const [listIsGenerated, setListIsGenerated] = useState(false);
    // const navigate = useNavigate();
    
    async function onClick(event) {

        const response = await fetch("http://localhost:3000", {
            method: "POST",
            body: JSON.stringify({category: event.target.value}),
            headers: { 
                'Content-Type': 'application/json' 
                // 'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!response.ok) {
            const message = "An error occurred: ${response.statusText}";
            window.alert(message);
            return;
        }

        const id = await response.json();
        setListID(id);
        setListIsGenerated(true);

        console.log("ID is " + id);

        // navigate("/");

    }

    return (
        <div>
            <h1>Trivia Categories</h1>

            <button onClick={onClick} value="random">Random</button>
            <button onClick={onClick} value="books">Books</button>
            <button onClick={onClick} value="film">Film</button>
            <button onClick={onClick} value="cartoon">Cartoon</button>

            <br />

            <button onClick={onClick} value="mythology">Mythology</button>
            <button onClick={onClick} value="animals">Animals</button>
            <button onClick={onClick} value="science">Science</button>
            <button onClick={onClick} value="sports">Sports</button>

            <br />

            <button onClick={onClick} value="computers">Computers</button>
            <button onClick={onClick} value="mathematics">Mathematics</button>
            <button onClick={onClick} value="geography">Geography</button>
            <button onClick={onClick} value="history">History</button>

            <br />

            {listIsGenerated && <Link to={`/play/${listID}`}>Play</Link>}

            <hr />
            {<Link to={`/test/`}>TEST</Link>}

        </div>
    );

}

export default Create;


           
