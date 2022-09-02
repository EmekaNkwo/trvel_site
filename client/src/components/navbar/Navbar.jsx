import "./navbar.css";
import { SiYourtraveldottv } from "react-icons/si";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logo">
          <SiYourtraveldottv />
          Trvel
        </Link>
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navOutline">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
