import { useSelector } from "react-redux";

const SideBarWrap = ({ children }) => {
  const { user } = useSelector(state => state.user);
  const SideBar = () => (
    <div className="sidebar">
      <div>
        <img src={user.dpUrl} alt="Your profile diplay" />
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
            <img src={user.dpUrl} alt="" />
            <div>
              <span>_abhishekdubey_</span>
              <span>Abhishek Dubey</span>
            </div>
            <button>Follow</button>
          </li>
          <li>
            <img src={user.dpUrl} alt="" />
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
