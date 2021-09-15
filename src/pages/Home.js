import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGet } from "../misc/config";

const Home = () => {
	const [input, setInput] = useState("");
	const [results, setResults] = useState(null);

	const onInputChange = (ev) => {
		setInput(ev.target.value);
		// console.log(ev.target.value);
	};

	const onSearch = () => {
		apiGet(`/search/shows?q=${input}`).then((result) => {
			setResults(result);
		});

		// fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
		// 	.then((r) => r.json())
		// 	.then((result) => {
		// 		setResults(result);
		// 		// console.log(result);
		// 	});
	};
	const onKeydown = (ev) => {
		if (ev.keyCode === 13) {
			onSearch();
		}
	};

	const renderResults = () => {
		if (results && results.length === 0) {
			return <div>No results</div>;
		}
		if (results && results.length > 0) {
			return (
				<div>
					{results.map((el) => (
						<div key={el.show.id}>{el.show.name}</div>
					))}
				</div>
			);
		}

		return null;
	};
	return (
		<MainPageLayout>
			<input
				type="text"
				onChange={onInputChange}
				onKeyDown={onKeydown}
				value={input}
			/>
			<button type="button" onClick={onSearch}>
				Search
			</button>
			{renderResults()}
		</MainPageLayout>
	);
};

export default Home;
