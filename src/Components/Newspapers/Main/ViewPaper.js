import React from "react";
import { useParams } from "react-router";
import Alakhbar from "../PapersList/Alakhbar";
import PakObserver from "../PapersList/PakObserver";
import Dunya from "../PapersList/Dunya";
import Express from "../PapersList/Express";
import Is from "../PapersList/Is";
import Jang from "../PapersList/Jang";
import Jasarat from "../PapersList/Jasarat";
import JehanPakistan from "../PapersList/JehanPakistan";
import Jinnah from "../PapersList/Jinnah";
import Juraat from "../PapersList/Juraat";
import Khabrain from "../PapersList/Khabrain";
import Mashriq from "../PapersList/Mashriq";
import Naibaat from "../PapersList/Naibaat";
import NawaiWaqt from "../PapersList/NawaiWaqt";
import NtNews from "../PapersList/NtNews";
import Pakistan from "../PapersList/Pakistan";
import TheNation from "../PapersList/TheNation";
import Ummat from "../PapersList/Ummat";
import Message from "./Message";
import K2 from "../PapersList/K2";
import Patriot from "../PapersList/Patriot";
import BRecoder from "../PapersList/BRecoder";
const ViewPaper = (props) => {
	const papers = props.papers;
	const cities = props.cities;
	const date = new Date();
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	const nday = date.getDay();
	month = month < 10 ? "0" + month : month;
	day = day < 10 ? "0" + day : day;
	const fullDate = {
		day: day,
		nday: nday,
		month: month,
		year: year
	};
	const params = useParams();
	const paper = params.paper;
	let errorType = 0;
	let paperCities = [],
		cityIndex;
	const paperIndex = papers.indexOf(params.paper);
	if (paperIndex !== -1) {
		paperCities = cities[paperIndex];
		cityIndex = paperCities.cities.indexOf(params.city);
	}
	let paperName, cityName;

	if (paperIndex === -1) {
		errorType = "paper404";
	} else if (
		paperIndex !== -1 &&
		cityIndex === -1 &&
		paperCities.length > 0
	) {
		errorType = "city404";
	} else {
		paperName = props.urduCities[paperIndex].name;
		cityName = props.urduCities[paperIndex].cities[cityIndex];
	}

	return (
		<>
			{errorType === 0 ? (
				<>
					<h3
						style={{
							textAlign: "center",
							color: "#0f0f0f",
							borderTop: "3px solid red",
							alignSelf: "center"
						}}
					>
						{paperIndex !== -1 &&
							cityIndex !== -1 &&
							`${paperName} (${cityName})`}
					</h3>
					{paper === "Express" && (
						<Express city={params.city} date={fullDate} />
					)}
					{paper === "Naibaat" && (
						<Naibaat city={params.city} date={fullDate} />
					)}
					{paper === "Mashriq" && (
						<Mashriq city={params.city} date={fullDate} />
					)}
					{paper === "Jasarat" && (
						<Jasarat city={params.city} date={fullDate} />
					)}
					{paper === "Juraat" && (
						<Juraat city={params.city} date={fullDate} />
					)}
					{paper === "Dunya" && (
						<Dunya city={params.city} date={fullDate} />
					)}
					{paper === "Islam" && (
						<Is city={params.city} date={fullDate} />
					)}
					{paper === "Pakistan" && <Pakistan city={params.city} />}
					{paper === "Nawai Waqt" && <NawaiWaqt city={params.city} />}
					{paper === "Jinnah" && (
						<Jinnah city={params.city} date={fullDate} />
					)}
					{paper === "Ummat" && (
						<Ummat city={params.city} date={fullDate} />
					)}
					{paper === "NtNews" && (
						<NtNews city={params.city} date={fullDate} />
					)}
					{paper === "Khabrain" && <Khabrain city={params.city} />}
					{paper === "The Nation" && (
						<TheNation city={params.city} date={fullDate} />
					)}
					{paper === "92" && <NtNews city={params.city} />}
					{paper === "AlAkhbar" && (
						<Alakhbar city={params.city} date={fullDate} />
					)}
					{paper === "Jehan-e-Pakistan" && (
						<JehanPakistan city={params.city} date={fullDate} />
					)}
					{paper === "Jang" && <Jang city={params.city} />}
					{paper === "Pakistan Observer" && (
						<PakObserver city={params.city} />
					)}
					{paper === "K2" && <K2 city={params.city} />}
					{paper === "Daily Patriot" && <Patriot />}
					{paper === "Business Recorder" && (
						<BRecoder date={fullDate} />
					)}
				</>
			) : (
				<Message msg={errorType} />
			)}
		</>
	);
};

export default ViewPaper;
