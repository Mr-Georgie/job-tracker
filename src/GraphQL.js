// CRUD graphql queries for my hasura backend
import { gql } from '@apollo/client'

// CREATE
export const addJob = `
    mutation($additional_tech: String!, $experience: String!, $job_type: String!, $location: String!, $number_hiring: String!, $price_range: String!, $role: String!, $technology: String!) {
        insert_jobs_one(object: {
        additional_tech: $additional_tech, 
        experience: $experience, 
        job_type: $job_type, 
        location: $location, 
        number_hiring: $number_hiring, 
        price_range: $price_range, 
        role: $role, 
        technology: $technology}) {
        additional_tech
        experience
        id
        job_type
        location
        number_hiring
        price_range
        role
        technology
        user_id
        }
    }
  
`

// READ
export const getJobs = gql`
  subscription Jobs {
    jobs {
      id
      experience
      role
      job_type
      additional_tech
      location
      price_range
      number_hiring
      technology
      user_id
    }
  }
`

// UPDATE
export const updateJob = `
    mutation($id: Int!, $data: jobs_set_input!){
        update_jobs_by_pk(pk_columns: {id: $id}, _set: $data) {
        additional_tech
        experience
        id
        job_type
        location
        number_hiring
        price_range
        role
        technology
        }
    }
  
`

// DELETE
export const deleteJob = `
    mutation DeleteJobById($id: Int!) {
        delete_jobs_by_pk(id: $id) {
        id
        }
    }
`
