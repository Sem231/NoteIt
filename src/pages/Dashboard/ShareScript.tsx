import { useSelector } from 'react-redux';
import { selectFileData } from '../../components/feature/AudioSlice';
import useCopyToClipboard from './AudioToText/useCopyToClipboard';
import { useRef } from 'react';
import { BiCopy } from 'react-icons/bi';
import { toast } from 'react-toastify';

const ShareScript = () => {
  const TextFromAudio = useSelector(selectFileData);
  const inputRef = useRef(null);
  const [value, copy] = useCopyToClipboard();
  const copyToClipboard = () => {
    // @ts-ignore
    copy(inputRef.current.value);
    toast('Text copied successfuly');
  };
  const SpaceId = localStorage.getItem('sid');
  const studioId = localStorage.getItem('studioI');
  const url = `note-it-virid.vercel.app
  /ShareNotes/${SpaceId}/${studioId}`;
  return (
    <div>
      {TextFromAudio?.Text === null ? (
        <div className="flex items-center justify-center text-black">
          <p className="font-satoshi text-lg font-medium">
            No Content found for sharing.
          </p>
        </div>
      ) : (
        <div>
          <div className="relative -mt-20 grid h-[100px] w-[600px] place-items-center rounded-[10px]  bg-black pr-10">
            <input
              type="text"
              className=" text-wrap ml-2 mr-2 mt-2 w-full rounded-md border-none  bg-[rgba(191,86,86,0.1)] py-2 px-4 font-medium text-white outline-none"
              value={`${url}`}
              readOnly
              ref={inputRef}
            />
            {
              <BiCopy
                onClick={copyToClipboard}
                className="absolute top-9 right-2 cursor-pointer"
                color="#fff"
                size={30}
              />
            }
          </div>
          <div className="mt-5 flex items-center justify-center">
            {/* <SupportedPlatfoem/> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareScript;
