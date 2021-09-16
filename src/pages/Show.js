import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";

const reducer = (prevState, action) => {
	switch (action.type) {
		case "FETCH_SUCCESS": {
			return { isLoading: false, error: null, show: action.show };
		}
		case "FETCH_FAILED": {
			return { ...prevState, isLoading: false, error: action.error };
		}
		default:
			return prevState;
	}
};

const initialState = {
	show: null,
	isLoading: true,
	error: null,
};

const Show = () => {
	const { idx } = useParams();

	const [{ show, isLoading, error }, dispatch] = useReducer(
		reducer,
		initialState
	);

	// console.log("state :>> ", state);

	useEffect(() => {
		let isMounted = true;

		apiGet(`/shows/${idx}?embed[]=seasons&embed[]=cast`)
			.then((results) => {
				if (isMounted) {
					dispatch({ type: "FETCH_SUCCESS", show: results });
				}
			})
			.catch((err) => {
				if (isMounted) {
					dispatch({ type: "FETCH_FAILED", error: err.message });
				}
			});

		return () => {
			isMounted = false;
		};
	}, [idx]);

	console.log("show", show);
	console.log("isLoading :>> ", isLoading);
	if (isLoading) {
		return <div>Data is being loaded</div>;
	}
	if (error) {
		return <div>Error Occured :{error}</div>;
	}
	return <div>This is the show page</div>;
};

export default Show;
