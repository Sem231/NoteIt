// @ts-nocheck
import { useRef, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import RightSidear from './RightSidear';
import { FiEdit } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { IoCopyOutline } from 'react-icons/io5';
import { MdOutlineDataSaverOn } from 'react-icons/md';
import { PiShareFat } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDIndex,
  selectsetDIndex,
  selectExtractText,
  setSummary,
  setNotes,
  setKeyword,
} from '../../components/feature/videoSlice.js';
import QuestionGenerator from './QuestionGenerator.js';
import { Modal } from '@mui/material';
import ShareScript from './ShareScript.js';
import AudioPreProcessing from './AudioPreProcessing.js';
import {
  selectFileData,
  selectFileName,
  setFileData,
  setFileName,
} from '../../components/feature/AudioSlice.js';
import GenerateSummary from './GenerateSummary.js';
import ChatWithYourNote from './ChatWithYourNote.js';
import GenerateNotes from './GenerateNotes.js';
import GenerateKeyword from './GenerateKeyword.js';
import GenerateMindMap from './GenerateMindMap.js';
import SaveList from './SaveList.js';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import AdvancedC from './Configuration.js';
import Transcript from './Transcript/Transcript.js';

const EditItemList = [
  {
    id: 1,
    icon: RxCross2,
  },
  {
    id: 2,
    icon: IoCopyOutline,
  },
  {
    id: 3,
    icon: MdOutlineDataSaverOn,
  },
  {
    id: 4,
    icon: PiShareFat,
  },
];
const Dashboard = () => {
  const indexActive = useSelector(selectsetDIndex);
  const TextFromAudio = useSelector(selectFileData);
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);
  const [openAudio, setOpenAudio] = useState(false);
  const fileName = useSelector(selectFileName);
  const hasEffectRun = useRef(false);
  const doOperation = (id: any) => {
    if (id === 0) {
      setOpenEdit(false);
    }
  };
  const removeModel = () => {
    dispatch(
      setDIndex({
        DIndex: 0,
      })
    );
  };

  const handleNewNotes = () => {
    dispatch(
      setFileData({
        Text: null,
      }),
      setFileName({
        fileName: null,
      }),
      setSummary({
        Summary: [],
      }),
      setNotes({
        Notes: [],
      }),
      setKeyword({
        Keyword: [],
      })
    );
  };
  const createChat = async () => {
    if (!hasEffectRun.current) {
      await axios
        .post('https://noteit-server-1.onrender.com/ingest', {
          text: TextFromAudio?.Text,
          dire: fileName,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      hasEffectRun.current = true;
    }
  };
  return (
    <DefaultLayout>
      <div className="relative flex  h-screen bg-[#F5F5F5]">
        {TextFromAudio?.Text ? (
          <div className="relative ml-[55px] mt-10 h-[600px] w-[800px]  overflow-y-auto overflow-x-hidden  rounded-lg bg-white px-6 py-10  [&::-webkit-scrollbar]:hidden">
            <div className="absolute top-1 left-4">
              {indexActive === 0 ? (
                <p className="font-satoshi text-lg font-medium text-black">
                  Summary
                </p>
              ) : indexActive === 1 ? (
                <p className="font-satoshi text-lg font-medium text-black">
                  Notes
                </p>
              ) : indexActive === 2 ? (
                <p className="font-satoshi text-lg font-medium text-black">
                  Keyword
                </p>
              ) : indexActive === 3 ? (
                <p className="font-satoshi text-lg font-medium text-black">
                  MindMap
                </p>
              ) : (
                indexActive === 6 && (
                  <p className="font-satoshi text-lg font-medium text-black">
                    Resummarize
                  </p>
                )
              )}
            </div>
            {openEdit && (
              <div className="bg-card absolute top-1 right-7 z-99999 flex h-[40px] w-[220px] flex-row items-center justify-evenly rounded-md shadow-4 ">
                {EditItemList.map((item, index) => {
                  return (
                    <div
                      onClick={() => doOperation(index)}
                      key={index}
                      className="z-999999 cursor-pointer rounded-md p-[6px] text-black hover:bg-[whitesmoke]"
                    >
                      <item.icon size={23} />
                    </div>
                  );
                })}
              </div>
            )}
            <FiEdit
              onClick={() => setOpenEdit(true)}
              size={24}
              className="absolute top-2 right-2 cursor-pointer text-black"
            />
            <div
              onClick={handleNewNotes}
              style={{ backgroundColor: openEdit ? 'transparent' : 'black' }}
              className=" absolute top-2 right-12 z-1 cursor-pointer rounded-md py-1 px-2 "
            >
              <p className="z-0 font-satoshi text-sm font-medium text-white">
                New Notes
              </p>
            </div>
            {indexActive === 0 ? (
              <GenerateSummary text={TextFromAudio?.Text} />
            ) : indexActive === 1 ? (
              <GenerateNotes text={TextFromAudio?.Text} />
            ) : indexActive === 2 ? (
              <GenerateKeyword text={TextFromAudio?.Text} />
            ) : (
              indexActive === 3 && <GenerateMindMap />
            )}
          </div>
        ) : (
          <div className="relative ml-[70px] mt-20 flex h-[500px] w-[750px] flex-col  items-center  justify-center rounded-lg bg-white px-6  py-10">
            <p className="text-2xl font-bold text-black">
              Create Your Notes from Video or Audio.
            </p>
            <p className="text-md w-[500px] text-center font-medium text-black">
              Upload audio/video file or record your audio for creating notes or
              summary.You can also create your notes from pdf and website, just
              provide the website url or pdf file.
            </p>

            <button
              onClick={() => setOpenAudio(true)}
              className="mt-5 h-[60px] w-[350px] rounded-lg bg-[black] text-lg font-medium text-white"
            >
              Create your Notes
            </button>
          </div>
        )}

        <div className="absolute right-0 top-0 bottom-0">
          <RightSidear />
        </div>
        {openAudio && TextFromAudio?.Text === null && (
          <div>
            <Modal
              keepMounted
              open={true}
              // onClose={}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <div
                style={{
                  position: 'absolute' as 'absolute',
                  top: '60%',
                  left: '59%',
                  transform: 'translate(-50%, -50%)',
                  width: '77%',
                  bgcolor: '#1C1B22',
                  boxShadow: 24,
                  p: 2,
                  outline: 0,
                  height: 800,
                  border: '2px',
                }}
                className=" h-full  rounded-md bg-white  py-3"
              >
                <RxCross2
                  onClick={() => setOpenAudio(false)}
                  size={25}
                  className=" absolute top-4 right-4 cursor-pointer"
                />
                <AudioPreProcessing />
              </div>
            </Modal>
          </div>
        )}
        {indexActive === 4 && (
          <div>
            <Modal
              keepMounted
              open={true}
              // onClose={false}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <div
                style={{
                  position: 'absolute' as 'absolute',
                  top: '62%',
                  left: '60%',
                  transform: 'translate(-50%, -50%)',
                  width: '72%',
                  bgcolor: '#1C1B22',
                  boxShadow: 24,
                  p: 2,
                  outline: 0,
                  height: 800,
                  border: '2px',
                }}
                className=" relative flex  h-full justify-center rounded-md bg-white  py-3"
              >
                <RxCross2
                  onClick={removeModel}
                  size={25}
                  className=" absolute top-4 right-4 cursor-pointer"
                />
                <QuestionGenerator />
              </div>
            </Modal>
          </div>
        )}
        {indexActive === 5 && (
          <div>
            <Modal
              keepMounted
              open={true}
              // onClose={false}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <div
                style={{
                  position: 'absolute' as 'absolute',
                  top: '62%',
                  left: '60%',
                  transform: 'translate(-50%, -50%)',
                  width: '60%',
                  bgcolor: '#1C1B22',
                  boxShadow: 24,
                  p: 2,
                  outline: 0,
                  height: 800,
                  border: '2px',
                }}
                className=" relative flex h-full items-center justify-center rounded-md bg-white  py-3"
              >
                <RxCross2
                  onClick={removeModel}
                  size={25}
                  className=" absolute top-4 right-4 cursor-pointer"
                />
                <ShareScript />
              </div>
            </Modal>
          </div>
        )}
        {indexActive === 8 && (
          <div>
            <Modal
              keepMounted
              open={true}
              // onClose={false}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <div
                style={{
                  position: 'absolute' as 'absolute',
                  top: '62%',
                  left: '59.4%',
                  transform: 'translate(-50%, -50%)',
                  width: '79%',
                  bgcolor: '#1C1B22',
                  boxShadow: 24,
                  p: 2,
                  outline: 0,
                  height: 800,
                  border: '2px',
                }}
                className=" relative flex h-screen items-center justify-center overflow-y-auto overflow-x-hidden  rounded-md bg-white py-3  [&::-webkit-scrollbar]:hidden"
              >
                <RxCross2
                  onClick={removeModel}
                  size={25}
                  className=" absolute top-4 right-4 cursor-pointer"
                />
                {
                  // !hasEffectRun.current?
                  // <div onClick={createChat}>
                  //   <p>
                  //   Create Your Chat
                  //   </p>
                  //   </div>:
                  <ChatWithYourNote />
                }
              </div>
            </Modal>
          </div>
        )}
        {indexActive === 7 && (
          <div>
            <Modal
              keepMounted
              open={true}
              // onClose={false}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <div
                style={{
                  position: 'absolute' as 'absolute',
                  top: '60%',
                  left: '59.4%',
                  transform: 'translate(-50%, -50%)',
                  width: '79%',
                  bgcolor: '#1C1B22',
                  boxShadow: 24,
                  p: 1,
                  outline: 0,
                  height: 800,
                  border: '2px',
                }}
                className=" relative flex h-screen items-center justify-center overflow-y-auto overflow-x-hidden  rounded-md bg-white py-2  [&::-webkit-scrollbar]:hidden"
              >
                <RxCross2
                  onClick={removeModel}
                  size={25}
                  className="absolute top-2 right-2 z-999999 cursor-pointer"
                />
                <SaveList />
              </div>
            </Modal>
          </div>
        )}
        {indexActive === 3 && (
          <div>
            <Modal
              keepMounted
              open={true}
              // onClose={false}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <div
                style={{
                  position: 'absolute' as 'absolute',
                  top: '60%',
                  left: '59.4%',
                  transform: 'translate(-50%, -50%)',
                  width: '79%',
                  bgcolor: '#1C1B22',
                  boxShadow: 24,
                  p: 1,
                  outline: 0,
                  height: 800,
                  border: '2px',
                }}
                className=" relative flex h-screen items-center   justify-center rounded-md bg-white  py-2"
              >
                <RxCross2
                  onClick={removeModel}
                  size={25}
                  className=" absolute top-2 right-2 z-999999 cursor-pointer"
                />
                <Transcript />
              </div>
            </Modal>
          </div>
        )}
        {indexActive === 9 && (
          <div>
            <Modal
              keepMounted
              open={true}
              // onClose={false}
              aria-labelledby="keep-mounted-modal-title"
              aria-describedby="keep-mounted-modal-description"
            >
              <div
                style={{
                  position: 'absolute' as 'absolute',
                  top: '60%',
                  left: '59.4%',
                  transform: 'translate(-50%, -50%)',
                  width: '43%',
                  bgcolor: '#1C1B22',
                  boxShadow: 24,
                  p: 1,
                  outline: 0,
                  height: 800,
                  border: '2px',
                }}
                className=" relative flex  h-screen justify-center overflow-y-auto overflow-x-hidden  rounded-md bg-white py-2  [&::-webkit-scrollbar]:hidden"
              >
                <RxCross2
                  onClick={removeModel}
                  size={25}
                  className=" absolute top-2 right-2 cursor-pointer"
                />
                <AdvancedC />
              </div>
            </Modal>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
