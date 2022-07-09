import React from "react";
import { Link } from "react-router-dom";
import "./Grid.css";

const PapersList = (props) => {
	return (
		<>
			<center>
				<div className="grid">
					{props.paperlist.map((paper, index) => {
						if (paper.cities.length > 1) {
							return (
								<Link key={index} to={paper.name}>
									{props.urduPapers[index]}
								</Link>
							);
						} else {
							return (
								<Link key={index} to={paper.name + "/view"}>
									{props.urduPapers[index]}
								</Link>
							);
						}
					})}
				</div>
			</center>
		</>
	);
};

export default PapersList;
