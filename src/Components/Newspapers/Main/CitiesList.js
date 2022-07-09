import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Grid.css";
import Message from "./Message";

const CitiesList = (props) => {
	const params = useParams();
	const citiesList = props.data.papers;
	const pos = props.data.papersList.indexOf(params.paper);

	return (
		<>
			{pos === -1 ? (
				<Message msg="paper404" />
			) : (
				<center>
					<div className="paper-name">
						<h3>{props.data.urduPapersList[pos]}</h3>
					</div>
					<div className="grid">
						{citiesList[pos].cities.map((city, i) => {
							return (
								<Link to={city} key={i}>
									{props.data.urduPapers[pos].cities[i]}
								</Link>
							);
						})}
					</div>
				</center>
			)}
		</>
	);
};

export default CitiesList;
