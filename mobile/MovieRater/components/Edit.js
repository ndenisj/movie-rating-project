import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	Alert,
	AsyncStorage,
} from "react-native";

const Edit = props => {
	const movie = props.navigation.getParam("movie", null);
	// const token = props.navigation.getParam("token", "");
	const [title, setTitle] = useState(movie.title);
	const [description, setDescription] = useState(movie.description);

	let token = null;
	const getData = async () => {
		token = await AsyncStorage.getItem("MR_TOKEN");
		if (!token) {
			props.navigation.navigate("Auth");
		}
	};

	useEffect(() => {
		getData();
	});

	const saveMovie = () => {
		console.log(token);
		if (movie.id) {
			fetch(`http://192.168.8.101:8000/api/movies/${movie.id}/`, {
				method: "PUT",
				headers: {
					Authorization: `Token ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: title,
					description: description,
				}),
			})
				.then(res => res.json())
				.then(movie => {
					props.navigation.navigate("Detail", {
						movie: movie,
						title: movie.title,
						token: token,
					});
				})
				.catch(e => console.log(e));

			// props.navigation.goBack();
		} else {
			fetch(`http://192.168.8.101:8000/api/movies/`, {
				method: "POST",
				headers: {
					Authorization: `Token ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: title,
					description: description,
				}),
			})
				.then(res => res.json())
				.then(movie => {
					props.navigation.navigate("MovieList");
				})
				.catch(e => Alert.alert("Error", e));
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Title</Text>
			<TextInput
				style={styles.input}
				placeholder='Title'
				onChangeText={text => setTitle(text)}
				value={title}
			/>
			<Text style={styles.label}>Description</Text>
			<TextInput
				style={styles.input}
				placeholder='Description'
				onChangeText={desc => setDescription(desc)}
				value={description}
			/>
			<Button
				onPress={() => saveMovie()}
				title={movie.id ? "EDIT" : "SAVE"}
				color='orange'
			/>
		</View>
	);
};

export default Edit;

Edit.navigationOptions = screenProps => ({
	title:
		screenProps.navigation.getParam("action") == "edit"
			? "Edit Movie"
			: "Add New Movie",
	headerStyle: {
		backgroundColor: "orange",
	},
	headerTintColor: "white",
	headerTitleStyle: {
		fontWeight: "bold",
		fontSize: 24,
	},
	headerRight:
		screenProps.navigation.getParam("action") == "edit" ? (
			<Button
				title='Delete'
				color='red'
				onPress={() => removeMovie(screenProps)}
			/>
		) : (
			""
		),
});

const removeMovie = async props => {
	const movie = props.navigation.getParam("movie");

	let token = await AsyncStorage.getItem("MR_TOKEN");

	fetch(`http://192.168.8.101:8000/api/movies/${movie.id}/`, {
		method: "DELETE",
		headers: {
			Authorization: `Token ${token}`,
			"Content-Type": "application/json",
		},
	})
		.then(movie => {
			props.navigation.navigate("MovieList");
		})
		.catch(e => console.log(e));
};

const styles = StyleSheet.create({
	input: {
		fontSize: 24,
		backgroundColor: "white",
		padding: 10,
		margin: 10,
	},
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: "#282C35",
	},
	label: {
		fontSize: 24,
		color: "white",
		padding: 10,
	},
});
