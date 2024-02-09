import React from 'react';
import { BrowserRouter, Link, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';


export function publicRoute(){
    const route = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/home" element={<Home />} />,
            <Route path="/sign-in" element={<SignIn />} />
        )
    )
}

export default publicRoute;
