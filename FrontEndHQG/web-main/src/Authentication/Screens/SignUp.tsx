import { Link, Navigate } from '@tanstack/react-location';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { PasswordEye } from '../../Common/icons/PasswordEye';
import { VerticalLogo } from '../../Common/icons/VerticalLogo';
import { useAuth } from '../../Hooks/AuthContext';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required('Email Required'),
  firstName: Yup.string().required("Firstname Required"),
  lastName: Yup.string().required("Lastname Required"),
  birthDay: Yup.number().min(1).max(31).required("Birth Day is Required"),
  birthMonth: Yup.number().required("Birth Month is Required"),
  birthYear: Yup.number().min(new Date().getFullYear() - 130).max(new Date().getFullYear() - 8).required("Birth Year is required"),
  gender: Yup.string().oneOf(['male', 'female'], 'Please Select Gender').required('Gender is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match').required("Confirm password is required")
})

export const SignUp = () => {
  const auth = useAuth()

  const [showPassword, setShowPassword] = useState(false)

  if (auth.status === "loggedIn" && auth.user && auth.user.id) {
    return <Navigate to={`/${auth.user.id}/dashboard`} />
  }

  return (
    <div className='flex min-h-full justify-center items-center py-8'>
      <div className='flex flex-col justify-center items-center my-8 py-9 px-4 w-full sm:w-full md:w-8/12 lg:w-6/12 xl:w-6/12 shadow-md'>
     <VerticalLogo /> 
        <div className="mb-8"></div>
        <div className='text-4xl mt-4 mb-8'>Register new practitioner</div>

        {auth.status === "loading" ? <div className='mt-4'>
          <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-charcoal" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div> : null}

        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            birthDay: 1,
            birthMonth: 0,
            birthYear: 1960,
            gender: 'male',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={(v) => {
            auth.signup({
              email: v.email,
              firstName: v.firstName,
              lastName: v.lastName,
              birthdate: new Date(v.birthYear, v.birthMonth, v.birthDay),
              gender: v.gender as "male" | "female",
              password: v.password
            })
          }}
        >
          {({ errors, touched }) => (
            <Form className='flex flex-col mt-8 w-full px-2'>

              <Field name='email' type="email" placeholder="Email" className="flex border-[1px] border-charcoal border-opacity-25 rounded-md p-2" />
              {errors.email && touched.email ? (
                <div className='text-red-600'>{errors.email}</div>
              ) : null}

              <div className='mt-6'></div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col flex-1 w-full'>
                  <Field name='firstName' placeholder="First Name" className="flex flex-1 border-[1px] border-charcoal border-opacity-25 rounded-md p-2" />
                  {errors.firstName && touched.firstName ? (
                    <div className='text-red-600'>{errors.firstName}</div>
                  ) : null}
                </div>
                <div className='flex flex-col flex-1 w-full'>
                  <Field name='lastName' placeholder="Last Name" className="flex flex-1 border-[1px] border-charcoal border-opacity-25 rounded-md p-2" />
                  {errors.lastName && touched.lastName ? (
                    <div className='text-red-600'>{errors.lastName}</div>
                  ) : null}
                </div>
              </div>

              <div className='mt-6'></div>

              <div className=''>Date of birth</div>
              <div className='flex sm:flex-row flex-wrap gap-4'>
                <div className=''>
                  <Field name='birthDay' placeholder="Birth Day" className=" w-24 border-[1px] border-charcoal border-opacity-25 rounded-md p-2" />

                </div>
                <div className=''>
                  <Field as="select" name="birthMonth" className="  border-[1px] border-charcoal border-opacity-25 rounded-md p-2">
                    {
                      [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                      ].map((m, i) => {
                        return <option key={i} value={i}>{m}</option>
                      })
                    }
                  </Field>

                </div>
                <div className=''>
                  <Field name='birthYear' placeholder="Birth Year" className=" w-24 border-[1px] border-charcoal border-opacity-25 rounded-md p-2" />
                </div>

              </div>
              {errors.birthDay && touched.birthDay ? (
                <div className='text-red-600'>{errors.birthDay}</div>
              ) : null}
              {errors.birthMonth && touched.birthMonth ? (
                <div className='text-red-600'>{errors.birthMonth}</div>
              ) : null}
              {errors.birthYear && touched.birthYear ? (
                <div className='text-red-600'>{errors.birthYear}</div>
              ) : null}

              <div className='mt-6'></div>

              <Field as="select" name='gender' placeholder="Gender" className="flex border-[1px] border-charcoal border-opacity-25 rounded-md p-2" >
                <option value="male" >Male</option>
                <option value="female" >Female</option>
              </Field>

              {errors.gender && touched.gender ? (
                <div className='text-red-600'>{errors.gender}</div>
              ) : null}

              <div className='mt-6'></div>

              <div className=''>Password</div>
              <div className='flex flex-row'>
                <Field name='password' type={showPassword ? "text" : "password"} placeholder="Password" className="flex flex-1 border-[1px] border-charcoal border-opacity-25 rounded-md p-2" />
                <button type="button" className='pl-2' onClick={() => setShowPassword(!showPassword)}>
                  <PasswordEye showPassword={showPassword} />
                </button>
              </div>
              {errors.password && touched.password ? (
                <div className='text-red-600'>{errors.password}</div>
              ) : null}
                <div className='text-gray-500'>Passwords require 8 or more characters and less the 256</div>
              <div className='mt-6'></div>
              <div className=''>Repeat to confirm password</div>
              <div className='flex flex-row'>
              <Field name='confirmPassword' type={showPassword ? "text" : "Password"} placeholder="Password" className="flex flex-1 border-[1px] border-charcoal border-opacity-25 rounded-md p-2" />
                <button type="button" className='pl-2' onClick={() => setShowPassword(!showPassword)}>
                  <PasswordEye showPassword={showPassword} />
                </button>
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className='text-red-600'>{errors.confirmPassword}</div>
              ) : null}
              <Link to="/forgotPassword" className='mt-8 italic underline' >Forgot password?</Link>
              <button type='submit' className='bg-charcoal rounded-sm text-white py-2  mt-4'>Register new practitioner</button>
              <div className="text-center my-4">OR</div>
              <div className="mt-4 mb-1">
                If you already have a Practitioner account go to login below
              </div>
              <Link to="/login" className='bg-primary-red rounded-sm text-white py-2 text-center mt-2' >Go to login</Link>
            </Form>
          )}

        </Formik>
      </div>


    </div>
  )
}
