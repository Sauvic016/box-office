import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";

const Home = () => {
	const [input, setInput] = useState("");
	const [results, setResults] = useState(null);
	const [searchOption, setSearchOption] = useState("shows");

	const isShowsSearch = searchOption === "shows";

	const onInputChange = (ev) => {
		setInput(ev.target.value);
		// console.log(ev.target.value);
	};

	const onSearch = () => {
		apiGet(`/search/${searchOption}?q=${input}`).then((result) => {
			setResults(result);
		});
	};
	// console.log(results);
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
			return results[0].show ? (
				<ShowGrid data={results} />
			) : (
				<ActorGrid data={results} />
			);
		}

		return null;
	};

	const onRadioChange = (ev) => {
		setSearchOption(ev.target.value);
	};
	// console.log(searchOption);

	return (
		<MainPageLayout>
			<input
				type="text"
				placeholder="Search for something"
				onChange={onInputChange}
				onKeyDown={onKeydown}
				value={input}
			/>

			<div>
				<label htmlFor="show-search">
					Shows
					<input
						id="show-search"
						type="radio"
						value="shows"
						onChange={onRadioChange}
						checked={isShowsSearch}
					/>
				</label>
				<label htmlFor="actors-search">
					Actors
					<input
						id="actors-search"
						type="radio"
						value="people"
						checked={!isShowsSearch}
						onChange={onRadioChange}
					/>
				</label>
			</div>
			<button type="button" onClick={onSearch}>
				Search
			</button>
			{renderResults()}
		</MainPageLayout>
	);
};

export default Home;
