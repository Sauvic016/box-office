import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";
const Show = () => {
	const { idx } = useParams();
	const [show, setShow] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		apiGet(`/shows/${idx}?embed[]=seasons&embed[]=cast`)
			.then((results) => {
				if (isMounted) {
					setShow(results);
					setIsLoading(false);
				}
			})
			.catch((err) => {
				if (isMounted) {
					setError(err.message);
					setIsLoading(false);
				}
			});

		return () => {
			isMounted = false;
		};
	}, [idx]);

	console.log("show", show);

	if (isLoading) {
		return <div>Data is being loaded</div>;
	}
	if (error) {
		return <div>Error Occured :{error}</div>;
	}
	return <div>This is the show page</div>;
};

export default Show;
