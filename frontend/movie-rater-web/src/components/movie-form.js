import React, { Component, Fragment } from "react";

class MovieForm extends Component {
	state = {
		editedMovie: this.props.movie,
	};

	cancelClicked = () => {
		this.props.cancelForm();
	};

	inputChanged = evt => {
		let movie = this.state.editedMovie;
		movie[evt.target.name] = evt.target.value;
		this.setState({
			editedMovie: movie,
		});
	};

	saveClicked = () => {
		//console.log(this.state.editedMovie);
		fetch(`http://127.0.0.1:8000/api/movies/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${this.props.token}`,
			},
			body: JSON.stringify(this.state.editedMovie),
		})
			.then(res => res.json())
			.then(res => this.props.addMovie(res))
			.catch(err => console.log(err));
	};

	updateClicked = () => {
		fetch(`http://127.0.0.1:8000/api/movies/${this.props.movie.id}/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${this.props.token}`,
			},
			body: JSON.stringify(this.state.editedMovie),
		})
			.then(res => res.json())
			.then(res => this.props.editedMovie(res))
			.catch(err => console.log(err));
	};

	render() {
		const isDisabled =
			this.state.editedMovie.title.length === 0 ||
			this.state.editedMovie.description.length === 0;

		return (
			<Fragment>
				<span>Title</span>
				<br />
				<input
					name='title'
					type='text'
					value={this.props.movie.title}
					onChange={this.inputChanged}
				/>
				<br />
				<span>Description</span>
				<br />
				<textarea
					name='description'
					value={this.props.movie.description}
					onChange={this.inputChanged}
				/>
				<br />
				{this.props.movie.id ? (
					<button disabled={isDisabled} onClick={this.updateClicked}>
						Update
					</button>
				) : (
					<button disabled={isDisabled} onClick={this.saveClicked}>
						Save
					</button>
				)}

				<button onClick={this.cancelClicked}>Cancel</button>
			</Fragment>
		);
	}
}

export default MovieForm;
