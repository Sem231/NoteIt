// @ts-nocheck
import { useSelector } from "react-redux"
import { Modal } from "@mui/material"
import { selectFileData } from "../../components/feature/AudioSlice"
import { useCallback, useState } from "react"
import { AiOutlineBuild } from "react-icons/ai"
import OpenQuestion from "./Question/OpenQuestion"
import TrueFalseQuestion from "./Question/TrueFalseQuestion"
const HeaderItem=[
  {
    id:1,
    name:"Open Question",
    icon:AiOutlineBuild

  },
  {
    id:2,
    name:"Multiple Question",
    icon:AiOutlineBuild

  },
  {
    id:3,
    name:"True/False Question",
    icon:AiOutlineBuild

  }
]
const QuestionGenerator = () => {
  const TextFromAudio=useSelector(selectFileData)
  const [acttiveIndex,setACtiveIndex]=useState(0)

  const ItemSelect=useCallback((index:number)=>{
    setACtiveIndex(index)

  },[acttiveIndex])
  const HeaderIdentification=()=>{
    if(acttiveIndex===0){
      return(
        <div>
          <OpenQuestion text={TextFromAudio?.Text} />
        </div>
       )
       
    
  }
  else if(acttiveIndex===1){
    return(
      <div>

      </div>
    )
  }
  else{
    return(
      <div>
        <TrueFalseQuestion text={TextFromAudio?.Text}/>
      </div>
    )
  }
  return null
}

  return (
    <div>
      {/* <p className="absolute top-2 left-4 font-satoshi text-2xl text-black font-medium">Generate question from your Notes </p> */}
      {
        TextFromAudio?.Text===null?
        <div className="text-black flex items-center justify-center">
        <p className="font-satoshi text-lg font-medium">No Content for generating question.</p>
        </div>:
        <div>
 <div 
    className={`flex items-center`}
    >
   <div className='relative flex  h-[55px] items-center border border-[whitesmoke] rounded-lg py-6 px-10 shadow-[rgba(0,_0,_0,_0.1)_2px_2px_2px]  bg-white  w-full'>
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
      }
    </div>
  )
}

export default QuestionGenerator