import React from 'react'
import useAuth from'./useAuth'

const Dashboard = ({code}) => {
    const accessToken = useAuth(code)
    return (
        <div>
            <h1>Dashboard</h1>
            {accessToken}
        </div>
    )
}


export default Dashboard;