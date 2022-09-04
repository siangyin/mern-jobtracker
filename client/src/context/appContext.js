import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import { ActionsType } from "./actions";

const endPoint = {
	setupUser: "/api/v1/auth",
	userUpdate: "/api/v1/auth/updateuser",
	jobs: "/api/v1/jobs",
	jobsStats: "/api/v1/jobs/stats",
	jobsId: "/api/v1/jobs/{id}",
};

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: "",
	alertType: "",
	user: user ? JSON.parse(user) : null,
	token: token,
	userLocation: userLocation || "",
	jobLocation: userLocation || "",
	showSidebar: false,
	isEditing: false,
	editJobId: "",
	position: "",
	company: "",
	jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
	jobType: "full-time",
	statusOptions: ["interview", "declined", "pending"],
	status: "pending",
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	search: "",
	searchStatus: "all",
	searchType: "all",
	sort: "latest",
	sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// DISPLAY OR CLEAR ALERT
	const displayAlert = () => {
		dispatch({ type: ActionsType.DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: ActionsType.CLEAR_ALERT });
		}, 3000);
	};

	// ADD OR REMOVE LOCALSTORAGE
	const addUserToLocalStorage = ({ user, token }) => {
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
		localStorage.setItem("location", user.location);
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("location");
	};

	// LOGIN OR REGISTER USER OR LOGOUT
	const setupUser = async ({ currUser, endPointReq, alertText }) => {
		dispatch({ type: ActionsType.SETUP_USER_BEGIN });

		try {
			const response = await axios.post(
				`${endPoint.setupUser}/${endPointReq}`,
				currUser
			);
			const { user, token } = response.data;
			dispatch({
				type: ActionsType.SETUP_USER_SUCCESS,
				payload: { user, token, alertText },
			});
			addUserToLocalStorage({ user, token });
		} catch (error) {
			dispatch({
				type: ActionsType.SETUP_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	};

	const logoutUser = () => {
		dispatch({ type: ActionsType.LOGOUT_USER });
		removeUserFromLocalStorage();
	};

	// TOGGLESIDEBBAR
	const toggleSidebar = () => {
		dispatch({ type: ActionsType.TOGGLE_SIDEBAR });
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				setupUser,
				logoutUser,
				toggleSidebar,
			}}
		>
			{children}{" "}
		</AppContext.Provider>
	);
};
const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
