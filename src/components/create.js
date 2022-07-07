import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./card";

function Create() {
    const axios = require('axios').default;
    const navigate = useNavigate();
    const [listID, setListID] = useState("");
    const [listCategory, setListCategory] = useState("");
    const [loadingCategory, setLoadingCategory] = useState("");

    const { state } = useLocation();
    const { userName } = state;
    
    async function onClick(event) {

        if (event.target.value === undefined) {
            setLoadingCategory(event.target.name);
        }
        else setLoadingCategory(event.target.value);

        axios({
            method: 'post',
            url: "https://enigmatic-falls-42765.herokuapp.com",
            data: {
                category: (event.target.value ? event.target.value : event.target.name), 
                player: userName
            }
          })
          .then(function (response) {
            const id = response.data;
            setListID(id);
            setListCategory(event.target.value ? event.target.value : event.target.name);

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

    return (
        
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
                    <Card value="random" label="Random Subjects" onClick={onClick} loadingCategory={loadingCategory} />
                    <Card value="books" label="Books" onClick={onClick} loadingCategory={loadingCategory} />
                    <Card value="film" label="Film" onClick={onClick} loadingCategory={loadingCategory} />
                    <Card value="cartoon" label="Cartoon" onClick={onClick} loadingCategory={loadingCategory} />

                    <Card value="mythology" label="Mythology" onClick={onClick} loadingCategory={loadingCategory} />
                    <Card value="animals" label="Animals" onClick={onClick} loadingCategory={loadingCategory} />
                    <Card value="science" label="Science" onClick={onClick} loadingCategory={loadingCategory} />
                    <Card value="sports" label="Sports" onClick={onClick}  loadingCategory={loadingCategory} />

                    <Card value="computers" label="Computers" onClick={onClick} loadingCategory={loadingCategory} />
                    <Card value="mathematics" label="Mathematics" onClick={onClick} loadingCategory={loadingCategory} />
                    <Card value="geography" label="Geography" onClick={onClick} loadingCategory={loadingCategory} />
                    <Card value="history" label="History" onClick={onClick} loadingCategory={loadingCategory} />

                    <br />
                </div>

            </div>
        </div>

        </div>
    );

}

export default Create;


           
