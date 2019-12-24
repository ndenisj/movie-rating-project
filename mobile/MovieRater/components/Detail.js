import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Detail = props => {
	const movie = props.navigation.getParam("movie", null);
	const [highlight, setHighlight] = useState(0);

	const rateClicked = () => {
		if (highlight > 0 && highlight < 6) {
			fetch(`http://192.168.88.14:8000/api/movies/${movie.id}/rate_movie/`, {
				method: "POST",
				headers: {
					Authorization: `Token 8323e066366f6ec79bb0555dd6cc49172b12d600`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					stars: highlight,
				}),
			})
				.then(res => res.json())
				.then(res => {
					setHighlight(0);
					Alert.alert("Rating", res.message);
				})
				.catch(e => Alert.alert("Error", e));
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.starContainer}>
				<FontAwesomeIcon
					style={movie.avg_rating > 0 ? styles.orange : styles.white}
					icon={faStar}
				/>
				<FontAwesomeIcon
					style={movie.avg_rating > 1 ? styles.orange : styles.white}
					icon={faStar}
				/>
				<FontAwesomeIcon
					style={movie.avg_rating > 2 ? styles.orange : styles.white}
					icon={faStar}
				/>
				<FontAwesomeIcon
					style={movie.avg_rating > 3 ? styles.orange : styles.white}
					icon={faStar}
				/>
				<FontAwesomeIcon
					style={movie.avg_rating > 4 ? styles.orange : styles.white}
					icon={faStar}
				/>
				<Text style={styles.white}>({movie.no_of_rating})</Text>
			</View>
			<Text style={styles.description}>{movie.description}</Text>
			<View style={{ borderBottomColor: "white", borderBottomWidth: 2 }} />
			<Text style={styles.description}>Rate it !!!</Text>
			<View style={styles.starContainer}>
				<FontAwesomeIcon
					style={highlight > 0 ? styles.purple : styles.grey}
					icon={faStar}
					size={48}
					onPress={() => setHighlight(1)}
				/>
				<FontAwesomeIcon
					style={highlight > 1 ? styles.purple : styles.grey}
					icon={faStar}
					size={48}
					onPress={() => setHighlight(2)}
				/>
				<FontAwesomeIcon
					style={highlight > 2 ? styles.purple : styles.grey}
					icon={faStar}
					size={48}
					onPress={() => setHighlight(3)}
				/>
				<FontAwesomeIcon
					style={highlight > 3 ? styles.purple : styles.grey}
					icon={faStar}
					size={48}
					onPress={() => setHighlight(4)}
				/>
				<FontAwesomeIcon
					style={highlight > 4 ? styles.purple : styles.grey}
					icon={faStar}
					size={48}
					onPress={() => setHighlight(5)}
				/>
			</View>
			<Button title='Rate' onPress={() => rateClicked()} />
		</View>
	);
};

Detail.navigationOptions = screenProps => ({
	title: screenProps.navigation.getParam("title"),
	headerStyle: {
		backgroundColor: "orange",
	},
	headerTintColor: "white",
	headerTitleStyle: {
		fontWeight: "bold",
		fontSize: 24,
	},
	headerRight: (
		<Button
			title='Edit'
			color='orange'
			onPress={() =>
				screenProps.navigation.navigate("Edit", {
					movie: screenProps.navigation.getParam("movie"),
				})
			}
		/>
	),
});

export default Detail;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: "#282C35",
	},
	description: {
		fontSize: 20,
		color: "white",
		padding: 10,
	},
	starContainer: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	orange: {
		color: "orange",
	},
	white: {
		color: "white",
	},
	purple: {
		color: "purple",
	},
	grey: {
		color: "#ccc",
	},
});
