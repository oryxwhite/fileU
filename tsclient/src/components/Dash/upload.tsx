import axios from 'axios'
import { useEffect, useState } from 'react'
import authHeader from '../../services/auth'

const Upload  =  () => {
  const [file, setFile] = useState<null | Blob>(null)
  const [status, setStatus] = useState<null | string>(null)
  const [header, setHeader] = useState(null)

  useEffect(() => {
      const header = authHeader().Authorization
      setHeader(header)
      console.log(header)
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
        
    

    axios.post('http://localhost:4000/users/upload', data, {
      headers: { 
        "Content-Type": "multipart/form-data",
        "Authorization": header,
    },

    }).then((res) => {
      if (res.status === 200) {
        console.log(res)
        setFile(null)
        setStatus('Upload Success!')
      }
    }).catch(err => console.log(err))
  }
  console.log(status)
    }
  return (
    <div>
      <h1>File Upload</h1>
      <input type='file' name='file' onChange={inputHandler} />
      <button onClick={handleUpload}>Upload</button>
      <h2>{status}</h2>
    </div>
  )
}

export default Upload
