import React, { Component } from "react";
import "./App.css";
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";

class App extends Component {
	state = {
		movies: [],
		selectedMovie: null,
	};

	componentDidMount() {
		// fetch data
		fetch(`${process.env.REACT_API_URL}/api/movies/`, {
			method: "GET",
			headers: {
				Authorization: "Token aedf194084db2d8e6df86819e68964460bfad7c3",
			},
		})
			.then(res => res.json())
			.then(res => this.setState({ movies: res }))
			.catch(err => console.log(err));
	}

	loadMovie = movie => {
		this.setState({ selectedMovie: movie });
	};

	render() {
		return (
			<div className='App'>
				<h1>Movie Rater</h1>
				<div className='layout'>
					<MovieList movies={this.state.movies} loadMovie={this.loadMovie} />
					<MovieDetails
						movie={this.state.selectedMovie}
						updateMovie={this.loadMovie}
					/>
				</div>
			</div>
		);
	}
}

export default App;
