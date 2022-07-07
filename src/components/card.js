import React from "react";
import Ranking from "./ranking";

function Card (props) {
    const { value, label, onClick, genCategory, play_onClick, loadingCategory } = props;
    const isGenerated = (genCategory === value);
    const isLoading = (loadingCategory === value);

    if (isGenerated) console.log("Category: " + label + " is generated!");

    return (
        <div class="col">
          <div class="card shadow-sm">

            <img class="card-img-top hover-zoom" role="button" src={process.env.PUBLIC_URL+`image/${value}.jpg`} onClick={onClick} name={value} />
            <div class="card-body">
              <h3 class="card-title">{label}</h3>

              <Ranking category={value} />

              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  {/* {!isGenerated && <button type="button" class="btn btn-sm btn-secondary hover-zoom-btn" onClick={onClick} value={value}>Select</button>}
                  {isGenerated && <button type="button" class="btn btn-sm btn-outline-secondary" disabled>Select</button>}
                  {!isGenerated && <button type="button" class="btn btn-sm btn-outline-secondary" disabled>Start</button>}
                  {isGenerated && <button type="button" class="btn btn-sm btn-success hover-zoom-btn" onClick={play_onClick}>Start</button>} */}
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