import { getProtected } from '../../services/api'
import { useEffect, useState } from 'react'
import Upload  from './upload'
import {IUserStore, IFile} from '../../types/interface'

const Dash = (): JSX.Element => {
    const [message, setMessage] = useState<string>('')
    const [files, setFiles] = useState<IFile[] | null>()

    useEffect(() => {
        getProtected()
            .then((res) => {
                setMessage(res.data?.msg)
                const userData = localStorage.getItem('user')
                if (userData !== null) {
                    const modifiedUser: IUserStore = JSON.parse(userData)
                    modifiedUser.files = res.data.files
                    localStorage.setItem('user', JSON.stringify(modifiedUser))
                    setFiles(res.data.files)
                    // console.log(localStorage.getItem('user'))
                }
            })
            .catch(err => console.log(err))
    }, [])

    const renderFiles = 
        files?.map((file) => {
            return <img key={file.filename} src={file.location} width='500px'></img>
        })
    

    return (
    <>
        <h1>{message}</h1>
        <Upload></Upload>
        {renderFiles}
    </>
    )
}

export default Dash