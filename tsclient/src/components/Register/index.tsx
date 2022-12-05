import { useForm, SubmitHandler  } from 'react-hook-form';
import { IFormInput } from '../../types/interface';
import {Axios, AxiosError, isAxiosError} from 'axios'
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth, useAuthDispatch } from '../../hooks/context/context';
const Register = (): JSX.Element => {
    const authState = useAuth()
    const authDispatch = useAuthDispatch()
    const {register, handleSubmit, formState: { errors }} = useForm<IFormInput>()
    const navigate = useNavigate()

    const formSubmitHandler: SubmitHandler<IFormInput> = async (data: IFormInput) => {
        try {
            const res = await api.post('/users/register', data , {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            authDispatch({type: "setUserData", userData: res.data.user})
           
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
        <div className='flex flex-col items-center mt-10'>
        {/* <h1>Register</h1> */}
        <form className='flex flex-col items-center text-white' onSubmit={handleSubmit(formSubmitHandler)}>
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
                    {errors.username && <div className='mb-4 text-error'>{errors.username.message}</div>}
                    

            </label>
            <label>
                {/* <p>Password</p> */}
                <input
                    type="password"
                    aria-label='Password field'
                    placeholder='Password'
                    className="input border border-slate-700 w-full max-w-xs mb-4"

                    {...register('password', { required: true })}
                     />
                    {errors.password && <div className='mb-4 text-error'>This field is required</div>}

            </label>
            <label>
                {/* <p>Confirm Password</p> */}
                <input 
                    type="password"
                    aria-label='Confirm password field'
                    placeholder='Confirm Password'
                    className="input border border-slate-700 w-full max-w-xs mb-4"
                    
                    {...register('confirmPassword', { required: true })}
                    />
                    {errors.confirmPassword && <div className='mb-4 text-error'>This field is required</div>}
            </label>
            <div>
                <button className='btn text-white' type="submit">Sign Up</button>
            </div>
        </form>
      </div>
    )
}

export default Register