import React, { Component, Fragment } from "react";
var FontAwesome = require("react-fontawesome");

class MovieDetails extends Component {
	render() {
		const mov = this.props.movie;
		return (
			<Fragment>
				{mov ? (
					<div>
						<h3>{mov.title}</h3>
						<FontAwesome
							name='star'
							className={mov.avg_rating > 0 ? "orange" : ""}
						/>
						<FontAwesome
							name='star'
							className={mov.avg_rating > 1 ? "orange" : ""}
						/>
						<FontAwesome
							name='star'
							className={mov.avg_rating > 2 ? "orange" : ""}
						/>
						<FontAwesome
							name='star'
							className={mov.avg_rating > 3 ? "orange" : ""}
						/>
						<FontAwesome
							name='star'
							className={mov.avg_rating > 4 ? "orange" : ""}
						/>
						({mov.no_of_rating})<p>{mov.description}</p>
						<div className='rate-container'>
							<h2>Rate it !!!</h2>
						</div>
					</div>
				) : null}
			</Fragment>
		);
	}
}

export default MovieDetails;
