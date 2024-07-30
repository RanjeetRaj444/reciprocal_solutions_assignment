import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
	if (localStorage.getItem("reci-token")) {
		req.headers.Authorization = `Bearer ${localStorage.getItem("reci-token")}`;
	}
	return req;
});

export const login = (credentials) => API.post("/auth/login", credentials);
export const register = (credentials) =>
	API.post("/auth/register", credentials);
export const getProjects = () => API.get("/projects");
export const createProject = (project) => API.post("/projects", project);
export const getTasks = (projectId) => API.get(`/projects/${projectId}/tasks`);
export const createTask = (projectId, task) =>
	API.post(`/projects/${projectId}/tasks`, task);
