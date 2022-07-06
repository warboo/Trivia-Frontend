import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Card from "./card";

function Create() {
    const axios = require('axios').default;
    const navigate = useNavigate();
    const [listID, setListID] = useState("");
    const [listIsGenerated, setListIsGenerated] = useState(false);
    const [listCategory, setListCategory] = useState("");
    const [rankingList, setRankingList] = useState([]);
    const [loadingCategory, setLoadingCategory] = useState("");
    // const userName = props.navigation.state.parmas.userName;
    const { state } = useLocation();
    const { userName } = state;

    // const navigate = useNavigate();
    
    async function onClick(event) {

        // const response = await fetch("http://localhost:3000", {
        //     method: "POST",
        //     body: JSON.stringify({category: event.target.value, player: userName}),
        //     headers: { 
        //         'Content-Type': 'application/json' 
        //         // 'Content-Type': 'application/x-www-form-urlencoded'
        //     }
        // });

        // if (!response.ok) {
        //     const message = "An error occurred: ${response.statusText}";
        //     window.alert(message);
        //     return;
        // }

        // const id = await response.json();
        // setListID(id);
        // setListIsGenerated(true);
        // setListCategory(event.target.value);

        // console.log("ID is " + id);

        // navigate("/");

        if (event.target.value === undefined) {
            console.log("Set category to " + event.target.name);
            setLoadingCategory(event.target.name);
        }
        else setLoadingCategory(event.target.value);
        axios({
            method: 'post',
            url: "http://localhost:3000",
            data: {
                category: (event.target.value ? event.target.value : event.target.name), 
                player: userName
            }
          })
          .then(function (response) {
            const id = response.data;
            setListID(id);
            setListIsGenerated(true);
            setListCategory(event.target.value ? event.target.value : event.target.name);

            console.log("ID is " + id);
            setLoadingCategory("");
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    useEffect(() => {
        if (listCategory !== "")
          navigate(`/play/${listID}`, {state: { category: listCategory }});
    }, [listCategory]);

    function play_onClick() {
        navigate(`/play/${listID}`, {state: { category: listCategory }});
    }

    return (
        // <div>
        //     <h1>Trivia Categories</h1>
        //     <p>Player: {userName}</p>

        //     <Card value="random" label="Random" onClick={onClick} />
        //     <Card value="books" label="Books" onClick={onClick} />
        //     <Card value="film" label="Film" onClick={onClick} />
        //     <Card value="cartoon" label="Cartoon" onClick={onClick} />

        //     <br />

        //     <Card value="mythology" label="Mythology" onClick={onClick} />
        //     <Card value="animals" label="Animals" onClick={onClick} />
        //     <Card value="science" label="Science" onClick={onClick} />
        //     <Card value="sports" label="Sports" onClick={onClick} />

        //     <br />
        //     <Card value="computers" label="Computers" onClick={onClick} />
        //     <Card value="mathematics" label="Mathematics" onClick={onClick} />
        //     <Card value="geography" label="Geography" onClick={onClick} />
        //     <Card value="history" label="History" onClick={onClick} />

        //     <br />

        //     {/* {listIsGenerated && <Link to={`/play/${listID}`}>Play</Link> } */}
        //     {listIsGenerated && <Link to={`/play/${listID}`} state={{ category: listCategory }}>Play</Link> }

        //     <hr />
        //     {<Link to={`/test/`}>TEST</Link>}

        // </div>

        <div>

        <section class="py-5 mt-5 text-center container bg-warning rounded bg-opacity-50">
            <div class="row py-lg-6 text-dark">
                <div class="col-lg-10 mx-auto">
                    <h1 class="fw-bold fst-italic display-1">Hello, {userName}.</h1>
                </div>
                <div class="col-lg-7 col-md-8 mx-auto">
                    <p class="lead fw-normal">A trivia game or competition is one where the competitors are asked questions about interesting but unimportant facts in many subjects.</p>
                </div>
            </div>
        </section>
        
        <div class="album py-5">
            <div class="container">
            
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    <Card value="random" label="Random Subjects" onClick={onClick} genCategory={listCategory} play_onClick={play_onClick} loadingCategory={loadingCategory} />
                    <Card value="books" label="Books" onClick={onClick} genCategory={listCategory} play_onClick={play_onClick} loadingCategory={loadingCategory} />
                    <Card value="film" label="Film" onClick={onClick} genCategory={listCategory} play_onClick={play_onClick} loadingCategory={loadingCategory} />
                    <Card value="cartoon" label="Cartoon" onClick={onClick} genCategory={listCategory} play_onClick={play_onClick} loadingCategory={loadingCategory} />

                    <Card value="mythology" label="Mythology" onClick={onClick} genCategory={listCategory} play_onClick={play_onClick} loadingCategory={loadingCategory} />
                    <Card value="animals" label="Animals" onClick={onClick} genCategory={listCategory} play_onClick={play_onClick} loadingCategory={loadingCategory} />
                    <Card value="science" label="Science" onClick={onClick} genCategory={listCategory} play_onClick={play_onClick} loadingCategory={loadingCategory} />
                    <Card value="sports" label="Sports" onClick={onClick} genCategory={listCategory} play_onClick={play_onClick} loadingCategory={loadingCategory} />

                    <Card value="computers" label="Computers" onClick={onClick} genCategory={listCategory} play_onClick={play_onClick} loadingCategory={loadingCategory} />
                    <Card value="mathematics" label="Mathematics" onClick={onClick} genCategory={listCategory} play_onClick={play_onClick} loadingCategory={loadingCategory} />
                    <Card value="geography" label="Geography" onClick={onClick} genCategory={listCategory} play_onClick={play_onClick} loadingCategory={loadingCategory} />
                    <Card value="history" label="History" onClick={onClick} genCategory={listCategory} play_onClick={play_onClick} loadingCategory={loadingCategory} />

            <br />
                </div>

            </div>
        </div>

        </div>
    );

}

export default Create;


           
