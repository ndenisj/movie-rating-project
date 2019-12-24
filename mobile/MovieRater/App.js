import React from "react";
import MovieList from "./components/List";
import Auth from "./components/Auth";
import Detail from "./components/Detail";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Edit from "./components/Edit";

const AppNavigator = createStackNavigator({
	Auth: { screen: Auth },
	MovieList: { screen: MovieList },
	Detail: { screen: Detail },
	Edit: { screen: Edit },
});

const App = createAppContainer(AppNavigator);

export default App;

// export default function App() {
// 	return <MovieList />;
// }
