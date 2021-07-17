import NavBar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import { Routing } from "./Routing";
import "../styles/main.css";
import "../styles/navbar.css";
import "../styles/auth.css";
import "../styles/createpost.css";
import "../styles/post.css";
import "../styles/profile.css";
import "../styles/profile-grid.css";
import "../styles/utils.css";
import "../styles/spinner.css";
import { toast as toastNotify, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToasts } from "../store/actions/toastActions";
function App() {
	const { toasts } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		if (toasts.status) {
			toastNotify[toasts.status](toasts.message, {
				onClose: dispatch(clearToasts()),
			});
		}
	}, [toasts, dispatch]);
	return (
		<UserProvider>
			<BrowserRouter>
				<NavBar />
				<Routing />
				<ToastContainer position="bottom-right" autoClose={4000} />
			</BrowserRouter>
		</UserProvider>
	);
}
/**
 * Need folders: helpers, hooks, lib, pages, styles, constants
 *
 * Updated: Signin, Signup, CreatePost, Navbar
 *
 */
export default App;
