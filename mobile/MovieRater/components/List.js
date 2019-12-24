import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	TouchableOpacity,
} from "react-native";

const MovieList = props => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetch("http://192.168.88.14:8000/api/movies/", {
			method: "GET",
			headers: {
				Authorization: `Token 8323e066366f6ec79bb0555dd6cc49172b12d600`,
			},
		})
			.then(res => res.json())
			.then(jsonRes => setMovies(jsonRes))
			.catch(e => console.log(e));
	}, []);

	const movieClicked = movie => {
		props.navigation.navigate("Detail", { movie: movie, title: movie.title });
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
