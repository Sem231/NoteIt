// @ts-nocheck
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineBuild } from 'react-icons/ai';
import { DiVisualstudio } from 'react-icons/di';
import { MdEditNote } from 'react-icons/md';
import { ScaleLoader } from 'react-spinners';
import Transcription from './SaveList/Transcription';
import Summary from './SaveList/Summary';
import Notes from './SaveList/Notes';
import { GoShareAndroid } from 'react-icons/go';
import { BiBlanket, BiCopy } from 'react-icons/bi';
import { TbNotes } from 'react-icons/tb';
import { Modal } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import useCopyToClipboard from './AudioToText/useCopyToClipboard';
import { toast } from 'react-toastify';
const HeaderItem = [
  {
    id: 1,
    name: 'Transcription',
    icon: AiOutlineBuild,
  },
  {
    id: 2,
    name: 'Summary',
    icon: BiBlanket,
  },
  {
    id: 3,
    name: 'Notes',
    icon: TbNotes,
  },
];
const SaveList = () => {
  const inputRef = useRef(null);
  const [value, copy] = useCopyToClipboard();
  const copyToClipboard = () => {
    // @ts-ignore
    copy(inputRef.current.value);
    toast('Text copied successfuly');
  };
  const [itemActiveIndex, setItemActiveIndex] = useState<any>(null);
  const setIndex = (i: any) => {
    setItemActiveIndex(i);
  };
  const SpaceId = localStorage.getItem('sid');
  const url = `note-it-virid.vercel.app
  /ShareNotes/${SpaceId}/${itemActiveIndex}`;
  const [acttiveIndex, setACtiveIndex] = useState(0);
  const [saveItem, setSaveItem] = useState([]);
  const [open, setOpen] = useState(false);
  const ItemSelect = useCallback(
    (index: number) => {
      setACtiveIndex(index);
    },
    [acttiveIndex]
  );
  const handleOpen = () => {
    setOpen(true);
  };
  const HeaderIdentification = () => {
    if (acttiveIndex === 0) {
      return (
        <div className="w-full">
          <Transcription data={saveItem} index={itemActiveIndex} />
        </div>
      );
    } else if (acttiveIndex === 1) {
      return (
        <div>
          <Summary data={saveItem} index={itemActiveIndex} />
        </div>
      );
    } else {
      return (
        <div>
          <Notes data={saveItem} index={itemActiveIndex} />
        </div>
      );
    }
    return null;
  };

  const getSaveList = async () => {
    const sid = localStorage.getItem('sid');
    await axios
      .get(`https://noteit-server-1.onrender.com/getStudio/${sid}`)
      .then((res) => {
        setSaveItem(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSaveList();
  }, []);
  // @ts-ignore

  return (
    <div className=" w-full">
      {saveItem.length > 0 ? (
        <div className="-mt-28 flex w-full flex-1  flex-row items-center">
          <div className="flex h-screen w-[20%] flex-col border-r border-r-[lightgray]">
            <div className=" top-2 flex w-full flex-row  items-center justify-center border-b border-b-[lightgray] p-3  ">
              <p className="mr-2 text-xl  font-medium text-black">Note List</p>
              <MdEditNote size={32} />
            </div>

            <div className=" mb-5 h-screen overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden ">
              {saveItem.map((item: any, index) => {
                return (
                  <div
                    onClick={() => setIndex(item._id)}
                    key={index}
                    className={`cursor-pointer p-5 ${
                      itemActiveIndex === item._id ? 'bg-[whitesmoke]' : ''
                    } mt-2 flex h-[30px] w-full flex-row items-center hover:bg-[whitesmoke]`}
                  >
                    <DiVisualstudio size={28} />
                    <p className="ml-2 w-40 truncate overflow-ellipsis text-lg font-medium text-black">
                      {item?.studioName}
                    </p>
                    {/* <GoShareAndroid size={24}/> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative flex h-screen w-[80%]">
            <GoShareAndroid
              onClick={handleOpen}
              className="absolute top-5 left-6 cursor-pointer rounded-[50%] p-1 hover:bg-[whitesmoke]"
              size={30}
            />

            <div>
              <div className={'ml-[150px] mt-1'}>
                <div className="relative flex  h-[55px] w-[520px]  items-center rounded-lg border border-[whitesmoke] bg-white py-6  px-10  shadow-[rgba(0,_0,_0,_0.1)_2px_2px_2px]">
                  {HeaderItem.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => ItemSelect(index)}
                        className={`flex ${
                          index === acttiveIndex
                            ? 'border-b-[5px]   border-b-[black]'
                            : ''
                        }  mr-5 cursor-pointer items-center p-2 hover:rounded-md hover:bg-[whitesmoke]`}
                      >
                        <item.icon className="text-black" size={30} />
                        <p className="px-2 text-black ">{item.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                {itemActiveIndex === null ? (
                  <div className="ml-40 flex h-[500px]  items-center justify-center">
                    <div className="flex h-[60px] w-[450px] items-center justify-center rounded-md bg-white shadow-4">
                      <p className="font-satoshi text-lg font-medium text-black">
                        No Studio Has Selected
                      </p>
                    </div>
                  </div>
                ) : (
                  <HeaderIdentification />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <ScaleLoader color="black" />
        </div>
      )}
      {
        <div>
          <Modal
            keepMounted
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <div
              style={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '59.4%',
                transform: 'translate(-50%, -50%)',
                width: '45%',
                bgcolor: '#1C1B22',
                boxShadow: 24,
                p: 1,
                outline: 0,
                height: 500,
                border: '2px',
              }}
              className=" relative flex h-screen items-center   justify-center rounded-md bg-white  py-2"
            >
              <div>
                {itemActiveIndex ? (
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
                ) : (
                  <div className="flex items-center justify-center text-black">
                    <p className="font-satoshi text-lg font-medium">
                      No Content found for sharing.
                    </p>
                  </div>
                )}

                <div className="mt-5 flex items-center justify-center">
                  {/* <SupportedPlatfoem/> */}
                </div>
              </div>
            </div>
          </Modal>
        </div>
      }
    </div>
  );
};

export default SaveList;
