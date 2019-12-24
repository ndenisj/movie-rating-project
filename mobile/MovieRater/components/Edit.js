import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const Edit = props => {
	const movie = props.navigation.getParam("movie", null);
	const [title, setTitle] = useState(movie.title);
	const [description, setDescription] = useState(movie.description);

	const saveMovie = () => {
		fetch(`http://192.168.88.14:8000/api/movies/${movie.id}/`, {
			method: "PUT",
			headers: {
				Authorization: `Token 8323e066366f6ec79bb0555dd6cc49172b12d600`,
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
				});
			})
			.catch(e => console.log(e));

		// props.navigation.goBack();
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
			<Button onPress={() => saveMovie()} title='SAVE' color='orange' />
		</View>
	);
};

export default Edit;

Edit.navigationOptions = screenProps => ({
	title: "Edit Movie",
	headerStyle: {
		backgroundColor: "orange",
	},
	headerTintColor: "white",
	headerTitleStyle: {
		fontWeight: "bold",
		fontSize: 24,
	},
});

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
