// @ts-nocheck
import { ChangeEvent, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFile,
  selectFileChoile,
  selectFileData,
  selectItem,
  setFile,
  setFileChoice,
  setFileData,
  setFileLoading,
  setFileName,
} from '../../../components/feature/AudioSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

function ChoiceFile() {
  // const [file, setFile] = useState();
  const dispatch = useDispatch();
  const selectedItem = useSelector(selectItem);
  const filelist = useSelector(selectFile);
  const sid = localStorage.getItem('sid');
  const handleFileChange = useCallback((e) => {
    console.log('File selected:', e.target.files[0]);
    dispatch(
      setFile({
        file: e.target.files[0],
      })
    );
    dispatch(
      setFileName({
        fileName: e.target.files[0].name,
      })
    );
    // ...
  }, []);
  // const handleFileChange =(e) => {
  //   if (e.target.files) {
  //     setFile(e.target.files[0]);
  //   }

  // }

  const handleUploadClick = async () => {
    console.log(filelist);
    if (!filelist) {
      toast('No audio file has selected');
    } else {
      dispatch(
        setFileChoice({
          fileChoice: true,
        })
      );
      dispatch(
        setFileLoading({
          fileLoading: true,
        })
      );
      const formData = new FormData();
      formData.append('file', filelist);
      formData.append('studioName', filelist?.name);
      formData.append('type', 'file');
      await axios
        .post(
          `https://noteit-server-1.onrender.com/AuduiConverter/${sid}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          localStorage.setItem('studioI', res.data.studioId);
          console.log('click');
          // await axios.post(`http://localhost:8081/CreateStudio/${sid}`,{
          //   StudioText:data?.Text,
          //   studioName:filelist?.name
          // }).then((res)=>{
          //   localStorage.setItem("studioI",res.data.studioId)
          // }
          // ).catch(err=>{
          //   console.log(err)
          // })

          dispatch(
            setFileData({
              Text: res.data?.Text,
            })
          );
          dispatch(
            setFileLoading({
              fileLoading: false,
            })
          ),
            dispatch(
              setFileChoice({
                fileChoice: false,
              })
            );
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <div className="grid h-full place-items-center">
        {/* <input type="file" id="actual-btn" hidden name="file" onChange={handleFileChange}  />
         <label htmlFor="actual-btn" className=' bg-[#25224A] w-[50%] cursor-pointer  text-white font-bold py-4 px-4 rounded-[10px] rounded-bl-[19px] focus:outline-none focus:shadow-outline'>Upload an video instruction</label> */}
      </div>
      <input
        type="file"
        id="actual-btn"
        hidden
        name="file"
        onChange={handleFileChange}
      />
      <div className=" -mt-7 items-center ">
        <label
          htmlFor="actual-btn"
          name="file"
          className=" bg-gray-100 mr-24 w-9 cursor-pointer rounded-md  p-2"
        >
          Choose File
        </label>
        <span className="absolute  right-1 text-sm italic  ">
          {filelist ? <p>File Selected</p> : <p>No File Selected</p>}
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
}

export default ChoiceFile;
