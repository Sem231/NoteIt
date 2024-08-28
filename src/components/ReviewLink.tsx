// @ts-nocheck
import { useRef } from 'react';
import useCopyToClipboard from './useCopyToClipboard';
import { ToastContainer, toast } from 'react-toastify';
import { BiCopy } from 'react-icons/bi';
import 'react-toastify/dist/ReactToastify.css';

const ReviewLink = () => {
  const spaceId = localStorage.getItem('sid');
  const inputRef = useRef(null);
  const [value, copy] = useCopyToClipboard();

  const copyToClipboard = () => {
    copy(inputRef.current.value);
    toast('Text copied successfuly');
  };
  return (
    <>
      <div className="mt-10 flex h-[100px] w-full items-center rounded-lg bg-black p-3">
        <input
          type="text"
          className="mr-4 w-[470px] rounded-md bg-white py-2 px-4 font-medium text-black"
          value={`note-it-virid.vercel.app
           /review/${spaceId}`}
          readOnly
          ref={inputRef}
        />
        <button
          // className="bg-white text-pink-600 py-2 px-4 rounded-md font-medium"
          onClick={copyToClipboard}
        >
          {<BiCopy color="#fff" size={30} />}
        </button>
      </div>
      <ToastContainer autoClose={5000} />
    </>
  );
};

export default ReviewLink;
