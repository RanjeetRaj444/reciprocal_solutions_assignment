import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Common/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProjectList from "./components/Dashboard/ProjectList";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<ProjectList />} />
			</Routes>
		</Router>
	);
}

export default App;
