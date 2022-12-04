import { useState, useEffect } from 'react'
import { useAuth, useAuthDispatch } from '../../hooks/context/context'

const Logout: React.FC = () => {
    const [message, setMessage] = useState<string>('')
    const dispatch = useAuthDispatch()

    useEffect(() => {
        dispatch({type: 'clearUserData'})
        setMessage('You are logged out!')
    }, [])

    return (
        <div className='flex flex-col items-center text-white text-xl mt-20'>
            {message}
        </div>
    )
}

export default Logout