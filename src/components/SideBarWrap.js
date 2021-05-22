import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const SideBarWrap = ({ children }) => {
  let { state } = useContext(UserContext);
  state = state || JSON.parse(localStorage.getItem("user"));
  const SideBar = () => (
    <div className="sidebar">
      <div>
        <img src={state.dpUrl} alt="Your profile diplay" />
        <div>
          <span>_abhishekdubey_</span>
          <span>Abhishek Dubey</span>
        </div>
      </div>
      <div>
        <p>
          <span>Suggestions for you</span>
          <span>See all</span>
        </p>
        <ul>
          <li>
            <img src={state.dpUrl} alt="" />
            <div>
              <span>_abhishekdubey_</span>
              <span>Abhishek Dubey</span>
            </div>
            <button>Follow</button>
          </li>
          <li>
            <img src={state.dpUrl} alt="" />
            <div>
              <span>_abhishekdubey_</span>
              <span>Abhishek Dubey</span>
            </div>
            <button>Follow</button>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div>
      {children}
      <SideBar />
    </div>
  );
};

export default SideBarWrap;
