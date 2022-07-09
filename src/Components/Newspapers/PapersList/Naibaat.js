import Image from "../Main/Image";

const Naibaat = (props) => {
    const date =
        props.date.day + "-" + props.date.month + "-" + props.date.year;
    const city = props.city.toLowerCase();
    let images = [];
    for (var i = 1; i <= 12; i++) {
        i = i < 10 ? "0" + i : i;
        images.push(
            `http://e.naibaat.pk/ePaper/${city}/${date}/pages/Page%20${i}.jpg`
        );
    }

    return (
        <>
            {images.map((x, i) => {
                return <Image src={x} key={i} page={i} />;
            })}
        </>
    );
};

export default Naibaat;
