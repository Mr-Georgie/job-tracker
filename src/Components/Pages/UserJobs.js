import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../SubComponents/Header'

export default function UserJobs(props) {
  // Just incase the doesn't have any save job
  if (props.data.length === 0) {
    return (
      <div>
        <Header goingTo="userJobs" />

        <h6>You have no saved job</h6>
      </div>
    )
  }

  const search_job_row = props.data
    .filter((job) => job.role.toLowerCase().indexOf(props.inputText) > -1)
    .map(
      (
        {
          id,
          role,
          technology,
          price_range,
          experience,
          job_type,
          number_hiring,
        },
        index,
      ) => (
        <tr key={id}>
          <th scope="row">{index + 1}</th>
          <td>{role}</td>
          <td>{technology}</td>
          <td>{price_range}</td>
          <td>{experience}</td>
          <td>{job_type}</td>
          <td>{number_hiring}</td>
          <td className="buttons">
            <Link to={`/user/edit_job/${id}`}>
              <button type="button" className="btn-green">
                edit
              </button>
            </Link>
            <Link to={`/user/delete_job/${id}`}>
              <button type="button" className="btn-orange">
                delete
              </button>
            </Link>
          </td>
        </tr>
      ),
    )

  const job_row = props.data.map(
    (
      {
        id,
        role,
        technology,
        price_range,
        experience,
        job_type,
        number_hiring,
      },
      index,
    ) => (
      <tr key={id}>
        <th scope="row">{index + 1}</th>
        <td>{role}</td>
        <td>{technology}</td>
        <td>{price_range}</td>
        <td>{experience}</td>
        <td>{job_type}</td>
        <td>{number_hiring}</td>
        <td className="buttons">
          <Link to={`/user/edit_job/${id}`}>
            <button type="button" className="btn-green">
              edit
            </button>
          </Link>
          <Link to={`/user/delete_job/${id}`}>
            <button type="button" className="btn-orange">
              delete
            </button>
          </Link>
        </td>
      </tr>
    ),
  )

  return (
    <>
      <Header goingTo="userJobs" />
      <div className="jobs-table table-responsive">
        <table className="table caption-top">
          <caption>
            Use the search bar in the navbar area to find specific saved jobs
          </caption>
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Role</th>
              <th scope="col">Tech</th>
              <th scope="col">Price Range</th>
              <th scope="col">Experience</th>
              <th scope="col">Job Type</th>
              <th scope="col">No. Hiring</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{props.isUserSearching ? search_job_row : job_row}</tbody>
        </table>
      </div>
    </>
  )
}
