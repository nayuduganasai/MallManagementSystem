import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userId }) => {
  const linkto = `/orders/user/${String(userId)}`;
  // console.log(linkto);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="/">
          Mall App
        </Link>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/mall">
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to={`/cart/user/${userId}`}>
                Cart
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link" to={linkto}>
                My Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/cart2/user/${userId}`}>
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
