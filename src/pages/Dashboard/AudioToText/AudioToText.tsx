import { useSelector } from 'react-redux'
import { selectFileChoile, selectFileLoading, selectFileName } from '../../../components/feature/AudioSlice'
import ChoiceFile from './ChoiceFile'

import { ScaleLoader } from 'react-spinners';

const AudioToText = () => {
  const file=useSelector(selectFileName)
  const loading=useSelector(selectFileLoading)

  return (
    <div className='flex flex-col justify-between relative'>
       <div className='relative flex items-center justify-center mt-3 p-10 h-24 bg-white w-full rounded-lg mr-8 shadow-4 border border-[whitesmoke] '>
      <p className='flex-1 text-lg font-medium '>Choice Your Audio File  </p>
      <ChoiceFile/>
      
    </div>
    <div className='absolute left-1 top-28 flex'>
        {/* <TextDocument/> */}

        {/* <SelectItem/> */}
    </div>
    {
      file&&(
    <div className='relative flex items-center justify-center  p-10 h-20 mt-6 bg-white w-full rounded-lg mr-8 shadow-4  '>
      {
        loading===true&&(
          <div className='flex flex-row absolute left-2 items-center'>
          <ScaleLoader   color="#000" />
           <p className='font-medium text-black text-lg ml-3'>Processing</p>
          </div>
        )
      }
    
      <div>
      <p className='flex-1 text-lg font-medium '> {file} </p>      

      </div>
    </div>
      )
    }
    
      {/* <LanguageList/> */}
    </div>
  )
}

export default AudioToText