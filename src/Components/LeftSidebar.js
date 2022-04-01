import React from 'react'
import { Link } from 'react-router-dom'
// import React, {useState, useEffect} from "react"

export default function LeftSidebar() {
  return (
    <div className="left-sidebar">
      <div className="left-sidebar-items">
        <a href="/" className="logo">
          JobTracker
        </a>
        <Link to="/" className="links">
          <i className="bi bi-people me-3"></i>
          All Users Stats
        </Link>
        <Link to="/user" className="links">
          <i className="bi bi-person me-3"></i>
          Your Stats
        </Link>
        <Link to="/user/jobs" className="links">
          <i className="bi bi-window-plus me-3"></i>
          Your Saved Jobs
        </Link>
        <Link to="/jobs-ads" className="links">
          <i className="bi bi-badge-ad me-3"></i>
          Job Ads
        </Link>
        <Link to="/user/add_new_job" className="btn">
          <i className="bi bi-plus-lg me-3"></i>
          Add Job
        </Link>
      </div>
    </div>
  )
}
