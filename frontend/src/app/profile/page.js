'use client'

import { useAuth } from '../auth/authContext'

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return <p className="p-4">Please login to view your profile.</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p>
        <strong>Name:</strong> {user.name || user.firstName || 'User'}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  )
}
