import { FormEvent, useContext, useState } from 'react'
import { useForm, SubmitHandler  } from 'react-hook-form';
import { IFormInput } from '../../types/interface';
import {Axios, AxiosError, isAxiosError} from 'axios'
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import  authHeader from '../../services/auth'
import { AuthContext, useAuthDispatch, useAuth} from '../../hooks/context/context';



const Login = (): JSX.Element => {
    // const state = useContext(AuthContext)
    const dispatch = useAuthDispatch()
    const state = useAuth()
    const {register, handleSubmit, formState: { errors }} = useForm<IFormInput>()
    const navigate = useNavigate()

    const formSubmitHandler: SubmitHandler<IFormInput> = async (data: IFormInput) => {
        try {
            const res = await api.post('http://localhost:4000/users/login', data , {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            // console.log(res.data)
            // localStorage.setItem('user', JSON.stringify(res.data))
            dispatch({type: "setUserData", userData: res.data.user})
            console.log(state)
            // localStorage.setItem("token", res.data?.token)
            // console.log(localStorage.getItem('user'))
            // if (authHeader().loggedIn) navigate('/dash') 
            navigate('/dash')


        } catch(err) {
            if (isAxiosError(err)) {
                if (err.response?.status === 400) {
                    console.log(err)
                } else {
                    console.log(err)
                }
            }
        }
    }

    return (
        <div className='flex flex-col items-center'>
        {/* <h1>Login</h1> */}
        <form className='flex flex-col items-center mt-10 text-white' onSubmit={handleSubmit(formSubmitHandler)}>
            <label>
                {/* <p>Username</p> */}
                <input
                    type="text"
                    aria-label='Username field'
                    placeholder='Username'
                    className="input border border-slate-700 w-full max-w-xs mb-4"
                    {...register('username', { 
                        required: {
                            value: true, 
                            message: 'This field is required'}, 
                        minLength: {
                            value:8, 
                            message:'Username must be more than 8 characters'},
                        pattern: {
                            value: /^[A-Za-z][A-Za-z0-9_]{7,39}$/,
                            message: "Special characters are not allowed"
                        }
                        })}
                    />
                    {errors.username && <span>{errors.username.message}</span>}
                    

            </label>
            <label>
                {/* <p>Password</p> */}
                <input
                    type="password"
                    aria-label='Password field'
                    placeholder='password'
                    className="input border border-slate-700 w-full max-w-xs mb-4"

                    {...register('password', { required: true })}
                     />
                    {errors.password && <span>This field is required</span>}

            </label>
            <div>
                <button type="submit" className='btn text-white'>Login</button>
            </div>
        </form>
      </div>
    )
}

export default Login