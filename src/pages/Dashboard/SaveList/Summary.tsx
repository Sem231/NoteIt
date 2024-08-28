// @ts-nocheck
import { GoCopy } from "react-icons/go"
import RichEditor from "../RichEditor"
import {convertFromRaw,EditorState} from "draft-js"
import {convertToRaw } from 'draft-js'

const Summary = ({data,index}:any) => {
  return (
    <div className="relative">
      {
        data.map((item:any,i:any)=>(
          (item._id===index)&&(
            
            <div key={i} className=" m-5 px-5 py-6 bg-white shadow-1 rounded-md">
              {
                (item?.SummaryText===undefined)?<div>
                  <p>No Summary has found</p>
                </div>:
                <RichEditor
                text={item?.SummaryText?.substring(0, 1)=='{'?EditorState.createWithContent(convertFromRaw(JSON.parse(item?.SummaryText))):EditorState.createWithContent(convertFromRaw({ blocks: [{ text:item?.SummaryText }], entityMap: {} }))} type={"transcription"}/>
              }

            </div>
          )
        ))
      }
       <div className="ml-5">
      <button className=' cursor-pointer  bg-gray-100 font-bold rounded-md py-2 px-6 text-white bg-[black] '>Save your changes</button>
      </div>
    </div>
  )
}

export default Summary