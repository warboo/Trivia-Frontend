import React from "react";
import Ranking from "./ranking";

function Card (props) {
    const { value, label, onClick, loadingCategory } = props;
    const isLoading = (loadingCategory === value);

    return (
        <div class="col">
          <div class="card shadow-sm">

            <img class="card-img-top hover-zoom" role="button" src={process.env.PUBLIC_URL+`image/${value}.jpg`} onClick={onClick} name={value} />
            <div class="card-body">
              <h3 class="card-title">{label}</h3>

              <Ranking category={value} />

              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-warning hover-zoom-btn ps-3 pe-3 rounded-pill shadow-sm" onClick={onClick} value={value}>Play</button>
                </div>

                {isLoading && 
                  <div class="spinner-border text-secondary spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                }

              </div>
            </div>

          </div>
        </div>
        
    );
}

export default Card;