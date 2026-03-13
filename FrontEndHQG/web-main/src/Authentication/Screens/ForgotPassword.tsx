import { Link, Navigate, useNavigate, useRouter } from '@tanstack/react-location';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../Hooks/AuthContext';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email must be a valid email").required('Email is Required'),
})

export const ForgotPassword = () => {
  const auth = useAuth()
  const [done, setDone] = useState<string | null>(null)


  if (auth.status === "loggedIn" && auth.user && auth.user.id) {
    return <Navigate to={`/${auth.user.id}/dashboard`} />
  }

  const forgotPasswordFn = (values: { email: string }) => {
    auth.forgotPassword(values.email, () => {
      setDone("Successfully sent password reset link to your mail, return to login in with new password.")
    })
  }

  return (
    <div className='flex h-full justify-center items-center '>
      <div className='flex flex-col justify-center items-center  py-9 px-4 w-full sm:w-full md:w-6/12 lg:w-4/12 xl:w-3/12 shadow-md'>

        <div className='flex w-16 h-16 text-center items-center justify-center text-xl'>
          <svg width="112" height="94" viewBox="0 0 112 94" className=' h-60 w-60' fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.40197 4.08203H0V90.9906H6.40197V4.08203Z" fill="black" />
            <path d="M42.0419 44.3389H13.918V50.7408H42.0419V44.3389Z" fill="black" />
            <path d="M76.0436 92.9878L49.7695 66.7095V28.9847L78.7542 0L108.645 29.891V64.272L102.243 58.0149V32.5436L78.7542 9.05462L56.1715 31.6374V64.0569L85.0983 92.9878H76.0436Z" fill="black" />
            <path d="M89.0436 66.6721L84.5684 71.25L106.819 93.0012L111.294 88.4233L89.0436 66.6721Z" fill="black" />
          </svg>
        </div>

        <div className='text-2xl mt-1'>HeartQuest</div>
        <div className='text-xl mt-4'>Forgot Password</div>

        {auth.status === "loading" ? <div className='mt-4'>
          <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-charcoal" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div> : null}

        {done ? <div className='mt-4 text-primary-green text-center'>{done}</div> : null}

        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={forgotPasswordFn}
        >
          {({ errors, touched }) => (
            <Form className='flex flex-col mt-8 w-full px-2'>
              <Field name='email' type="email" placeholder="Email" className="flex border-[1px] border-charcoal border-opacity-25 rounded-md p-2" />
              {errors.email && touched.email ? (
                <div className='text-red-600'>{errors.email}</div>
              ) : null}
              {/* <div className='mt-6'></div> */}
              <button type='submit' className='bg-charcoal rounded-sm text-white py-2  mt-4'>Mail Reset Link</button>
              <div className='flex flex-row items-center gap-4 mt-2'>
                <Link to="/login" className='text-sm mt-4' >Or <span className='bg-light-grey rounded py-1 px-2'>Login</span></Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rotate-90 mt-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
                <Link to="/signup" className='text-sm mt-4' ><span className='bg-light-grey rounded py-1 px-2'>Sign Up</span></Link>
              </div>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  )
}
