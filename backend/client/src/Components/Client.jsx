import {gql,useQuery} from '@apollo/client'
import { FaDigitalTachograph } from 'react-icons/fa'
import ClientRow from './ClientRow'
import { GET_CLIENTS } from '../query/ClientQuery'
import Spinner from './Spinner'

export default function Client(){
    const {loading,error,data}=useQuery(GET_CLIENTS)
    if(loading)
      return  <Spinner/>
    if(error)
        return <p>Something Went Wrong</p>

    if(!loading && !error)
        return(
            <>
                <table className='table table-hover mt-3'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                       {data.clients.map(client =>(
                        <ClientRow key={client.id} client={client}/>
                       ))}
                    </tbody>

                </table>
            </>
        )
}