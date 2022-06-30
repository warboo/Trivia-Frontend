import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function Play() {
    const params = useParams();
    const id = params.id.toString();
    const [list, setList] = useState({});
    const [queries, setQueries] = useState([]);

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

            console.log(list);
        
        }

        getList();
        return;

    }, []);
    
    function createMarkup(str) {
        return {__html: str};
    }


    function showList() {

        console.log(queries);

        return (
            <div>
                <h1>Player: {list.player}</h1>

                <form>
                    {queries.map( (item, index) => {
                        return (
                            <div>
                                <h3 dangerouslySetInnerHTML={createMarkup(item.question)}></h3>
                                { item.all_choices.map( choice => {
                                    return (
                                        <div>
                                            <input type="radio" id={index + "-" + choice} name={index} value={choice} />
                                            <label htmlFor={index + "-" + choice} dangerouslySetInnerHTML={createMarkup(choice)}></label>
                                        </div>
                                    );
                                }) }
                            </div>
                        );
                    })}

                    <button type="submit">Submit</button>
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