import React, { useState, useEffect, Fragment } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	Alert,
	AsyncStorage,
	TouchableOpacity,
} from "react-native";

const Auth = props => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [regView, setRegView] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	const auth = () => {
		if (regView) {
			fetch(`http://192.168.8.101:8000/api/users/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					username,
					password,
				}),
			})
				.then(res => res.json())
				.then(res => {
					setRegView(false);
				})
				.catch(e => Alert.alert("Error", e.toString()));
		} else {
			fetch(`http://192.168.8.101:8000/auth/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username,
					password,
				}),
			})
				.then(res => res.json())
				.then(res => {
					// Alert.alert("Response", res.token);
					saveData(res.token);
					props.navigation.navigate("MovieList");
				})
				.catch(e => Alert.alert("Error", e.toString()));
		}
	};

	const saveData = async token => {
		await AsyncStorage.setItem("MR_TOKEN", token);
	};
	const getData = async () => {
		const token = await AsyncStorage.getItem("MR_TOKEN");
		if (token) {
			props.navigation.navigate("MovieList");
		}
	};
	const toggleView = () => {
		setRegView(!regView);
	};

	return (
		<View style={styles.container}>
			{regView ? (
				<Fragment>
					<Text style={styles.label}>Email</Text>
					<TextInput
						style={styles.input}
						placeholder='Email'
						onChangeText={email => setEmail(email)}
						value={email}
						autoCapitalize={"none"}
					/>
				</Fragment>
			) : (
				<Text />
			)}
			<Text style={styles.label}>Username</Text>
			<TextInput
				style={styles.input}
				placeholder='Username'
				onChangeText={username => setUsername(username)}
				value={username}
				autoCapitalize={"none"}
			/>
			<Text style={styles.label}>Password</Text>
			<TextInput
				style={styles.input}
				placeholder='Password'
				onChangeText={pwd => setPassword(pwd)}
				value={password}
				autoCapitalize={"none"}
				secureTextEntry={true}
			/>
			<Button
				title={regView ? "Register" : "Login"}
				color='orange'
				onPress={() => auth()}
			/>
			<TouchableOpacity onPress={() => toggleView()}>
				{regView ? (
					<Fragment>
						<Text style={styles.viewText}>Login</Text>
					</Fragment>
				) : (
					<Fragment>
						<Text style={styles.viewText}>Register</Text>
					</Fragment>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default Auth;

Auth.navigationOptions = screenProps => ({
	title: "Login",
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
	viewText: {
		color: "white",
		fontSize: 20,
		paddingTop: 30,
		textAlign: "center",
	},
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
