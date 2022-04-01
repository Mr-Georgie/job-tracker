import React, { useState, useEffect } from 'react'

export default function Table(props) {
  const [seeDetails, setSeeDetails] = useState([])

  useEffect(() => {
    // this makes sure seeDetails state array is empty on render
    setSeeDetails([])

    // repopulate seeDetails array based on current filteredData
    props.filteredData.forEach((data, index) => {
      setSeeDetails((oldArray) => [
        ...oldArray,
        {
          index,
          value: false,
        },
      ])
    })
  }, [props.filteredData])

  // console.log(seeDetails)

  const handleClick = (index) => {
    // console.log("index: ", index)

    setSeeDetails((oldArray) => {
      const changedArray = oldArray.map((item) =>
        item.index === index ? { ...item, value: !item.value } : item,
      )

      return changedArray
    })
  }

  const filteredElements = props.filteredData.map(
    ({ name, count, details }, index) => (
      <div className="table" key={index}>
        <div className="table-head" key={index}>
          <div className="number">
            <span>
              {(index + 1).toString().length === 1
                ? `0${index + 1}`
                : index + 1}
            </span>
          </div>
          <div className="name text-capitalize">{name}</div>
          <div className="metrics">{count} job(s) saved</div>
          <div className="button">
            {seeDetails[index] !== undefined && seeDetails[index].value ? (
              <button type="button" onClick={() => handleClick(index)}>
                <span>Close details</span>
                <i className="bi bi-chevron-up"></i>
              </button>
            ) : (
              <button type="button" onClick={() => handleClick(index)}>
                <span>See details</span>
                <i className="bi bi-chevron-down"></i>
              </button>
            )}
          </div>
        </div>
        {seeDetails[index] !== undefined && seeDetails[index].value && (
          <div className="table-body">
            {/* display these component based on filterTerm */}

            {
              /* Experience component */
              props.filterTerm !== 'experience' && (
                <div className="component">
                  <i className="bi bi-info-circle-fill"></i>
                  <p className="title">Experience</p>
                  <div className="metrics">
                    {details
                      .filter(({ category }) => category === 'experience')
                      .map((item, id) => (
                        <p key={id}>
                          <span>{item.value}</span>
                          <span className="count">x{item.count}</span>
                        </p>
                      ))}
                  </div>
                </div>
              )
            }

            {
              /* Location component */
              props.filterTerm !== 'location' && (
                <div className="component">
                  <i className="bi bi-info-circle-fill"></i>
                  <p className="title">Location </p>
                  <div className="metrics">
                    {details
                      .filter(({ category }) => category === 'location')
                      .map((item, id) => (
                        <p key={id}>
                          <span>{item.value}</span>
                          <span className="count">x{item.count}</span>
                        </p>
                      ))}
                  </div>
                </div>
              )
            }

            {
              /* Technology component */
              props.filterTerm !== 'technology' && (
                <div className="component">
                  <i className="bi bi-info-circle-fill"></i>
                  <p className="title">Technology </p>
                  <div className="metrics">
                    {details
                      .filter(({ category }) => category === 'technology')
                      .map((item, id) => (
                        <p key={id}>
                          <span>{item.value}</span>
                          <span className="count">x{item.count}</span>
                        </p>
                      ))}
                  </div>
                </div>
              )
            }

            {
              /* Job Type component */
              props.filterTerm !== 'job_type' && (
                <div className="component">
                  <i className="bi bi-info-circle-fill"></i>
                  <p className="title">Job Type </p>
                  <div className="metrics">
                    {details
                      .filter(({ category }) => category === 'job_type')
                      .map((item, id) => (
                        <p key={id}>
                          <span>{item.value}</span>
                          <span className="count">x{item.count}</span>
                        </p>
                      ))}
                  </div>
                </div>
              )
            }

            {
              /* Role component */
              props.filterTerm !== 'role' && (
                <div className="component">
                  <i className="bi bi-info-circle-fill"></i>
                  <p className="title">Role </p>
                  <div className="metrics">
                    {details
                      .filter(({ category }) => category === 'role')
                      .map((item, id) => (
                        <p key={id}>
                          <span>{item.value}</span>
                          <span className="count">x{item.count}</span>
                        </p>
                      ))}
                  </div>
                </div>
              )
            }

            {
              /* Price Range component */
              props.filterTerm !== 'price_range' && (
                <div className="component">
                  <i className="bi bi-info-circle-fill"></i>
                  <p className="title">Price Range </p>
                  <div className="metrics">
                    {details
                      .filter(({ category }) => category === 'price_range')
                      .map((item, id) => (
                        <p key={id}>
                          <span>{item.value}</span>
                          <span className="count">x{item.count}</span>
                        </p>
                      ))}
                  </div>
                </div>
              )
            }
          </div>
        )}
      </div>
    ),
  )

  return <>{filteredElements}</>
}
