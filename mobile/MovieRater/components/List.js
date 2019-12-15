import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function MovieList() {
	return (
		<View style={styles.container}>
			<Text>This will display my list</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});