import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import Card from "./card";

function Home() {

    const navigate = useNavigate();
    
    function onClick() {
        navigate("/enter-name");
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    useEffect(() => {
        async function autoNavigate() {
            await delay(5000);
            navigate("/enter-name");
         }
         autoNavigate();
    }, []);
    

    return (
        <div>

        <section class="py-5 mt-5 text-center container bg-warning rounded bg-opacity-50">
            <div class="row py-lg-6">
                <div class="col-lg-7 col-md-8 mx-auto text-dark">
                    <h1 class="fw-bold fst-italic display-1">Trivia</h1>
                    <p class="lead fw-normal">A trivia game or competition is one where the competitors are asked questions about interesting but unimportant facts in many subjects.</p>
                </div>
            </div>
        </section>
        
        <div class="album py-5">
            <div class="container">

                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    <Card value="random" label="Random Subjects" onClick={onClick} />
                    <Card value="books" label="Books" onClick={onClick} />
                    <Card value="film" label="Film" onClick={onClick} />
                    <Card value="cartoon" label="Cartoon" onClick={onClick} />

                    <Card value="mythology" label="Mythology" onClick={onClick} />
                    <Card value="animals" label="Animals" onClick={onClick} />
                    <Card value="science" label="Science" onClick={onClick} />
                    <Card value="sports" label="Sports" onClick={onClick} />

                    <Card value="computers" label="Computers" onClick={onClick} />
                    <Card value="mathematics" label="Mathematics" onClick={onClick} />
                    <Card value="geography" label="Geography" onClick={onClick} />
                    <Card value="history" label="History" onClick={onClick} />

            <br />
                </div>

            </div>
        </div>

            
            

            {/* <hr />
            {<Link to={`/test/`}>TEST</Link>} */}

        </div>
    );

}

export default Home;


           
