// import { getProtected } from '../../services/api'
import { useEffect, useState } from 'react'
import Upload  from './upload'
import {IUserStore, IFile} from '../../types/interface'
import axios from 'axios'
import { useAuth, useAuthDispatch } from '../../hooks/context/context'
import { api } from '../../services/api'

const Dash: React.FC = (): JSX.Element => {
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [files, setFiles] = useState<IFile[]>([] as IFile[])
    const state = useAuth()
    const dispatch = useAuthDispatch()
    
    console.log(state.userDetails?.files)


    useEffect(() => {
        setLoading(true)
        api.get('/users/protected', { headers: { Authorization: state.userDetails?.token}})
            .then((res) => {
                setLoading(false)
                console.log(res.data)
                setMessage(res.data?.msg)  
                setFiles(res.data.userData.files)
            })
            .catch(err => console.log(err))
    }, [])


    console.log(files)

    const renderFiles = 
        files.map((file) => {
            return <img key={file.location} src={file.location} width='500px'></img>
        })
    

    return (
    <div className='flex flex-col items-center mt-20'>
        {/* <h1 className='my-10'>{message}</h1> */}
        <Upload setFiles={setFiles} files={files}></Upload>
        {loading && 'loading...'}
        {renderFiles}
    </div>
    )
}

export default Dash