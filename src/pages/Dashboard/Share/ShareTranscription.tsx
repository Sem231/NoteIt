// @ts-nocheck
import { Editor, EditorState, convertFromRaw,createWithContent } from 'draft-js'
const ShareTranscription = ({item}:any) => {
  
  return (
    <div>
      <div className='px-8 py-5'>
              <Editor editorState={
               item?.substring(0, 1)=='{'?EditorState.createWithContent(convertFromRaw(JSON.parse(item))):EditorState.createWithContent(convertFromRaw({ blocks: [{ text:item }], entityMap: {} }))
                // EditorState.createWithContent(convertFromRaw(JSON.parse(item)))
                } readOnly={true}/>

              </div>
    </div>
  )
}

export default ShareTranscription