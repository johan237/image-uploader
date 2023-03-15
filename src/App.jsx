import { useState,useEffect } from 'react'
import axios from 'axios'

function App() {

  const [file, setFile] = useState(null)
  const [imgSrc, setImgSrc] = useState('')
  const [showError, setShowError] = useState(false)
  const [cloudImage, setCloudImage] = useState('')
  const [progression, setProgression] = useState(0)
  const [imgUrl,  setImgUrl] = useState('')

  const [final, setFinal]  = useState(false)
  function handleDragOver(event){
    event.preventDefault()
    event.target.style.borderColor = '#1A5FBE';
  }

  function copyToClipBoard(){
    navigator.clipboard.writeText(imgUrl);
    alert('copied successfully');
  }

async function handleFileButton(event){
  const selectedFile = event.target.files[0];
  await readFile(selectedFile)
}

  function displayErrorMessage(){
    setShowError(true)
  return   setTimeout(()=>{
      setShowError(false)
      },4000)
  }

  async function uploadCloudinary(filename){
    console.log('running upload cloudinary')  
    const res2 = await axios.post('http://localhost:5000/api/image',{ imagePath: filename},{
        onUploadProgress:(data)=>{setTimeout(()=>{
          setProgression(data.loaded/data.total * 100)
        },500)}
      });
     const result = await res2.data
     console.log(res2)
      if(res2.status == 200){
        setImgUrl(result.image)
        console.log(result)
        // setImgUrl(result.url)
      }else{
        const errMessage = "An error occurred, ensure image size is not large or check your connectivity"
      }
  }

  async function readFile(file){
    console.log(file)
    console.log(file.type)
    if(!['jpeg','png','svg+xml','svg','jpg','gif'].includes(file.type.split('/')[1])){
          return displayErrorMessage();  
    }
    setFile(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', async(e)=>{
      setImgSrc(e.target.result)
      console.log(e.target.result)
      await uploadCloudinary(e.target.result)
      setTimeout(()=> setFinal(true), 500)
    })
  }

  async  function handleDrop(event){
    event.preventDefault()
    let files = Array.from(event.dataTransfer.files)
    await readFile(files[0])
  }

  return (
    <div className="app">
      {
      showError && 
      <div className="error">
        File extension should match .png,.svg, .jpeg, .jpg or .gif
      </div>}

   {!file && <h1 className='main--title'>Upload your image</h1>}
   {! file && <p className='main--p'>File should be Jpeg, Png,...</p>}
    {
      !file && 

    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    className='main--img-container'>
      <img  src="/image.svg" alt="" srcSet="" />
      <p>Drag & Drop your image here</p>
    </div>

    }
   {
    !file &&
    <div>

    <p className='main--or'>Or</p>
    <input onChange={handleFileButton} className='fileInput' type="file" id='file' hidden/>
    <label className='btn' htmlFor="file">Choose a file</label>
    </div>
    
   }
   {
    (file && !final)  &&

   <div className='uploadProgress'>
        <h1 className='main--title'>Uploading</h1>
        <progress id='bar' value={progression} max="100" min="0"></progress>
   </div>
   
   }

   {
    (file && final ) &&
    <div className='completed'>
    <img className='okIcon' src="/Group120.svg" alt="" srcSet="" />
      <h1 className='sss'>Uploaded successfully</h1>
      <div className='finalImageContainer'><img className='finalImage' src={imgUrl}  alt="hell " /></div>

      <div className='divCopy'>
        <p id='imgUrlText'>{imgUrl}</p>
        <div onClick={copyToClipBoard} className="btn"> Copy Link</div>
      </div>
    </div>
   }

</div>
  )
}
export default App
