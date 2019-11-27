import React, { Component, Fragment } from "react";
import { withCookies } from "react-cookie";

class Login extends Component {
	state = {
		credentials: {
			username: "",
			password: "",
		},
		regcredentials: {
			username: "",
			email: "",
			password: "",
		},
		error: null,
		isLoginView: true,
	};

	inputChanged = evt => {
		let cred = this.state.credentials;
		cred[evt.target.name] = evt.target.value;
		this.setState({
			credentials: cred,
		});
	};

	reginputChanged = evt => {
		let cred = this.state.credentials;
		cred[evt.target.name] = evt.target.value;
		this.setState({
			regcredentials: cred,
		});
	};

	login = () => {
		//console.log(this.state.credentials);
		if (this.state.isLoginView) {
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
		} else {
			fetch(`http://127.0.0.1:8000/api/users/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(this.state.regcredentials),
			})
				.then(res => res.json())
				.then(res => {
					this.setState({
						isLoginView: true,
					});
				})
				.catch(err => console.log(err));
		}
	};

	toggleView = () => {
		this.setState({
			isLoginView: !this.state.isLoginView,
		});
	};

	render() {
		const isDisabled =
			this.state.credentials.username.length === 0 ||
			this.state.credentials.password.length === 0;
		return (
			<Fragment>
				<div className='login-container'>
					<h1>{this.state.isLoginView ? "Login" : "Register"}</h1>
					{this.state.error ? (
						<p style={{ color: "red" }}>{this.state.error}</p>
					) : null}
					<span>Username</span>
					<br />
					<input
						name='username'
						type='text'
						value={
							this.state.isLoginView
								? this.state.credentials.username
								: this.state.regcredentials.username
						}
						onChange={
							this.state.isLoginView ? this.inputChanged : this.reginputChanged
						}
					/>
					<br />
					{!this.state.isLoginView ? (
						<Fragment>
							<span>Email</span>
							<br />
							<input
								name='email'
								type='email'
								value={this.state.regcredentials.email}
								onChange={this.reginputChanged}
							/>
							<br />
						</Fragment>
					) : (
						""
					)}

					<span>Password</span>
					<br />
					<input
						name='password'
						type='password'
						value={
							this.state.isLoginView
								? this.state.credentials.password
								: this.state.regcredentials.password
						}
						onChange={
							this.state.isLoginView ? this.inputChanged : this.reginputChanged
						}
					/>
					<br />
					<button disabled={isDisabled} onClick={this.login}>
						{this.state.isLoginView ? "Login" : "Register"}
					</button>
					<p onClick={this.toggleView}>
						{this.state.isLoginView ? "Create Account" : "Back to login"}
					</p>
				</div>
			</Fragment>
		);
	}
}

export default withCookies(Login);
