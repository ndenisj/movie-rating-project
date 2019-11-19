import React, {Fragment} from 'react';

const MovieList = (props) => {

    return (
        <Fragment>
        {props.movies.map(movie => {
            return <h3 key={movie.id}>{movie.title}</h3>
        })}
        </Fragment>
    )
}

export default MovieList;