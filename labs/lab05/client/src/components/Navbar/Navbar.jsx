import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!token);
    if (user) {
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">Local Loot</Link>
        </div>

        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link to="/create-sale">Create Sale</Link>
              </li>
              <li>
                <Link to="/my-sales">My Sales</Link>
              </li>
              <li className="username">Hi, {username}</li>
              <li className="logout">
                <span
                  onClick={handleLogout}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogout();
                  }}
                >
                  Logout
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
