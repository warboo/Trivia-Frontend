import React from "react";

function Test() {

    async function onSubmit(event) {
        event.preventDefault();
        const data = {
            name: "qwerty",
            number: 10
        }

        console.log("Print Data");
        console.log(data);

        await fetch("http://localhost:3000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        })
        .catch(error => {
            window.alert(error);
            return;
        })
        .then(server_data => {
            console.log(server_data); // JSON data parsed by `data.json()` call
        });

        console.log("POST request sent");
    }

    return (
        <div>
            <h1>Welcome to test</h1>
            <form onSubmit={onSubmit}>
                <button type="submit">POST</button>
            </form>
        </div>
    );

}
  

export default Test;