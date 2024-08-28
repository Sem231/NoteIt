// @ts-nocheck
import { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import RecordRTC from 'recordrtc';
import WaveForm from './WaveForm';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  setFileData,
  setFileLoading,
  setFileName,
} from '../../../components/feature/AudioSlice';
import { ScaleLoader } from 'react-spinners';
const RecordAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoding] = useState(false);
  const dispatch = useDispatch();

  const recordRTCRef = useRef(null);
  function blobToFile(theBlob: any, fileName: any) {
    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    });
  }
  const startRecording = async () => {
    setIsPlaying(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/webm',
        recorderType: RecordRTC.StereoAudioRecorder,
      });
      recordRTCRef.current = recorder;
      recorder.startRecording();
    } catch (error) {
      console.error('Error starting audio recording:', error);
    }
  };
  function generateRandomAudioFileName() {
    const randomNumber = Math.floor(Math.random() * 1000); // Adjust the range as needed
    return `audio${randomNumber}.wav`;
  }

  const stopRecording = () => {
    setIsPlaying(false);
    if (recordRTCRef.current) {
      recordRTCRef.current.stopRecording(() => {
        const blob = recordRTCRef.current.getBlob();
        const dynamicFileName = generateRandomAudioFileName();
        const audioUrl = blobToFile(blob, dynamicFileName);
        setAudioFile(audioUrl);
        // setAudioSrc(blob)
        recordRTCRef.current.reset();
      });
    }
  };
  const saveDemoItem = async () => {
    if (audioFile === null) {
      toast('No recording has found');
    } else {
      const sid = localStorage.getItem('sid');
      dispatch(
        setFileName({
          fileName: audioFile?.name,
        })
      );
      setLoding(true);
      const formData = new FormData();
      formData.append('file', audioFile);
      await axios
        .post(
          `https://noteit-server-1.onrender.com/AuduiConverter/file`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then(async (res) => {
          console.log('click');
          await axios
            .post(`https://noteit-server-1.onrender.com/CreateStudio/${sid}`, {
              StudioText: res.data?.Text,
              studioName: audioFile?.name,
            })
            .then((res) => {
              console.log(res.data);
              localStorage.setItem('studioI', res.data.studioId);
            })
            .catch((err) => {
              console.log(err);
            });

          dispatch(
            setFileData({
              Text: res.data.Text,
              // language:data.language
            })
          );
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <div>
      <div className="overflow-y-auto overflow-x-hidden rounded-md bg-white px-10 py-3 ">
        <div>
          {isPlaying ? (
            <div>
              <svg
                style={{ width: '50px', height: '50px' }}
                id="wave"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 38.05"
              >
                <path
                  id="Line_2"
                  data-name="Line 2"
                  d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"
                />
                <path
                  id="Line_3"
                  data-name="Line 3"
                  d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"
                />
                <path
                  id="Line_4"
                  data-name="Line 4"
                  d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"
                />
                <path
                  id="Line_5"
                  data-name="Line 5"
                  d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"
                />
                <path
                  id="Line_6"
                  data-name="Line 6"
                  d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z"
                />
                <path
                  id="Line_7"
                  data-name="Line 7"
                  d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"
                />
                <path
                  id="Line_8"
                  data-name="Line 8"
                  d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z"
                />
              </svg>

              <button
                onClick={stopRecording}
                className="mt-3 w-[100%]  cursor-pointer rounded-lg border bg-[#25224A]  px-3 py-2 font-bold text-white transition "
              >
                Stop Recording
              </button>
            </div>
          ) : (
            <button
              onClick={startRecording}
              className="mt-3  w-[100%] cursor-pointer rounded-lg border  bg-[#25224A] px-3 py-2 text-white transition "
            >
              Start Recording
            </button>
          )}
          {audioFile && isPlaying === false ? (
            <div className="mt-5 h-40 w-full justify-center rounded-md bg-white  ">
              <WaveForm audio={URL?.createObjectURL(audioFile)} />
            </div>
          ) : null}
        </div>
        <div className="mt-3  flex w-full flex-col">
          <div className="flex flex-col ">
            {loading ? (
              <div className="mb-5 mt-3 flex w-[100%] cursor-pointer items-center justify-center rounded-lg border bg-[#25224A] px-3  py-2 text-lg font-medium text-white transition ">
                <ScaleLoader color="white" />
              </div>
            ) : (
              <button
                onClick={saveDemoItem}
                className="mb-5 mt-3 flex w-[100%] cursor-pointer items-center justify-center rounded-lg border bg-[#25224A] px-3  py-2 text-lg font-medium text-white transition "
              >
                Generate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordAudio;
