import { useState } from "react"
import { Link, Navigate, useLocation, useRouter } from '@tanstack/react-location';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { PasswordEye } from '../../Common/icons/PasswordEye';
import { VerticalLogo } from '../../Common/icons/VerticalLogo';
import { useAuth } from '../../Hooks/AuthContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().required('Password is required'),
})

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const auth = useAuth()
  const router = useRouter()
  const location = useLocation()

  if (auth.status === "loggedIn" && auth.user && auth.user.id) {
    if (location.current.search.next) {
      // console.log("There was a Next in path: ", location.current.search.next)
      return <Navigate to={`${location.current.search.next}`} />
    } else {
      // console.log("There was NOT a Next in path")
      return <Navigate to={`/`} />
    }
  }

  const loginFn = (values: { email: string, password: string }) => {
    auth.login(values.email, values.password)
  }

  return (
    <div className='flex h-full justify-center items-center '>
      <div className='flex flex-col justify-center items-center  py-9 px-4 w-full sm:w-full md:w-8/12 lg:w-5/12 xl:w-5/12 2xl:w-4/12 shadow-md'>

        <VerticalLogo />
        <div className="mb-8"></div>
        <div className='text-4xl mt-4 mb-8'>Login existing account</div>

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
            password: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={loginFn}
        >
          {({ errors, touched }) => (
            <Form className='flex flex-col mt-8 w-full px-2'>
              <Field name='email' type="email" placeholder="Email" className="flex border-[1px] border-charcoal border-opacity-25 rounded-md p-2" />
              {errors.email && touched.email ? (
                <div className='text-red-600'>{errors.email}</div>
              ) : null}
              <div className='mt-6'></div>
              <div className='flex flex-row'>
              <Field name='password' type={showPassword ? "text" : "password"} placeholder="Password" className="flex flex-1 border-[1px] border-charcoal border-opacity-25 rounded-md p-2" />
                <button type="button" className='pl-2' onClick={() => setShowPassword(!showPassword)}>
                  <PasswordEye showPassword={showPassword} />
                </button>
              </div>
              {errors.password && touched.password ? (
                <div className='text-red-600'>{errors.password}</div>
              ) : null}
              <Link to="/forgotPassword" className='mt-8 italic underline' >Forgot password?</Link>
              <button type='submit' className='bg-charcoal rounded-sm text-white py-2  mt-4'>Login</button>
              <div className="text-center my-4">OR</div>
              <div className="mt-4 mb-1">
                If you want to create a new Practitioner account click register
              </div>
              <Link to="/signup" className='bg-primary-red rounded-sm text-white py-2 text-center mt-2' >Register new account</Link>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  )
}
