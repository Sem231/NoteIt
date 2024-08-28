import axios from "axios"
import { useState } from "react"
import cheerio from 'cheerio'
import { useDispatch } from "react-redux"
import { setFileData } from "../../../components/feature/AudioSlice"
import { ScaleLoader } from "react-spinners"
import { toast } from "react-toastify"
const WebtoText = () => {
  const [url,setUrl]=useState<string>('')
  const [loading,setLoding]=useState(false)
  const dispatch=useDispatch()
  const WebUrl=(e:any)=>{
    setUrl(e.target.value)
   }
   let truncatedText:any;
   const  TruncateText=(text:any)=> {
    const words = text.split(" ");
    let maxWords;
  
    if (words.length >= 1500 && words.length < 2000) {
      maxWords = words.length-200;
    } else if (words.length >= 2000 && words.length < 3000) {
      maxWords = words.length-400;
    }else if (words.length >= 3000 && words.length < 3500) {
      maxWords = words.length-450;
    }
     else if (words.length >= 3500) {
      maxWords = 3500;
    } else {
      return text;
    }
  
    const truncatedWords = words.slice(0, maxWords);
    return truncatedWords.join(" ");
  }
   const getText=async()=>{
    if(url===''){
      toast("No youtube url has selected")
    } else{
      setLoding(true)
      let bodyText;
     await axios.get(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        $('style, header, nav, a, script, form, table, img, iframe, noscript').remove();
        bodyText = $('body').not("style, header, nav, a, script, form,table,video,img,iframe,noscript").text()
        truncatedText = TruncateText(bodyText);
        console.log(truncatedText)
        dispatch(
          setFileData({
            fileData:truncatedText
          })
        )
  
      })
      .catch((error:any) => {
        console.log(error);
      });
    }
   
   }
  return (
    <div className="flex flex-col">
      <div className='relative flex items-center justify-center mt-3 h-20 bg-white w-full rounded-lg mr-8 shadow-4 border-[whitesmoke] '>
      <input onChange={WebUrl} type={'text'}  className="h-16 w-full outline-none rounded-lg   pl-4 placeholder: font-serif font-medium   " autoFocus placeholder='Add Your Website  URL...'/>
    </div>
    <div>
      {
        loading?
        <div className=' p-1  bg-black flex items-center justify-center h-14 w-24 mt-3 rounded-md text-white' >
        <ScaleLoader color="white"/>
        </div>:
    <button onClick={getText} className=' p-1  bg-black h-14 w-24 mt-3 rounded-md text-white' >generate</button>

      }
    </div>
    </div>
  )
}

export default WebtoText