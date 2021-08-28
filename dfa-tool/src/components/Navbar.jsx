import React, { useState, useRef, useEffect } from "react";
//this is so the navbar links with the routes setup in the app.js
import { Link } from "react-router-dom";
//import the sidebar icon
import { GoThreeBars } from "react-icons/go";

//This code is based on this: https://github.com/john-smilga/react-projects/blob/master/11-navbar/final/src/Navbar.js
function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerSize = useRef(null);
  const linksHeight = useRef(null);

  useEffect(() => {
    const allLinks = linksHeight.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerSize.current.style.height = `${allLinks}px`;
    } else {
      linksContainerSize.current.style.height = `0px`;
    }
  }, [showLinks]);

  return (
    <nav>
      <div className="nav-full">
        <div className="nav-bar">
          <h3 className="lefty">Automata Quiz</h3>
          <button className="nav-btn" onClick={() => setShowLinks(!showLinks)}>
            <GoThreeBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerSize}>
          <ul className="links" ref={linksHeight}>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/Questions">Questions</Link>
            </li>
            <li>
              <Link to="/Theory">Theory</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
