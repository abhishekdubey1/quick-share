import NavBar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import { Routing } from "../utils/Routing";
import "../styles/main.css";
import "../styles/navbar.css";
import "../styles/auth.css";
import "../styles/createpost.css";
import "../styles/post.css";
import "../styles/profile.css";
import "../styles/profile-grid.css";
import "../styles/utils.css";
import "../styles/spinner.css";
function App() {
	return (
		<UserProvider>
			<BrowserRouter>
				<NavBar />
				<Routing />
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
