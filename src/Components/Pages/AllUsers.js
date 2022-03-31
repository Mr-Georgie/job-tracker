import React, { useState } from 'react'

import Header from '../SubComponents/Header'
import Table from '../SubComponents/Table'

export default function AllUsers(props) {

  // hold filter term in state to allow seamless user filtering
  const [filterTerm, setFilterTerm] = useState("technology")

  // will hold the final fitered data after logic
  const filteredData = []

  // get the names of all columns in database from the first object 
  // since all objects in our array of objects has the same keys
  // exclude the "id", "user_id" and "additional_tech" columns
  const namesOfColumns = Object.keys(props.data.jobs[0]).filter(name => name !== "id" && name !== "user_id" 
  && name !== "additional_tech" && name !== "__typename")

  // sets state based on user interaction with the select html tag in <Header />
  const handleChange = (filterTerm) => {
    setFilterTerm(filterTerm)
  }

  // count the occurence of the unique entry across rows in the jobs table
  // returns an object with unique entry name, count and filtered array based on unique entry
  const countStats = (arr, item, filterTerm) => {
    return ({
      "name": item,
      "count": arr.reduce((count, elem) => {
        return (item === elem[filterTerm] ? count + 1 : count)
      }, 0),
      "details": arr.filter(elem => elem[filterTerm] === item)
    })
  }

  // returns a set of unique entries where filterTerm matches column name in jobs table 
  const getUniqueEntries = (filterTerm) => {
    // this set below will hold unique entries in a jobs table column
    const uniqueSet = new Set()

    // get unique entries in a column based on filterTerm
    props.data.jobs.forEach(job => {
      uniqueSet.add(job[filterTerm])
    })

    return uniqueSet
  }

  // assigns the return set from getUniqueEntries to a variable
  const uniqueEntries = getUniqueEntries(filterTerm)

  // create an object with the unique entry name, it's count and a list of objects it is in
  uniqueEntries.forEach(value => {

    const { name, count, details } = countStats(props.data.jobs, value, filterTerm)

    // will hold information for all data where unique entry name appears
    const detailsData = []


    namesOfColumns.filter(name => name !== filterTerm).forEach(name => {

      const innerUniqueEntries = getUniqueEntries(name)

      innerUniqueEntries.forEach(entry => {
        
        // destructure the returning object from countStats while renaming the fields in the object
        const { name:detailsName ,count:detailsCount } = countStats(details, entry, name)
        
        // only push values where there is at least one count/occurence of entry
        if (detailsCount !== 0 ){
          detailsData.push({
            "category": name,
            "value": detailsName,
            "count": detailsCount
          })
        }
      })
    })



    // finally push name and count from line 55
    // and detailsData into filteredData array created on line 12
    filteredData.push({
      "name": name,
      "count": count,
      "details": detailsData
    })
  })

  console.log("filteredData: ", filteredData)

  return (
      <div>
        <Header 
          handleChange={handleChange}
          goingTo={"allUserPage"}
        />
        <span><p className="fw-lighter text-muted">This stats is gotten from all users saved jobs</p></span>
        <Table 
          filteredData={filteredData} 
          filterTerm={filterTerm}  
        />
      </div>
  )
}
