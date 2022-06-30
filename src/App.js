import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./components/create";
import Play from "./components/play";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Create />} />
                    <Route path="/play/:id" element={<Play />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;