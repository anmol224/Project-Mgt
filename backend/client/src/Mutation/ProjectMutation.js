import {gql} from  "@apollo/client"

const ADD_PROJECT=gql`
  mutation addProject($name:String!,$description:String!,$status:projectStatus!,$ClientId:ID!){
     addProject(name:$name,description:$description,status:$status,ClientId:$ClientId){
        name
        description
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
const DELETE_PROJECT=gql`
   mutation deleteproject($id:ID!){
            deleteproject(id:$id){
                  id 
                  
            }
   }
`
const UPDATE_PROJECT=gql`
   mutation updateproject($id:ID!,$name:String!,$description:String!,$status:ProjectStatusUpdate!){
         updateproject(id:$id,name:$name,description:$description,status:$status){
            name 
            description
            status
         }

   }
`
export {ADD_PROJECT,DELETE_PROJECT,UPDATE_PROJECT}