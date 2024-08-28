// @ts-nocheck
import {PiNoteLight} from "react-icons/pi"
import {IoIosShareAlt} from "react-icons/io"
import {MdOutlineDataSaverOn} from "react-icons/md"
import {BiLogoYelp} from "react-icons/bi"
import {BiBadge} from "react-icons/bi"
import {AiOutlineUngroup} from "react-icons/ai"
import 'react-toastify/dist/ReactToastify.css';
import {BsChatText} from "react-icons/bs"
import {CiShoppingTag} from "react-icons/ci"
import {GrConfigure} from "react-icons/gr"
import {BiLogoSquarespace} from "react-icons/bi"
const editor=[
  {
    id:1,
    name:"Summary",
    icon:PiNoteLight
  },
  {
    id:2,
    name:"Notes",
    icon:CiShoppingTag
  },{
    id:3,
    name:"Keyword",
    icon:AiOutlineUngroup
  },{
    id:4,
    name:"Transcript",
    icon:BiLogoYelp
  },{
    id:5,
    name:"Question",
    icon:BiBadge
  },
  {
    id:6,
    name:"Share",
    icon:IoIosShareAlt
  },
  {
    id:7,
    name:"Resummarize",
    icon:BiLogoSquarespace
  },
  {
    id:8,
    name:"Save",
    icon:MdOutlineDataSaverOn
  },
  {
    id:9,
    name:"Chat",
    icon:BsChatText
  },
  {
    id:9,
    name:"Configuration",
    icon:GrConfigure
  },
]
import {BsInfoCircle} from "react-icons/bs"
import { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {setDIndex,selectsetDIndex} from "../../components/feature/videoSlice.js"
import { ToastContainer, toast } from "react-toastify"
import { selectFileData } from "../../components/feature/AudioSlice.js"
const RightSidear = () => {
  const dispatch=useDispatch()
  const TextFromAudio=useSelector(selectFileData)
  const indexActive=useSelector(selectsetDIndex)
   const ItemSelect=useCallback((index:any)=>{
    // if((TextFromAudio.Text===null&&index===1)||TextFromAudio.Text===null&&index===2){
    //   toast.warn("Please create your notes first")
    // }
    dispatch(
      setDIndex({
        DIndex:index
      })
    )
    
  },[dispatch])
  return (
    <div className="h-[700px] bg-white border border-[whitesmoke]  w-[300px]">
      <div className=" px-3 py-2 flex items-center flex-row flex-wrap justify-start">
      {
        editor.map((item,index)=>{
          return(
            <div onClick={()=>ItemSelect(index)} key={index} className={`w-[125px] ${indexActive===index?" bg-[lightgray] ":"hover:bg-[whitesmoke]"} justify-center items-center  flex flex-col relative h-[120px] m-1 rounded-lg shadow-2 cursor-pointer`}>
              <BsInfoCircle className="absolute right-2 top-2"/>
              <item.icon size={27}  className="text-black"/>
              <p className="font-satoshi font-medium text-lg text-black" >{item.name}</p>
            </div>
          )
        })
      }
      <ToastContainer position="bottom-right"
autoClose={5000}/>

      </div>
    </div>
  )
}

export default RightSidear