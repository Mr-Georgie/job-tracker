import React, { useState} from 'react'

// import { useMutation, gql } from '@apollo/client'
import { useSession } from '@clerk/clerk-react'

export default function UserProfile() {

    const { getToken } = useSession()

    const handleSubmit = async () => {
        const hasuraToken = await getToken({template: "job-tracker-hasura"})

        fetch("https://job-tracker.hasura.app/v1/graphql", {
            method: "POST",
            ContentType: "application/json",
            headers: {
                Authorization: `Bearer ${hasuraToken}`,
            },
            body: JSON.stringify({
                query: `
                mutation AddTodos {
                    insert_todos_one(object: {title: "I just added you"}) {
                      completed
                      id
                      title
                      user_id
                    }
                  }
                `,
            }),
        })
    
    }


    return (
        <>
            <h1>
                Profile Page
            </h1>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            
        </>
    )
}
