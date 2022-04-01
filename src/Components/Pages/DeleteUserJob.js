import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'

import {useParams} from "react-router-dom"
import { useSession } from '@clerk/clerk-react'

import {deleteJob} from '../../GraphQL' 

export default function DeleteUserJob(props) {

    const {id} = useParams()
    const { session } = useSession()

    const [deletedSuccessfully, setDeletedSuccessfully] = useState(false)
    const [JobData, setJobData] = useState({})

    useEffect(() => {
        if (!deletedSuccessfully) {
            setJobData(props.myJobs.filter(job => job.id === parseInt(id))[0])
        }
    }, [props.myJobs, deletedSuccessfully, id])

    // const JobData = props.myJobs.filter(job => job.id === parseInt(id))[0]

  

    const handleSubmit =  async (event) => {
        event.preventDefault()
        
        const hasuraToken = await session.getToken({template: "job-tracker-hasura"})

        fetch("https://job-tracker.hasura.app/v1/graphql", {
            method: "POST",
            ContentType: "application/json",
            headers: {
                Authorization: `Bearer ${hasuraToken}`,
            },
            body: JSON.stringify({
                query: deleteJob,
                variables: {
                    id: parseInt(id)
                }
            }),
        })
        .then(res => res.json())
        .then(data => {
            alert('successfully deleted')
            setDeletedSuccessfully(true)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <div className="job-container">
                <h3 className="text-center">Are you sure you want to delete this job:
                    <br/>
                        <span className="text-danger"> {JobData.role}</span> 
                    <br/>
                    from your saved jobs?</h3>
                <div className="d-grid gap-2 col-6 mx-auto mt-5">
                    <button 
                        type="submit"
                        className="btn btn-danger" 
                        onClick={handleSubmit}
                    >
                        Delete
                    </button>
                </div>
            </div>
            {
                deletedSuccessfully && <Redirect to="/profile/my_jobs" />
            }
        </>
    )
}
