import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

function Play() {
    const params = useParams();
    const navigate = useNavigate();

    const id = params.id.toString();
    const [list, setList] = useState({});
    const [queries, setQueries] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState();
    const [correct_answers, setCorrect_answers] = useState([]);

    useEffect(() => {
        async function getList() {
            const response = await fetch(`http://localhost:3000/lists/${id}`);
        
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const list = await response.json();
            setList(list);
            setQueries(list.queries);
            setAnswers(list.queries);

            console.log(list);
        
        }

        getList();
        return;

    }, []);
    
    function createMarkup(str) {
        return {__html: str};
    }

    async function onSubmit(event) {
        event.preventDefault();

        console.log("Answers");
        console.log(answers);

        const answersObject = {
            answers: answers
        };

        const response = await fetch(`http://localhost:3000/lists/${id}`, {
            method: "POST",
            body: JSON.stringify(answersObject),
            headers: {
                // 'Content-Type':  'application/x-www-form-urlencoded'
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const record = await response.json();
        if (!record) {
            window.alert(`Record with id ${id} not found`);
            return;
        }

        console.log("---------Sendback Data---------");
        console.log(record);

        setScore(record.score);
        setCorrect_answers(record.correct_answers);
    }

    function onChange(event) {
        const { value, name } = event.target;
        const arr = [ ...answers ];
        arr[name] = value;
        setAnswers(arr);
    }

    function onClick(event) {
        navigate("/");
    }

    function showAnswer(correct_answer, user_answer) {
        if (!score) return;
        if (correct_answer === user_answer) {
            return <h3 style={{color: "green"}}>CORRECT!</h3>;
        }
        else {
            return (
                <h3 
                    style={{color: "red"}} 
                    dangerouslySetInnerHTML={createMarkup("EXPECTED [" + correct_answer + "]")}>
                </h3>
            );
        }
    }

    function showLabel(index, correct_answer, choice) {
        if(!score || (choice !== correct_answer)) {
            return <label htmlFor={index + "-" + choice} dangerouslySetInnerHTML={createMarkup(choice)}></label>;
        }
        else {
            return <label htmlFor={index + "-" + choice} dangerouslySetInnerHTML={createMarkup(choice)} style={{color: "green", fontWeight: "bold"}} ></label>;
        }
    }


    function showList() {

        // console.log(queries);

        return (
            <div>
                <h1>Player: {list.player}</h1>
                { score && <h1 style={{color: "RoyalBlue"}}>Score: {score}</h1> }

                <form onSubmit={onSubmit}>
                    {queries.map( (item, index) => {
                        return (
                            <div>
                                <h3 dangerouslySetInnerHTML={createMarkup(item.question)}></h3>

                                {showAnswer(correct_answers[index], answers[index])}
                                
                                <p dangerouslySetInnerHTML={createMarkup(item.category)}></p>
                                <p dangerouslySetInnerHTML={createMarkup(item.difficulty)}></p>
                                { item.all_choices.map( choice => {
                                    return (
                                        <div>
                                            <input 
                                                type="radio" 
                                                id={index + "-" + choice} 
                                                name={index} 
                                                value={choice} 
                                                // checked={ answers[{index}] === {choice} }
                                                onChange={onChange}
                                            />

                                            {showLabel(index, correct_answers[index], choice)}

                                        </div>
                                    );
                                }) }
                            </div>
                        );
                    })}

                    {!score && <button type="submit">Submit</button>}
                    {score && <button type="button" onClick={onClick}>Home</button>}
                </form>

            </div>
        );
    }

    return (
        <div>
            <h1>Hello from play.js</h1>
            <p>Your ID is {id}</p>
            <hr />
            {showList()}
        </div>
    );
}

export default Play;