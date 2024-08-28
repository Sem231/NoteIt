import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectVideoItem,
  selectVideoLoading,
  setFileData,
  setFileName,
  setVideoChoice,
  setVideoData,
  setVideoLoading,
  setWarningIndicator,
} from '../../../components/feature/AudioSlice';
import LanguageList from '../AudioToText/LanguageList';
import SelectItem3 from '../AudioToText/SelectItem3';
import TextDocument3 from '../AudioToText/TextDocument3';
import WarningVideo from '../AudioToText/WarningVideo';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ScaleLoader } from 'react-spinners';

const VideoToAudio = () => {
  const [url, setUrl] = useState<string>('');
  const VideoT = useSelector(selectVideoItem);
  const VideoL = useSelector(selectVideoLoading);

  const dispatch = useDispatch();
  const params = new URLSearchParams();
  const data = new FormData();
  data.append('url', url);
  params.append('value', VideoT);
  const handleUploadClick = async () => {
    if (url === '') {
      toast('No youtube url has selected');
    } else {
      const sid = localStorage.getItem('sid');
      dispatch(
        setVideoChoice({
          VideoChoice: true,
        })
      ),
        dispatch(
          setVideoLoading({
            VideoLoading: true,
          })
        );
      const formData = new FormData();
      // formData.append("file",url)
      formData.append('type', 'youtube');
      formData.append('yurl', url);
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
          dispatch(
            setFileData({
              Text: res.data?.Text,
            })
          ),
            dispatch(
              setFileName({
                fileName: res.data?.fileName,
              })
            );
          dispatch(
            setVideoLoading({
              VideoLoading: false,
            })
          ),
            dispatch(
              setVideoChoice({
                VideoChoice: false,
              })
            );
        })
        .catch((err) => console.error(err));
    }
  };
  // const provideVideo=useCallback(()=>{
  //   if(url===""){
  //     return null
  //   }
  // dispatch(
  //   setVideoChoice({
  //     VideoChoice:true
  //   })
  // ),
  // dispatch(
  //   setVideoLoading({
  //     VideoLoading:true
  //   })
  // ),
  // dispatch(
  //   setWarningIndicator({
  //     WarningIndicator:true
  //   })
  // )

  //   fetch(`http://127.0.0.1:5000/Video?${params}`, {
  //   method: 'POST',
  //   body:data
  // })
  //   .then((res) => res.json())
  //   .then((data) =>{
  //    dispatch(
  //     setVideoData({
  //       Text:data.Text,
  //       language:data.language
  //     })
  //     )
  //   dispatch(
  //     setVideoLoading({
  //       VideoLoading:false
  //     })
  //   ),
  //   dispatch(
  //     setVideoChoice({
  //       VideoChoice:false
  //     })
  //   ),
  //   dispatch(
  //     setWarningIndicator({
  //       WarningIndicator:false
  //     })
  //   )

  // })
  //   .catch((err) => console.error(err));
  // },[VideoT,url])
  const YoutubeUrl = (e: any) => {
    setUrl(e.target.value);
  };
  return (
    <div>
      <div className="relative flex flex-col   justify-between">
        <div className="relative mt-3 mr-8 flex h-20 w-full items-center justify-center rounded-lg border-[whitesmoke] bg-white shadow-4 ">
          <input
            type={'text'}
            onChange={YoutubeUrl}
            className="placeholder: font-serif h-16 w-full   rounded-lg pl-4 font-medium outline-none   "
            autoFocus
            placeholder="Add Your Youtube Video  URL..."
          />
        </div>
        <button
          className="absolute left-2 top-26 mt-1 h-14 w-24 rounded-md bg-black p-1 text-white"
          onClick={handleUploadClick}
        >
          generate
        </button>
        {VideoL === true && (
          <div className="relative mt-22 mr-8 flex  h-20 w-full items-center justify-center rounded-lg bg-white p-10 shadow-4  ">
            {
              <div className="absolute left-2 flex flex-row items-center">
                <ScaleLoader color="#000" />
                <p className="ml-3 text-lg font-medium text-black">
                  Processing
                </p>
              </div>
            }

            <div>
              <p className="flex-1 text-lg font-medium ">
                Your Note is creating.
              </p>
            </div>
          </div>
        )}

        {/* <LanguageList/> */}
      </div>
    </div>
  );
};

export default VideoToAudio;
