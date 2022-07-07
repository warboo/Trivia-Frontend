import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

function Play() {
    const params = useParams();
    const navigate = useNavigate();

    const { state } = useLocation();
    const { category } = state;

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
        
        }

        getList();
        return;

    }, []);
    
    function createMarkup(str) {
        return {__html: str};
    }

    async function sendingAnswer() {

        const answersObject = {
            answers: answers
        };

        const response = await fetch(`http://localhost:3000/lists/${id}`, {
            method: "POST",
            body: JSON.stringify(answersObject),
            headers: {
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

        setScore(record.score);
        setCorrect_answers(record.correct_answers);

        return record.score;
    }

    async function sendingRanking(scoreReturn) {
        const rankingObject = {
            category: category,
            player: list.player,
            score: scoreReturn
        };

        const response_rank = await fetch(`http://localhost:3000/ranking`, {
            method: "POST",
            body: JSON.stringify(rankingObject),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response_rank.ok) {
            const message = `An error has occurred: ${response_rank.statusText}`;
            window.alert(message);
            return;
        }

        const record_rank = await response_rank.json();
        if (!record_rank) {
            window.alert(`Record Rank with category ${category} not found`);
            return;
        }

    }

    async function onSubmit(event) {
        event.preventDefault();
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

        const scoreReturn = await sendingAnswer();
        sendingRanking(scoreReturn);        
    }

    function onChange(event) {
        const { value, name } = event.target;
        const arr = [ ...answers ];
        arr[name] = value;
        setAnswers(arr);
    }

    function onClick() {
        navigate("/home", {state: {userID: null, userName: list.player}});
    }

    function showAnswer(correct_answer, user_answer) {
        if (score === undefined) return;
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
        if(score === undefined || (choice !== correct_answer)) {
            return <label class="mb-2 ms-2 hover-zoom-btn" htmlFor={index + "-" + choice} dangerouslySetInnerHTML={createMarkup(choice)}></label>;
        }
        else {
            return <label class="mb-2 ms-2" htmlFor={index + "-" + choice} dangerouslySetInnerHTML={createMarkup(choice)} style={{color: "green", fontWeight: "bold"}} ></label>;
        }
    }

    function showChoice(index, choice) {
        return <input 
            type="radio" 
            id={index + "-" + choice} 
            name={index} 
            value={choice} 
            onChange={onChange}
        />;
    }


    function showList() {

        return (
            <div>
                <div class="container">
                <h3>
                    <span  role="button" class="badge rounded-pill bg-warning shadow-sm mt-3 mb-3 me-2 hover-zoom-btn ps-3 pe-3">
                        <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" title="Go to home" onClick={onClick} height="20" />
                    </span>

                    <span class="badge rounded-pill bg-secondary shadow-sm mt-3 mb-3 me-2">Player: {list.player}</span>
                    { score !== undefined && <span class="badge rounded-pill bg-primary shadow-sm me-2">Score: {score}</span> }
                </h3>
                </div>

                <div class="album">
                  <div class="container">
                    <div class="row row-cols-1 g-3">

                    <form onSubmit={onSubmit}>
                        {queries.map( (item, index) => {
                            return (
                                <div class="col mb-4">
                                    <div class="card shadow-sm">
                                    <div class="card-header">
                                        <span class="badge rounded-pill bg-warning shadow-sm bg-opacity-90 mb-2 mt-2 me-2"  dangerouslySetInnerHTML={createMarkup(item.category)}></span>
                                        <span class="badge rounded-pill bg-secondary shadow-sm bg-opacity-90"  dangerouslySetInnerHTML={createMarkup(item.difficulty)}></span>
                                    </div>
                                    <div class="card-body">
                                        {showAnswer(correct_answers[index], answers[index])}
                                        <h5 class="card-title mb-3 mt-2" dangerouslySetInnerHTML={createMarkup(item.question)}></h5>
                                        
                                        { item.all_choices.map( choice => {
                                        return (
                                            <div>
                                                {showChoice(index, choice)}
                                                {showLabel(index, correct_answers[index], choice)}
                                            </div>
                                        );

                                    }) }

                                    </div>
                                    </div>
                                    </div>
                            );
                        })}

                        {score === undefined && <button class="btn btn-secondary mb-4 shadow-sm hover-zoom-btn" type="submit">Submit</button>}
                        {score !== undefined && 
                          <h3>
                            <span role="button" class="badge rounded-pill bg-warning shadow-sm mb-3 me-2 hover-zoom-btn ps-3 pe-3">
                              <img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" title="Go to home" onClick={onClick} height="20" />
                            </span>
                          </h3>
                        }
                    </form>

                    </div>
                  </div>
                </div>
                

            </div>
        );
    }

    return (
        <div>
            {showList()}
        </div>
    );
}

export default Play;