import React, { useState, useEffect, Fragment } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Button,
	Image,
	TouchableOpacity,
	AsyncStorage,
} from "react-native";

const MovieList = props => {
	const [movies, setMovies] = useState([]);
	let token = null;

	const getData = async () => {
		token = await AsyncStorage.getItem("MR_TOKEN");
		if (token) {
			getMovies();
		} else {
			props.navigation.navigate("Auth");
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const getMovies = () => {
		fetch("http://192.168.8.101:8000/api/movies/", {
			method: "GET",
			headers: {
				Authorization: `Token ${token}`,
			},
		})
			.then(res => res.json())
			.then(jsonRes => setMovies(jsonRes))
			.catch(e => console.log(e));
	};

	const movieClicked = movie => {
		console.log(token);
		props.navigation.navigate("Detail", {
			movie: movie,
			title: movie.title,
			token: token,
		});
	};

	return (
		<View>
			<Image
				source={require("../assets/MR_logo.png")}
				style={{ width: "100%", height: 135, paddingTop: 20 }}
				resizeMode='cover'
			/>

			<FlatList
				data={movies}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => movieClicked(item)}>
						<View style={styles.item}>
							<Text style={styles.itemText}>{item.title}</Text>
						</View>
					</TouchableOpacity>
				)}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};

MovieList.navigationOptions = screenProps => ({
	title: "List of Movies",
	headerStyle: {
		backgroundColor: "orange",
	},
	headerTintColor: "white",
	headerTitleStyle: {
		fontWeight: "bold",
		fontSize: 24,
	},
	headerRight: (
		<Fragment>
			<Button
				title='Add New'
				color='orange'
				onPress={() =>
					screenProps.navigation.navigate("Edit", {
						movie: {
							title: "",
							description: "",
						},
						action: "add",
					})
				}
			/>
			<Button title='Logout' color='blue' onPress={() => logout(screenProps)} />
		</Fragment>
	),
});

const logout = async props => {
	await AsyncStorage.removeItem("MR_TOKEN");
	props.navigation.navigate("Auth");
};

export default MovieList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	item: {
		flex: 1,
		padding: 10,
		height: 50,
		backgroundColor: "#282C35",
	},
	itemText: {
		color: "#fff",
		fontSize: 25,
	},
});
