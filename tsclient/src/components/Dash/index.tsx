// import { getProtected } from '../../services/api'
import { useEffect, useState } from 'react'
import Upload  from './upload'
import {IUserStore, IFile} from '../../types/interface'
import axios from 'axios'
import { useAuth, useAuthDispatch } from '../../hooks/context/contexxt'

const Dash = (): JSX.Element => {
    const [message, setMessage] = useState<string>('')
    const [files, setFiles] = useState<IFile[] | null>()
    const state = useAuth()
    const dispatch = useAuthDispatch()
    console.log(state)

    useEffect(() => {
        axios.get('http://localhost:4000/users/protected', { headers: { Authorization: state.userDetails?.token}})
            .then((res) => {
                setMessage(res.data?.msg)  
                setFiles(res.data.user.files)
                // console.log(res.data.user)
                // dispatch({type: 'setUserData', userData: res.data.user})
                // const userData = localStorage.getItem('user')
                // if (userData !== null) {
                //     const modifiedUser: IUserStore = JSON.parse(userData)
                //     modifiedUser.files = res.data.files
                //     localStorage.setItem('user', JSON.stringify(modifiedUser))
                //     setFiles(res.data.files)
                //     // console.log(localStorage.getItem('user'))
                // }
            })
            .catch(err => console.log(err))
    }, [])

    const renderFiles = 
        files?.map((file) => {
            return <img key={file.filename} src={file.location} width='500px'></img>
        })
    

    return (
    <div className='flex flex-col items-center'>
        <h1 className='my-10'>{message}</h1>
        <Upload></Upload>
        {renderFiles}
    </div>
    )
}

export default Dash