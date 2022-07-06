import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./components/create";
import Play from "./components/play";
// import Test from "./components/test";
// import Register from "./components/register";
// import Login from "./components/login";
import Enter_Name from "./components/enter-name";
import Home from "./components/home";
import Navbar from "./components/navbar";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Navbar />
                {/* <Test /> */}
                <Routes>
                    {/* <Route exact path="/" element={<Create />} /> */}
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/home" element={<Create />} />
                    <Route path="/play/:id" element={<Play />} />
                    {/* <Route path="/test" element={<Test />} /> */}
                    {/* <Route path="/register" element={<Register />} /> */}
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route path="/enter-name" element={<Enter_Name />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;