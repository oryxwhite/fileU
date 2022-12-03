import { FormEvent, useState } from 'react'
import {
  usernameValidator,
  passwordValidator,
  confirmPasswordValidator,
} from "./validators";

const Register = (): JSX.Element => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    console.log(form)

    const onUpdateField = (e: React.FormEvent<HTMLInputElement>) => {
        const nextFormState = {
            ...form,
            [e.currentTarget.name]: e.currentTarget.value,
        }
        setForm(nextFormState)
    }

    const onSubmitForm = (e: FormEvent) => {
        e.preventDefault()
        alert(JSON.stringify(form, null, 2))
    }

    return (
        <>
        <h1>Register</h1>
        <form onSubmit={onSubmitForm}>
            <label>
                <p>Username</p>
                <input
                    type="text"
                    aria-label='Username field'
                    name='username'
                    value={form.username}
                    onChange={onUpdateField} />
            </label>
            <label>
                <p>Password</p>
                <input
                    type="password"
                    aria-label='Password field'
                    name='password'
                    value={form.password}
                    onChange={onUpdateField} />
            </label>
            <label>
                <p>Confirm Password</p>
                <input 
                    type="password"
                    aria-label='Confirm password field'
                    name='confirmPassword'
                    value={form.confirmPassword}
                    onChange={onUpdateField} />
            </label>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
      </>
    )
}

export default Register