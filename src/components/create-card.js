import React from "react";
import Ranking from "./ranking";

function Card (props) {
    const { value, label, onClick } = props;
    return (
        <div class="col">
          <div class="card shadow-sm">

            <img class="card-img-top" src={process.env.PUBLIC_URL+`image/${value}.jpg`} />
            <div class="card-body">
              <h3 class="card-title">{label}</h3>
              
              <Ranking category={value} />

              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" onClick={onClick} value={value}>Generate</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Play</button>
                </div>
              </div>
            </div>

          </div>
        </div>
        
    );
}

export default Card;