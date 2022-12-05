import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth, useAuthDispatch } from '../../hooks/context/context'
import { api } from '../../services/api'
import {IFile} from '../../types/interface'

type Props = {
  setFiles: React.Dispatch<React.SetStateAction<IFile[]>>
  files: IFile[]
}

const Upload: React.FC<Props> =  ({setFiles, files}: Props) => {
  const [file, setFile] = useState<null | Blob>(null)
  const [status, setStatus] = useState<null | string>(null)
  const [header, setHeader] = useState<string>('')
  const dispatch = useAuthDispatch()
  const token = useAuth().userDetails?.token
  const username = useAuth().userDetails?.username
  
  
  useEffect(() => {
    if (token) {setHeader(token)}
    // console.log(token)
  }, [])

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(null)
    if (e.target.files) {
        console.log(e.target.files)
        setFile(e.target.files[0])}
        console.log(file)
  }

  const handleUpload = () => {
    if (file != null){ 
        let data = new FormData()
        data.append('file', file)
        for (let key of data.entries()) {
            console.log(key)
        }
        
    api.post('/users/upload', data, {
      headers: { 
        "Content-Type": "multipart/form-data",
        "Authorization": header,
    },

    }).then((res) => {
      if (res.status === 200) {
        console.log(res)
        setFile(null)
        setStatus('Upload Success!')
        
        setFiles(res.data.files)
        dispatch({type: 'setUserData', userData: {
          username: res.data.username,
          token: header,
          files: res.data.files

        }})
        // setFiles(res.data.files)
        // console.log(files)
      }
    }).catch(err => console.log(err))
  }
  console.log(status)
    }
  return (
    <div className='flex flex-col items-center'>
      {/* <h1>File Upload</h1> */}
      <input type='file' name='file' onChange={inputHandler} className='file-input file-input-bordered file-input-secondary w-full max-w-xs mb-4' />
      <button  className={`btn mb-20 text-white`} onClick={handleUpload}>{(status != null) ? "Upload Success!" : 'Upload'}</button>
      {/* <h2 className='text-white font-bold text-xl mb-8'>{status}</h2> */}
    </div>
  )
}

export default Upload
