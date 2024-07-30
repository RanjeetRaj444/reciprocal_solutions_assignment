import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
import { Container, TextField, Button, Typography } from "@mui/material";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await login({ email, password });
			localStorage.setItem("reci-token", response.data.token);
			history.push("/dashboard");
		} catch (error) {
			console.error(error);
			alert("Invalid credentials");
		}
	};

	return (
		<Container>
			<Typography variant="h4">Login</Typography>
			<form onSubmit={handleLogin}>
				<TextField
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<Button type="submit" variant="contained" color="primary">
					Login
				</Button>
			</form>
		</Container>
	);
}

export default Login;
