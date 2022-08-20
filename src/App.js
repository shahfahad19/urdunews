import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Filter from "./Components/Newspapers/Main/Filter";
import MagList from "./Components/Newspapers/Main/MagList";
import PapersList from "./Components/Newspapers/Main/PapersList";
import ViewMagazine from "./Components/Newspapers/Main/ViewMagazine";
import ViewPaper from "./Components/Newspapers/Main/ViewPaper";
import CitiesList from "./Components/Newspapers/Main/CitiesList";
import Menu from "./Components/News/Main/Menu";
import PakistanNews from "./Components/News/Types/PakistanNews";
import Business from "./Components/News/Types/Business";
import Sports from "./Components/News/Types/Sports";
import Other from "./Components/News/Types/Other";
import Regional from "./Components/News/Types/Regional";
import International from "./Components/News/Types/International";
import Message from "./Components/Newspapers/Main/Message";
import { Redirect } from "./Components/Main/Redirect";
import { MainMenu } from "./Components/Main/MainMenu";
import { useEffect, useState } from "react";

function App() {
    const location = useLocation();

    const [data, setData] = useState({
        mags: [],
        papers: [],
        papersList: [],
        urduMags: [],
        urduPapers: [],
        urduPapersList: []
    });
    useEffect(() => {}, [location]);
    useEffect(() => {
        async function getNews() {
            let getData = await sendRequest("https://urdunewsapi.vercel.app/webapi");
            let data = JSON.parse(getData);

            let papersList = [];
            let urduPapersList = [];
            for (let i = 0; i < data.papers.length; i++)
                papersList.push(data.papers[i].name);

            for (let i = 0; i < data.urduPapers.length; i++)
                urduPapersList.push(data.urduPapers[i].name);

            data.papersList = papersList;
            data.urduPapersList = urduPapersList;

            setData(data);
        }

        function sendRequest(url) {
            return new Promise(function (resolve, reject) {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr.response);
                    }
                };
                xhr.send();
            });
        }
        getNews();
    }, []);

    return (
        <div className="App">
            <div className="logo">
                <span className="urdu">اردو</span>
                <span className="news"> نیوز</span>
            </div>
            {window.location.pathname !== "/" && (
                <div className="top-menu">
                    <NavLink to="/news" activeclassname="active">
                        خبریں
                    </NavLink>
                    <NavLink to="/newspapers" activeclassname="active">
                        اخبارات
                    </NavLink>
                </div>
            )}

            <Routes>
                <Route
                    path=""
                    element={
                        <>
                            <MainMenu />
                        </>
                    }
                />
                <Route
                    path="/newspapers"
                    element={
                        <>
                            <Redirect to="/newspapers/papers" />
                        </>
                    }
                />
                <Route
                    path="newspapers/papers"
                    element={
                        <>
                            <Filter />
                            <PapersList
                                paperlist={data.papers}
                                urduPapers={data.urduPapersList}
                            />
                        </>
                    }
                />
                <Route
                    path="newspapers/magazines"
                    element={
                        <>
                            <Filter />
                            <MagList
                                maglist={data.mags}
                                urdumaglist={data.urduMags}
                            />
                        </>
                    }
                />

                <Route
                    exact
                    path="newspapers/magazines/:magname"
                    element={
                        <ViewMagazine
                            maglist={data.mags}
                            urduMag={data.urduMags}
                        />
                    }
                />
                <Route
                    exact
                    path="newspapers/papers/:paper/:city"
                    element={
                        <ViewPaper
                            papers={data.papersList}
                            cities={data.papers}
                            urduCities={data.urduPapers}
                        />
                    }
                />
                <Route
                    exact
                    path="newspapers/papers/:paper"
                    element={
                        <>
                            <Filter />
                            <CitiesList data={data} />
                        </>
                    }
                />

                <Route
                    exact
                    path="news"
                    element={
                        <>
                            <Menu default="true" />
                            <PakistanNews />
                        </>
                    }
                />
                <Route
                    exact
                    path="news/pakistan"
                    element={
                        <>
                            <Menu />
                            <PakistanNews />
                        </>
                    }
                />
                <Route
                    exact
                    path="/news/sports"
                    element={
                        <>
                            <Menu />
                            <Sports />
                        </>
                    }
                />
                <Route
                    exact
                    path="/news/business"
                    element={
                        <>
                            <Menu />
                            <Business />
                        </>
                    }
                />
                <Route
                    exact
                    path="news/international"
                    element={
                        <>
                            <Menu />
                            <International />
                        </>
                    }
                />
                <Route
                    exact
                    path="news/regional"
                    element={
                        <>
                            <Menu />
                            <Regional />
                        </>
                    }
                />
                <Route
                    exact
                    path="news/other"
                    element={
                        <>
                            <Menu />
                            <Other />
                        </>
                    }
                />
                <Route
                    path="*"
                    element={
                        <>
                            <Message msg="صفحہ نہیں ملا" />
                        </>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
