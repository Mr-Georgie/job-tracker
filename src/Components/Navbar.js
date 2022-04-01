import React from 'react'

import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  const { user } = useUser()

  function getInput(event) {
    props.handleChange(event.target.value)
  }

  return (
    <div className="navbar">
      <nav className="navbar fixed-top">
        <div className="container-fluid">
          <div className="brand">
            <button
              className="display"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span>&#9776;</span>
            </button>
            <Link to="/" className="link">
              {' '}
              Home{' '}
            </Link>
          </div>
          <div className="right-nav-item">
            <span className="searchbar me-3">
              {!props.isUserSearching && (
                <span
                  className="custom-searchbar"
                  onClick={() => props.showJobsTable()}
                >
                  <span>Search for job roles, etc.</span>
                  <i className="bi bi-search ps-3"></i>
                </span>
              )}
              {props.isUserSearching && (
                <span>
                  <input
                    type="text"
                    placeholder="Search for job roles, experiences, technologies, locations"
                    onChange={getInput}
                    value={props.inputText}
                  />
                  <i
                    className="bi bi-x-lg ps-3"
                    onClick={() => props.showJobsTable()}
                  ></i>
                </span>
              )}
            </span>
            <span className="profile ps-3">
              <span className="pe-2">{`Hello, ${user.firstName}`}</span>
              <span>
                <UserButton />
              </span>
            </span>
          </div>

          {/* Offcanvas for mobile screens */}
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title logo" id="offcanvasNavbarLabel">
                JobTracker
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body left-sidebar-items">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link to="/" className="links">
                    <i className="bi bi-people me-3"></i>
                    All Users Stats
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user" className="links">
                    <i className="bi bi-person me-3"></i>
                    Your Stats
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/jobs" className="links">
                    <i className="bi bi-badge-ad me-3"></i>
                    Your Saved Jobs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/jobs-ads" className="links">
                    <i className="bi bi-window-plus me-3"></i>
                    Job Ads
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/add_new_job" className="btn">
                    <i className="bi bi-plus-lg me-5"></i>
                    Add Job
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
