import { useState } from 'react'

function App() {
  const [file, setFile] = useState()
  const [status, setStatus] = useState()
  const inputHandler = (e) => {
    setStatus(null)
    setFile(e.target.files[0])
  }

  const handleUpload = () => {
    let data = new FormData()
    data.append('file', file)
    fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: data
    }).then((res) => {
      if (res.status === 200) {
        setFile(null)
        setStatus('Upload Success!')
      } else if (res.status === 500) {
        console.log(res)
      }
    })
  }
  console.log(status)

  return (
    <div>
      <h1>File Upload</h1>
      <input type='file' name='file' onChange={inputHandler} />
      <button onClick={handleUpload}>Upload</button>
      <h2>{status}</h2>
    </div>
  )
}

export default App
