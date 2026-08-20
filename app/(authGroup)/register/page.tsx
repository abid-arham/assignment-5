import React from 'react'
import RegisterForm from '../_components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome to FixItNow!</h1>
          <p className="text-gray-500">
            create your account
          </p>

        </div>

        <RegisterForm/>

      </div>

    </div>
  )
}

export default RegisterPage