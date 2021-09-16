import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";
const Show = () => {
	const { idx } = useParams();
	const [show, setShow] = useState(null);
	useEffect(() => {
		apiGet(`/shows/${idx}?embed[]=seasons&embed[]=cast`).then((results) => {
			setShow(results);
		});
	}, [idx]);

	console.log("show", show);
	return <div>This is the show page</div>;
};

export default Show;
