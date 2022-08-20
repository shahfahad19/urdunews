import React from "react";
import ViewPaper from "../Newspapers/ViewPaper";
import ViewMagazine from "../Newspapers/ViewMagazine";
import Filter from "../Newspapers/Filter";
import MagList from "../Newspapers/MagList";
import PapersList from "../Newspapers/PapersList";
import CitiesList from "./Newspapers/CitiesList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Routing = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path=""
                    element={
                        <>
                            <Filter />
                            <PapersList paperlist={props.data.papers} />
                        </>
                    }
                />
                <Route
                    path="/Magazines"
                    element={
                        <>
                            <Filter />
                            <MagList maglist={props.data.magazines} />
                        </>
                    }
                />
                <Route exact path="/:paper/:city" element={<ViewPaper />} />
                <Route
                    exact
                    path="/:paper"
                    element={
                        <CitiesList
                            paperlist={props.data.papers}
                            citieslist={props.data.cities}
                        />
                    }
                />
                <Route
                    exact
                    path="/Magazine/:magname"
                    element={<ViewMagazine />}
                />
                <Route path="*" element={<h2>404 Not Found</h2>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routing;
