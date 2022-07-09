import React from "react";
import { useParams } from "react-router";
import NtMag from "../PapersList/NtMag";
import Khabrain from "../PapersList/Khabrain";
import Pakistan from "../PapersList/Pakistan";
import NawaiWaqtMagazine from "../PapersList/NawaiWaqtMagazine";
import MashriqMag from "../PapersList/MashriqMag";

const ViewMagazine = (props) => {
	const mag = useParams().magname;

	return (
		<>
			<h3
				style={{
					textAlign: "center",
					color: "#0f0f0f",
					borderBottom: "2px solid red",
					alignSelf: "center"
				}}
			>
				{props.urduMag[props.maglist.indexOf(mag)]}
			</h3>

			{mag === "Khabrain Magazine" && <Khabrain city="Magazine" />}
			{mag === "Zindagi" && <Pakistan city="zindagi" />}
			{mag === "Phool" && <NawaiWaqtMagazine city="phool" />}
			{mag === "Nidai Millat" && <NawaiWaqtMagazine city="nidaimillat" />}
			{mag === "Nawai Waqt Sunday Magazine" && (
				<NawaiWaqtMagazine city="sunmag" />
			)}
			{mag === "Family" && <NawaiWaqtMagazine city="family" />}
			{mag === "Mashriq Magazine" && <MashriqMag />}

			{mag === "92 Magazine" && <NtMag />}
		</>
	);
};

export default ViewMagazine;
