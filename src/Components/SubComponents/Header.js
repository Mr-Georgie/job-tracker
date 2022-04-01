import React from 'react'

export default function Header(props) {
  const getFilterTerm = (event) => {
    props.handleChange(event.target.value)
  }

  return (
    <div className="header">
      {props.goingTo === 'allUserPage' && (
        <div className="text">Statistics For: All Users </div>
      )}
      {props.goingTo === 'userPage' && (
        <div className="text">Statistics For: You </div>
      )}
      {props.goingTo === 'editPage' && <div className="text">View & Edit </div>}
      {props.goingTo === 'userJobs' && (
        <div className="text">Your Saved Jobs </div>
      )}
      {props.goingTo === 'addJobPage' && <div className="text">Add Job </div>}
      {props.goingTo !== 'userJobs' &&
        props.goingTo !== 'editPage' &&
        props.goingTo !== 'addJobPage' && (
          <div className="filter">
            <span className="me-3">Filter By:</span>
            <select name="cars" id="cars" onChange={getFilterTerm}>
              <option value="technology">Technology</option>
              <option value="experience">Experience</option>
              <option value="location">Location</option>
              <option value="price_range">Price Range</option>
              <option value="job_type">Job Type</option>
              <option value="role">Role</option>
            </select>
          </div>
        )}
    </div>
  )
}
