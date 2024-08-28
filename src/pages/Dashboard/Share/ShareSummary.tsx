// @ts-ignore
import { Editor, EditorState, convertFromRaw,createWithContent } from 'draft-js'
const ShareSummary = ({item}:any) => {
  
  return (
    <div >{
      item===undefined?
  <div className="flex items-center justify-center h-[500px]">
    <p className='font-satoshi font-medium text-[black] text-lg'>No summary Found</p>
  </div>:
  <div className='px-8 py-5'>
              <Editor editorState={
               item?.substring(0, 1)=='{'?EditorState.createWithContent(convertFromRaw(JSON.parse(item))):EditorState.createWithContent(convertFromRaw({ blocks: [{ text:item }], entityMap: {} }))
                // EditorState.createWithContent(convertFromRaw(JSON.parse(item)))
                } readOnly={true}/>

              </div>
      }

    </div>
  )
}

export default ShareSummary