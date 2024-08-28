// @ts-nocheck
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineBuild } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';
import { DiVisualstudio } from 'react-icons/di';
import { MdEditNote } from 'react-icons/md';
import { ScaleLoader } from 'react-spinners';
import WaveForm from '../Record/WaveForm';
import { CiShoppingTag } from 'react-icons/ci';
import { IoCopyOutline } from 'react-icons/io5';
import PinList from './PinList';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';
import useCopyToClipboard from '../AudioToText/useCopyToClipboard';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectpinLoading,
  setPinLoading,
} from '../../../components/feature/AudioSlice';
const HeaderItem = [
  {
    id: 1,
    name: 'Transcription',
    icon: AiOutlineBuild,
  },
  {
    id: 2,
    name: 'Summary',
    icon: AiOutlineBuild,
  },
  {
    id: 3,
    name: 'Notes',
    icon: AiOutlineBuild,
  },
];
const Transcript = () => {
  const [acttiveIndex, setACtiveIndex] = useState(0);
  const [saveItem, setSaveItem] = useState([]);
  const [pinnedItems, setPinnedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const playerRef = useRef(null);
  const ItemSelect = useCallback(
    (index: number) => {
      setACtiveIndex(index);
    },
    [acttiveIndex]
  );

  const [itemActiveIndex, setItemActiveIndex] = useState<any>(null);
  const setIndex = (i: any) => {
    setItemActiveIndex(i);
  };
  const getSaveList = async () => {
    const sid = localStorage.getItem('sid');
    //  const studioId=localStorage.getItem("studioI")
    await axios
      .get(`https://noteit-server-1.onrender.com/getStudio/${sid}`)
      .then((res) => {
        setSaveItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(
        `https://noteit-server-1.onrender.com/specificPin/${itemActiveIndex}`
      )
      .then((res) => {
        setPinnedItems(res.data);

        if (res.data.length > 0) {
          localStorage.setItem('update', true);
        } else {
          localStorage.setItem('update', false);
        }
        // console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSaveList();
  }, [itemActiveIndex]);

  function formatSrtTimeToMinutesSeconds(srtTime) {
    // Split the time into hours, minutes, seconds, and milliseconds
    const [time, milliseconds] = srtTime.split(',');
    const [hours, minutes, seconds] = time.split(':');

    // Calculate the total time in seconds
    const totalSeconds =
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

    // Calculate minutes and seconds
    const formattedMinutes = Math.floor(totalSeconds / 60);
    const formattedSeconds = totalSeconds % 60;

    // Return the formatted time as a string
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  function extractAndFormatStartTime(srtTimeRange) {
    // Split the time range into start and end times
    const [startTime] = srtTimeRange?.split(' --> ');

    // Format the start time
    const formattedStartTime = formatSrtTimeToMinutesSeconds(startTime);

    return formattedStartTime;
  }
  const handlePin = (time, subs, type, url) => {
    const pinnedItem = {
      time,
      subtitles: subs,
      type: type,
      url: url,
    };

    const exists = pinnedItems.some(
      (item) =>
        item.time === pinnedItem.time && item.subtitles === pinnedItem.subtitles
    );

    // If it doesn't exist, update the state to include the new pinned item
    if (!exists) {
      setPinnedItems([...pinnedItems, pinnedItem]);
    } else {
      toast.warn('same pin items already exist');
    }
  };
  const [value, copy] = useCopyToClipboard();
  const handleCopy = (text) => {
    copy(text);
    toast.success('Text copied successfuly');
  };
  console.log(itemActiveIndex);
  const handleTranscriptionClick = (timestamp) => {
    console.log(timestamp);
    if (playerRef.current) {
      const startTime = timestamp.split(' --> ')[0];
      // Convert the startTime to total seconds (assuming time format HH:MM:SS,SSS)
      const [hours, minutes, seconds, milliseconds] = startTime
        .split(/[:,]/)
        .map(parseFloat);
      const totalSeconds =
        hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
      playerRef.current.seekTo(totalSeconds, 'seconds');
    }
  };
  const handleEditor = async (items: any) => {
    if (items.length === 0) {
      toast.warn('No pin items has selected');
    } else {
      if (localStorage.getItem('update') !== 'true') {
        // const studioId=localStorage.getItem("studioI")
        const times = [];
        const subs = [];
        items.map((value: any, index: any) => {
          console.log(value?.time);
          times.push(value?.time);
          subs.push(value?.subtitles);
        });

        await axios
          .post(`https://noteit-server-1.onrender.com/PostPin/${index}`, {
            type: items[0]?.type,
            url: items[0]?.url,
            timestamp: times,
            subtitleText: subs,
          })
          .then((res) => {
            console.log(res);
            toast.success('Pin Item created successfully');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // const studioId=localStorage.getItem("studioI")
        const times = [];
        const subs = [];
        items.map((value: any, index: any) => {
          console.log(value?.time);
          times.push(value?.time);
          subs.push(value?.subtitles);
        });

        await axios
          .post(
            `https://noteit-server-1.onrender.com/UpdatePostPin/${itemActiveIndex}`,
            {
              type: items[0]?.type,
              url: items[0]?.url,
              timestamp: times,
              subtitleText: subs,
            }
          )
          .then((res) => {
            localStorage.setItem('update', false);
            toast.success('Pin Item update successfully');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  return (
    <div className=" w-full">
      {saveItem.length > 0 ? (
        <div className="-mt-28 flex w-full flex-1  flex-row items-center">
          <div className="flex h-screen w-[18%] flex-col border-r border-r-[lightgray]">
            <div className=" top-2 flex w-full flex-row  items-center justify-center border-b border-b-[lightgray] p-3  ">
              <p className="mr-2 text-xl  font-medium text-black">
                Transcript List
              </p>
              <MdEditNote size={32} />
            </div>

            <div className="mb-5 h-screen overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden  ">
              {saveItem.map((item: any, index) => {
                return (
                  <div
                    onClick={() => setIndex(item._id)}
                    key={index}
                    className={`cursor-pointer px-5 py-6 ${
                      itemActiveIndex === item._id ? 'bg-[whitesmoke]' : ''
                    } mt-2 flex h-[30px] w-full flex-row items-center hover:bg-[whitesmoke]`}
                  >
                    <DiVisualstudio size={28} />
                    <p className="ml-3 w-40 truncate overflow-ellipsis text-lg font-medium text-black">
                      {item?.studioName}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          {
            //         loading?
            //         <div className="h-screen flex items-center justify-center">
            // <ScaleLoader color="black"/>

            //         </div>:
            <div>
              <div className="flex h-screen w-[80%]">
                <div className="flex items-center">
                  {saveItem.map(
                    (item: any, index) =>
                      item._id === itemActiveIndex && (
                        <div
                          key={index}
                          className="flex h-full w-[595px] flex-col border-r border-r-[whitesmoke]"
                        >
                          {item?.type === 'file' ? (
                            <div className="m-4 h-[250px] w-[95%] rounded-md border border-[whitesmoke] bg-white pl-5 shadow-1">
                              {/* <WaveForm audio={`http://localhost:8081/${item?.url}`} /> */}
                              <ReactPlayer
                                playing={true}
                                ref={playerRef}
                                height={110}
                                width={'95%'}
                                controls
                                url={`https://noteit-server-1.onrender.com/${item?.url}`}
                              />
                            </div>
                          ) : (
                            <div className="m-4 h-[350px] w-[95%] rounded-md border border-[whitesmoke] bg-white shadow-1">
                              <ReactPlayer
                                playing={true}
                                ref={playerRef}
                                height={350}
                                width={'100%'}
                                controls
                                url={`${item?.url}`}
                              />
                            </div>
                          )}

                          <div className=" h-screen overflow-y-auto overflow-x-hidden border-t  border-t-[lightgray] [&::-webkit-scrollbar]:hidden">
                            <p className="px-5 py-2 font-satoshi text-lg font-medium">
                              Pin Item List
                            </p>
                            {/* <PinList index={itemActiveIndex} items={pinnedItems}/> */}
                            <div className="">
                              {pinnedItems?.map((value: any, index: any) => {
                                return (
                                  <div
                                    onClick={() =>
                                      handleTranscriptionClick(value?.time)
                                    }
                                    key={index}
                                    className="group relative flex  h-fit  cursor-pointer flex-row rounded-md py-[6px] px-7 hover:bg-[whitesmoke]"
                                  >
                                    <div className="absolute top-1 right-1 flex flex-col items-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                                      <IoCopyOutline
                                        onClick={() =>
                                          handleCopy(value?.subtitles)
                                        }
                                        className="mr-1 text-black"
                                        size={16}
                                      />
                                    </div>
                                    <p className="text-md mr-5 font-satoshi font-medium text-[blue]">
                                      {extractAndFormatStartTime(value?.time)}
                                    </p>
                                    <p className="mr-5 font-satoshi font-normal text-black">
                                      {value?.subtitles}
                                    </p>
                                  </div>
                                );
                              })}
                              <div className="ml-5 mt-10">
                                <button
                                  onClick={() => handleEditor(pinnedItems)}
                                  className=" bg-gray-100  cursor-pointer rounded-md bg-[black] py-2 px-6 font-bold text-white "
                                >
                                  Save Your Pin List
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="absolute right-0 top-0 h-full w-[390px] ">
                            <p className="p-3 font-satoshi text-[20px] font-bold">
                              Transcript
                            </p>
                            <div className="h-screen overflow-y-auto overflow-x-hidden pb-10 [&::-webkit-scrollbar]:hidden   ">
                              <div className="relative  cursor-pointer border-b border-b-[whitesmoke]  bg-white p-4 shadow-1 ">
                                <button className="absolute top-1/2 left-0 -translate-y-1/2">
                                  <CiSearch size={27} className="ml-2" />
                                </button>
                                <input
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  type="text"
                                  placeholder="Type to search your demo..."
                                  className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
                                />
                              </div>
                              <div className="py-5 px-2 ">
                                <div className="">
                                  {item?.timestamps.map((timestamps, inx) => {
                                    const subtitle = item?.subtitles[inx];

                                    if (
                                      searchTerm &&
                                      !subtitle.includes(searchTerm)
                                    ) {
                                      return null; // Skip rendering if there's a search term, and the subtitle doesn't match it
                                    }

                                    return (
                                      <div
                                        onClick={() =>
                                          handleTranscriptionClick(timestamps)
                                        }
                                        className={`group relative flex h-fit cursor-pointer flex-row items-start justify-center rounded-md py-[6px] px-7 hover:bg-[whitesmoke]`}
                                      >
                                        <div className="absolute top-1 right-1 flex flex-col items-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                                          <IoCopyOutline
                                            onClick={() => handleCopy(subtitle)}
                                            className="mr-1 text-black hover:scale-[1.2]"
                                            size={16}
                                          />
                                          <CiShoppingTag
                                            onClick={() =>
                                              handlePin(
                                                timestamps,
                                                subtitle,
                                                item?.type,
                                                item?.url
                                              )
                                            }
                                            className="mr-1 mt-3 text-black hover:scale-[1.2]"
                                            size={18}
                                          />
                                        </div>
                                        <p className="text-md mr-5 font-satoshi font-medium text-[blue]">
                                          {extractAndFormatStartTime(
                                            timestamps
                                          )}
                                        </p>
                                        <p className="mr-5 font-satoshi font-normal text-black">
                                          {subtitle}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
                {itemActiveIndex === null && (
                  <div className="ml-40 flex h-[500px]  items-center justify-center">
                    <div className="flex h-[60px] w-[450px] items-center justify-center rounded-md bg-white shadow-4">
                      <p className="font-satoshi text-lg font-medium text-black">
                        No Studio Has Selected
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <ScaleLoader color="black" />
        </div>
      )}
    </div>
  );
};

export default Transcript;
