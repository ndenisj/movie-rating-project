import React from "react";

const MovieList = props => {
	const loadMovie = movie => evt => {
		//console.log(movie);
		props.loadMovie(movie);
	};

	return (
		<div>
			{props.movies.map(movie => {
				return (
					<h3 key={movie.id} onClick={loadMovie(movie)}>
						{movie.title}
					</h3>
				);
			})}
		</div>
	);
};

export default MovieList;
