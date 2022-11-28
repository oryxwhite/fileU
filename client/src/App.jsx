import { useState } from 'react'

function App() {
  const [file, setFile] = useState()

  const inputHandler = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = () => {
    let data = new FormData()
    data.append('file', file)
    fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: data
    }).then((res) => console.log(res))
  }

  return (
    <div>
      <h1>File Upload</h1>
      <input type='file' name='file' onChange={inputHandler} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default App
