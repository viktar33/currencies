import React from 'react';
import Currencies from "./components/currencies/currencies";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import SignIn from "./components/login/signIn";
import {BodyDiv} from "./components/ui/styled";
import CurrencyDetails from "./components/currencies/currencyDetails/currencyDetails";

function App() {
    return (
        <BodyDiv>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/currencies"/>}/>
                    <Route path="/currencies" element={<Currencies/>}/>
                    <Route path="/currencies/:id" element={<CurrencyDetails/>}/>
                    <Route path="/signIn" element={<SignIn/>}/>
                </Routes>
            </BrowserRouter>
        </BodyDiv>
    );
}

export default App;
