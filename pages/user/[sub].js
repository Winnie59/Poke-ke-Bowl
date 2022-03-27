import { useUser } from '@auth0/nextjs-auth0'
import React from 'react'
import Image from 'next/image'

const User = () => {
    const {user} = useUser()
  return (
    <div>
      { user &&
      <div>
        <img src={user.picture} alt={user.name} objectFit='contain' />
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
      </div>
        }
    </div>
  )
}

export default User