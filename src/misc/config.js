const API_BASE_URL = "https://api.tvmaze.com";

export const apiGet = async (queryString) => {
	const response = await fetch(`${API_BASE_URL}${queryString}`).then((r) =>
		r.json()
	);
	return response;
};

// fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
// .then((r) => r.json())
// .then((result) => {
//     setResults(result);
//     // console.log(result);
// });
