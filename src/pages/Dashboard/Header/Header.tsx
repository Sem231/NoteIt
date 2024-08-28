import React,{useState,useCallback} from 'react'
import {BsSun} from "react-icons/bs"
import {HiOutlineMoon} from "react-icons/hi"
import Record from '../Record/Record'
import VideoToAudio from '../VideoToText/VideoToText'
import AudioToText from '../AudioToText/AudioToText'
import WarningVideo from '../AudioToText/WarningVideo'
import { useSelector } from 'react-redux'
import { selectVideoChoile, selectVideoLoading, selectWarningIndicator } from '../../../components/feature/AudioSlice'
import { AiOutlineBuild } from 'react-icons/ai'
import PdftoText from '../PdftoText/PdftoText'
import WebtoText from '../WebtoText/WebtoText'
import RecordAudio from '../Record/RecordAudio'

const HeaderItem=[
  {
    id:1,
    name:"Record Audio",
    icon:AiOutlineBuild

  },
  {
    id:2,
    name:"Audio To Text",
    icon:AiOutlineBuild

  },
  {
    id:3,
    name:"Video To Text",
    icon:AiOutlineBuild

  },
  {
    id:3,
    name:"Pdf To Text",
    icon:AiOutlineBuild

  },
  {
    id:3,
    name:"Website To Text",
    icon:AiOutlineBuild

  }
]

const Header = () => {
  const [acttiveIndex,setACtiveIndex]=useState(0)
  const videoLoading=useSelector(selectWarningIndicator)
  const ItemSelect=useCallback((index:number)=>{
    setACtiveIndex(index)

  },[acttiveIndex])
  const HeaderIdentification=()=>{
    if(acttiveIndex===0){
      return(
        <div>
        <RecordAudio/>
        </div>
       )
       
    
  }
  else if(acttiveIndex===1){
    return(
      <div>
        <AudioToText/>
      </div>
    )
  }
  else if(acttiveIndex===2){
    return(
      <div>
        <VideoToAudio/>
      </div>
    )
  }
  else if(acttiveIndex===3){
    return(
      <div>
        <PdftoText/>
      </div>
    )
  }
  else{
    return(
      <div>
        <WebtoText/>
      </div>
    )
  }
  return null
}

  return (
    <div className=''>
      {
     videoLoading?
     <div className='mt-3'>
     <WarningVideo/>
   </div>:
   null
      }
    <div 
    className={`flex items-center`}
    >
   <div className='relative flex  h-[80px] items-center border border-[whitesmoke] rounded-lg py-6 px-10 shadow-[rgba(0,_0,_0,_0.1)_2px_2px_2px]  bg-white  w-full'>
        {
          HeaderItem.map((item,index)=>{
            return(
             <div key={index} onClick={()=>ItemSelect(index)} className={`flex ${index===acttiveIndex?"border-b-[5px]   border-b-[black]":""}  hover:bg-[whitesmoke] hover:rounded-md p-2 cursor-pointer items-center mr-5`}>
              <item.icon className="text-black" size={30} />
              <p className='text-black px-2 ' >{item.name}</p>
             </div>
            )
          })
          
        }
        
      </div>
    </div>
    <div>
      <HeaderIdentification/>
      </div>
    </div>
  )
}

export default Header