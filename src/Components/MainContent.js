import React, {useState} from 'react'
import Navbar from './Navbar'

import AllUsers from './Pages/AllUsers'
import User from './Pages/User'
import UserJobs from './Pages/UserJobs'
import JobAds from './Pages/JobAds'
import AddJob from './Pages/AddJob'
import UserJobDetails from './Pages/UserJobDetails'
import DeleteUserJob from './Pages/DeleteUserJob'

import { Switch, Route } from "react-router-dom";

import {useSubscription} from '@apollo/client'
import {getJobs} from '../GraphQL' 

import {useUser} from '@clerk/clerk-react'

export default function MainContent() {

  const [isUserSearching, setIsUserSearching] = useState(false)
  const [inputText, setInputText] = useState("")

  const { loading, error, data } = useSubscription(getJobs)
  const { user } = useUser()

  if (loading) return <div className="main-content-area">Loading...</div>
  if (error){
      console.log(error.message)
  }
  if (error) return <div className="main-content-area">Error: {`${error.message}`}</div>

  const userJobs = data.jobs.filter(job => job.user_id === user.id)

  const handleChange = (value) => {
    setInputText(value.toLowerCase())
  }

  const showJobsTable = () => {
    setIsUserSearching(prevState => !prevState)
  }


  return (
    <div className="main-content-area">
      <Navbar 
        handleChange={handleChange}
        showJobsTable={showJobsTable}
        isUserSearching={isUserSearching}
      />
      <div className="main-content app-container">
        {
          isUserSearching ? 
          <UserJobs 
            inputText={inputText}
            isUserSearching={isUserSearching}
            data={userJobs}
          />
          :

          <Switch>
              <Route exact path="/">
                  <AllUsers data={data} />
              </Route>
              <Route exact path="/user">
                  <User data={userJobs} />
              </Route>
              <Route path="/user/jobs">
                  <UserJobs data={userJobs} />
              </Route>
              <Route path="/jobs-ads">
                  <JobAds />
              </Route>
              <Route exact path="/user/add_new_job">
                <AddJob />
              </Route>
              <Route path="/user/edit_job/:id">
                  <UserJobDetails myJobs={userJobs}/>
              </Route>
              <Route path="/user/delete_job/:id">
                  <DeleteUserJob myJobs={userJobs}/>
              </Route>
          </Switch>
        }

      </div>
    </div>
  )
}
