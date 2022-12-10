import { gql } from "@apollo/client";
const GET_PROJECTS=gql`
        {
            projects{
                name
                description
                status
                id
            }
        }
`
const GET_PROJECT=gql`
 query getProject($id:ID!){
        project(id:$id){
               name
               description
               id
               status 
        
        client{
            name
            id
            email
            phone
        }
    }
 }
`
export {GET_PROJECTS,GET_PROJECT}