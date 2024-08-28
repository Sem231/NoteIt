import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPdfFileName,
  setFileName,
  setpdfFileChoice,
  setpdfFileLoading,
  setpdfFileName,
} from '../../../components/feature/AudioSlice';
// @ts-ignore
import { setDIndex } from '../../../components/feature/videoSlice.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChoicePdf = () => {
  const [file, setFile] = useState<any>(null);
  const dispatch = useDispatch();
  const fileName = useSelector(selectPdfFileName);
  const handleUploadClick = async () => {
    if (file === null) {
      toast('No pdf file has selected');
    } else {
      dispatch(
        setpdfFileChoice({
          pdfFileChoice: true,
        })
      );
      dispatch(
        setpdfFileLoading({
          pdfFileLoading: true,
        })
      );
      const formData = new FormData();
      formData.append('file', file);
      formData.append('dire', fileName);
      await axios
        .post(`https://noteit-server-1.onrender.com/ingest/pdf`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res.data);
          dispatch(
            setDIndex({
              DIndex: 8,
            })
          );
          dispatch(
            setpdfFileLoading({
              pdfFileLoading: false,
            })
          ),
            dispatch(
              setpdfFileChoice({
                pdfFileChoice: false,
              })
            );
        })
        .catch((err) => {
          console.log(err);
        });

      //  dispatch(
      //   setpdfFileLoading({
      //     pdfFileLoading:false
      //   })
      //  ),
      //  dispatch(
      //   setpdfFileChoice({
      //     pdfFileChoice:false
      //   })
      //  )
    }
  };
  return (
    <div>
      <input
        type="file"
        id="actual-btn"
        hidden
        name="file"
        onChange={(e: any) => {
          setFile(e.target.files[0]);
          dispatch(
            setpdfFileName({
              pdfFileName: e.target.files[0].name,
            })
          );
        }}
      />
      <div className=" -mt-7 items-center ">
        <label
          htmlFor="actual-btn"
          className=" bg-gray-100 mr-24 w-9 cursor-pointer rounded-md  p-2"
        >
          Choose File
        </label>
        <span className="absolute  right-1 text-sm italic  ">
          {file ? <p>File Selected</p> : <p>No File Selected</p>}
        </span>
        <button
          className="bg-gray-100 absolute bottom-1  right-1 rounded-md bg-[black] py-2 px-6 text-white "
          onClick={handleUploadClick}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ChoicePdf;
