import React, {useState} from 'react'

import Header from '../SubComponents/Header'

import { Redirect } from 'react-router-dom'
import {useParams} from "react-router-dom"
import { useSession } from '@clerk/clerk-react'

import {updateJob} from '../../GraphQL' 

export default function UserJobDetails(props) {

    const {id} = useParams()
    const { session } = useSession()

    const userJob = props.myJobs.filter(job => job.id === parseInt(id))[0]

    const [savedSuccessfully, setSavedSuccessfully] = useState(false)
    const [formData, setFormData] = useState(
        {
            additional_tech:userJob.additional_tech,
            experience: userJob.experience,
            job_type: userJob.job_type,
            location: userJob.location,
            number_hiring: userJob.number_hiring,
            price_range: userJob.price_range,
            role: userJob.role,
            technology: userJob.technology,
            
        }
    )

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name] : value
            }
        })
    }

    console.log(formData)

    const handleSubmit =  async (event) => {
        event.preventDefault()
        
        const hasuraToken = await session.getToken({template: "hasura"})

        fetch("https://job-tracker.hasura.app/v1/graphql", {
            method: "POST",
            ContentType: "application/json",
            headers: {
                Authorization: `Bearer ${hasuraToken}`,
            },
            body: JSON.stringify({
                query: updateJob,
                variables: {
                    id: parseInt(id),
                    data: {
                        "additional_tech": formData.additional_tech,
                        "experience": formData.experience,
                        "job_type": formData.job_type,
                        "location": formData.location,
                        "number_hiring": formData.number_hiring,
                        "price_range": formData.price_range,
                        "role": formData.role,
                        "technology": formData.technology
                    }
                }
            }),
        })
        .then(res => res.json())
        // .then(data => console.log('data returned:', data))
        .then(data => {
            alert('successfully edited')
            setSavedSuccessfully(true)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <Header 
                goingTo={"editPage"}
            />
            <div className="job-container">
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="role" className="col-sm-5 col-form-label">*Role:</label>
                        <div className="col-sm-7">
                            <select 
                                className="form-control"
                                value={formData.role}
                                onChange={handleChange}
                                name='role'
                            >
                                <option value="{formData.role}">{`--${formData.role}--`}</option>
                                <option value="Full Stack">Full Stack</option>
                                <option value="Back End">Back End</option>
                                <option value="Front End">Front End</option>
                                <option value="UI/UX">UI/UX</option>
                                <option value="Database Adminstrator">Database Adminstrator</option>
                                <option value="DevOps">DevOps</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="" className="col-sm-5 col-form-label">Job Type:</label>
                        <div className="col-sm-7">
                            <select 
                                className="form-control"
                                value={formData.job_type}
                                onChange={handleChange}
                                name='job_type'
                            >
                                <option value="{formData.job_type}">{`--${formData.job_type}--`}</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Remote">Remote</option>
                                <option value="Contract">Contract</option>
                                <option value="Part Time">Part Time</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="" className="col-sm-5 col-form-label">Price range:</label>
                        <div className="col-sm-7">
                            <select 
                                className="form-control"
                                value={formData.price_range}
                                onChange={handleChange}
                                name='price_range'
                            >
                                <option value="{formData.price_range}">{`--${formData.price_range}--`}</option>
                                <option value="Below 100,000">Below 100,000</option>
                                <option value="100,000 - 300,000">100,000 - 300,000</option>
                                <option value="300,000 - 500,000">300,000 - 500,000</option>
                                <option value="500,000 - 1M">500,000 - 1M</option>
                                <option value="Above 1M">Above 1M</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="" className="col-sm-5 col-form-label">Experience:</label>
                        <div className="col-sm-7">
                            <select 
                                className="form-control"
                                value={formData.experience}
                                onChange={handleChange}
                                name='experience'
                            >
                                <option value="{formData.experience}">{`--${formData.experience}--`}</option>
                                <option value="Intern">Intern</option>
                                <option value="Junior">Junior</option>
                                <option value="Mid Level">Mid Level</option>
                                <option value="Senior">Senior</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="" className="col-sm-5 col-form-label">Number to be hired:</label>
                        <div className="col-sm-7">
                            <input type="text" name='number_hiring' 
                                onChange={handleChange} 
                                value={formData.number_hiring} 
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="" className="col-sm-5 col-form-label">Location:</label>
                        <div className="col-sm-7">
                            <input type="text" name='location' 
                                onChange={handleChange} 
                                value={formData.location} 
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="" className="col-sm-5 col-form-label">Technology:</label>
                        <div className="col-sm-7">
                            <input type="text" name='technology' 
                                onChange={handleChange} 
                                value={formData.technology} 
                                className="form-control"
                            />
                        </div>
                        <div class="form-text">** Additional Technology is optional for now</div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="" className="col-sm-5 col-form-label">Additional Technology:</label>
                        <div className="col-sm-7">
                            <input type="text" name='additional_tech' 
                                onChange={handleChange} 
                                value={formData.additional_tech} 
                                className="form-control"
                            />
                        </div>
                    </div>
                    
                    <div className="d-grid gap-2 col-6 mx-auto mt-5">
                        <button type="submit" className="btn custom-btn">Save</button>
                    </div>
                </form>
            </div>

            {
                savedSuccessfully && <Redirect to="/user/jobs" />
            }
        </>
    )
}
