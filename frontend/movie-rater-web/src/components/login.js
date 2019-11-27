import React, { Component, Fragment } from "react";
import { withCookies } from "react-cookie";

class Login extends Component {
	state = {
		credentials: {
			username: "",
			password: "",
		},
		error: null,
	};

	inputChanged = evt => {
		let cred = this.state.credentials;
		cred[evt.target.name] = evt.target.value;
		this.setState({
			credentials: cred,
		});
	};

	login = () => {
		//console.log(this.state.credentials);
		fetch(`http://127.0.0.1:8000/auth/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(this.state.credentials),
		})
			.then(res => res.json())
			.then(res => {
				console.log(typeof res);
				console.log(res);
				if ("non_field_errors" in res) {
					console.log(res.non_field_errors[0]);
					this.setState({
						error: res.non_field_errors[0],
					});
				} else {
					this.setState({
						error: null,
					});
					this.props.cookies.set("mr-token", res.token);
					window.location.href = "/movies";
				}
			})
			.catch(err => console.log(err));
	};

	render() {
		const isDisabled =
			this.state.credentials.username.length === 0 ||
			this.state.credentials.password.length === 0;
		return (
			<Fragment>
				<div className='login-container'>
					<h1>Login</h1>
					{this.state.error ? (
						<p style={{ color: "red" }}>{this.state.error}</p>
					) : null}
					<span>Username</span>
					<br />
					<input
						name='username'
						type='text'
						value={this.state.credentials.username}
						onChange={this.inputChanged}
					/>
					<br />
					<span>Password</span>
					<br />
					<input
						name='password'
						type='password'
						value={this.state.credentials.password}
						onChange={this.inputChanged}
					/>
					<br />
					<button disabled={isDisabled} onClick={this.login}>
						Login
					</button>
				</div>
			</Fragment>
		);
	}
}

export default withCookies(Login);
