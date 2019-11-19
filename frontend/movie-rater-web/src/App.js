import React, {Component} from 'react';
import './App.css';
import MovieList from './components/movie-list';

class App extends Component {
  
  state = {
    movies: []
  }

  componentDidMount(){
    // fetch data
    fetch('http://127.0.0.1:8000/api/movies/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token aedf194084db2d8e6df86819e68964460bfad7c3'
      }
    })
    .then((res)=>res.json())
    .then((res)=>this.setState({movies: res}))
    .catch(err=>console.log(err)); 
  }

  render() {
    return (
      <div className="App">
        <h1>Movie Rater</h1>
        <MovieList movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
