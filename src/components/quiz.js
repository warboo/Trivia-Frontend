import React, { useState, useEffect } from "react";
import { useParams, useNavigete } from "react-router";

function Query() {
    const [list, setList] = useState({
        player: "",
        queries: []
    });

    const params = useParams();
    const navigate = useNavigete();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const res = await fetch("http://localhost:3000/lists/${params.id.toString()}");
            
            if (!res.ok) {
                const message = "An error has occurred: ${res.statusText}";
                window.alert(message);
                return;
            }

            const record = await Response.json();
            if (!record) {
                window.alert("Record with id ${id} not found");
                navigate("/");
                return;
            }

            setList(record);
        
        }

        fetchData();
        return;

    }, [params.id, navigate]);

    function onSubmit(event) {
        event.preventDefault();
    }

    return (
        <div>
            <h1>Trivia Questions</h1>
            <from onSubmit={onSubmit}>
                {list.queries.map(querySet => {
                    const incorrect_answers = {querySet.incorrect_answer};
                    const allChoices = [{querySet.correct_answer}, ...incorrect_answers];
                    allChoices.sort();

                    return (
                        <h4>{querySet.question}</h4>
                    );
                })}
            </from>
        </div>
    );
}