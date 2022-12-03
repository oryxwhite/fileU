import { FormEvent, useState } from 'react'
import { useForm, SubmitHandler  } from 'react-hook-form';
import { IFormInput } from '../../types/interface';
import {Axios, AxiosError, isAxiosError} from 'axios'
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import authHeader from '../../services/auth';

const Register = (): JSX.Element => {

    const {register, handleSubmit, watch, formState: { errors }} = useForm<IFormInput>()
    const navigate = useNavigate()

    const formSubmitHandler: SubmitHandler<IFormInput> = async (data: IFormInput) => {
        try {
            const res = await api.post('http://localhost:4000/users/register', data , {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            // console.log(res.data)
            localStorage.setItem('user', JSON.stringify(res.data))
            // localStorage.setItem("token", res.data?.token)
            // console.log(localStorage.getItem('user'))
            if (authHeader().loggedIn) navigate('/dash') 

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
        <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            <label>
                <p>Username</p>
                <input
                    type="text"
                    aria-label='Username field'
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
                <p>Password</p>
                <input
                    type="password"
                    aria-label='Password field'
                    {...register('password', { required: true })}
                     />
                    {errors.password && <span>This field is required</span>}

            </label>
            <label>
                <p>Confirm Password</p>
                <input 
                    type="password"
                    aria-label='Confirm password field'
                    {...register('confirmPassword', { required: true })}
                    />
                    {errors.confirmPassword && <span>This field is required</span>}
            </label>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
      </>
    )
}

export default Register