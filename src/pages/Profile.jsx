import React from 'react'
import Header from '../components/Header'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
const Profile = () => {

  const auth = getAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut()
    navigate('/signin')
}
  return (
    <div>
      <Header />
      <div className='w-1/3 mx-auto flex justify-between'>
        <button className='bg-blue-400 px-4 py-1 rounded-md'><Link to="/addproperty">Add Property</Link></button>
        <button onClick={onLogout} className='bg-red-400 px-4 py-1 rounded-md'>Logout</button>
      </div>
      
    </div>
  )
}

export default Profile