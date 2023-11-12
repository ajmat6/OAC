import React, {useState} from 'react'
import Layout from '../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPassword, signinCredentials, verifyEmail } from '../../reducers/userAuthReducer';
import {useSelector, useDispatch} from 'react-redux'


const ForgotPassword = () => {
    const auth = useSelector((state) => state.auth);
    const mode = useSelector((state) => state.mode)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')

    const forgotPasswordEmail = (e) => {
        e.preventDefault()
        const form = {
            email
        }

        dispatch(forgotPassword(form));
    }

  return (
    <Layout footer>
        <div className='text-white md:flex'>
            <div className='w-[50%] bg-[#8F00FF] h-[92vh] hidden md:block'>
                
            </div>
            <div className='md:w-[50%]'>
                <div className='flex flex-col col-span-1 justify-center items-center md:p-8 mt-8 p-4'>
                    <div className='flext flex-col justify-start md:w-96'>
                        <div className='text-[#4db5ff]'>Oh!</div>
                        <h1 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Forgot Password!</h1>
                    </div>

                    <form action="" className='flex flex-col justify-start mt-4 md:w-[376px] w-[298px]'>
                        <div className='w-full'>
                            <div>
                                <label htmlFor="" className='text-gray-500 pb-1 text-sm '>
                                    Enter Your Email
                                    <strong className='text-red-600 font-normal m-[1px]'>*</strong>
                                </label>
                            </div>
                            <div className='mt-1'>
                                <input type="email" placeholder='Enter Email' className={`h-14 text-[11px] ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`} value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <button className='btn btn-primary md:w-[376px] sm:w-[298px]' onClick={forgotPasswordEmail}>Request</button>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ForgotPassword