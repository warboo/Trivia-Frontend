import React, { useState, useEffect } from "react";

function Ranking(props) {
    const category = props.category;
    const [ rank_arr, setRank_arr ] = useState([]);

    useEffect(() => {
        async function getRanking() {
            const response = await fetch(process.env.REACT_APP_BACKEND + `/ranking/${category}`);

            if (!response.ok) {
              const message = `An error occurred: ${response.statusText}`;
              window.alert(message);
              return;
            }
        
            const records = await response.json();
            setRank_arr(records.ranking);
        }
    
        getRanking();
        return;

    }, []);


    return (
        <div>
            <table class="table">
            <tbody>
                {rank_arr.map( item => {
                    return (
                        <tr class="text-muted">
                            <td>{item[0]}</td>
                            <td>Score: {item[1]}/5</td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
            
        </div>
    );
}

export default Ranking;