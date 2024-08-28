// @ts-nocheck
import { IoCopyOutline } from 'react-icons/io5';
import useCopyToClipboard from '../AudioToText/useCopyToClipboard';
import { toast } from 'react-toastify';
import axios from 'axios';

const PinList = ({ items, index }: any) => {
  function formatSrtTimeToMinutesSeconds(srtTime: any) {
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
  function extractAndFormatStartTime(srtTimeRange: any) {
    // Split the time range into start and end times
    const [startTime] = srtTimeRange.split(' --> ');

    // Format the start time
    const formattedStartTime = formatSrtTimeToMinutesSeconds(startTime);

    return formattedStartTime;
  }
  const [value, copy] = useCopyToClipboard();
  const handleCopy = (text: any) => {
    copy(text);
    toast.success('Text copied successfuly');
  };
  const handleEditor = async () => {
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
          .post(`https://noteit-server-1.onrender.com/UpdatePostPin/${index}`, {
            type: items[0]?.type,
            url: items[0]?.url,
            timestamp: times,
            subtitleText: subs,
          })
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
    <div className="">
      {items.map((value: any, index: any) => {
        return (
          <div
            key={index}
            className="group relative flex  h-fit  cursor-pointer flex-row rounded-md py-[6px] px-7 hover:bg-[whitesmoke]"
          >
            <div className="absolute top-1 right-1 flex flex-col items-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
              <IoCopyOutline
                onClick={() => handleCopy(value?.subtitles)}
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
          onClick={handleEditor}
          className=" bg-gray-100  cursor-pointer rounded-md bg-[black] py-2 px-6 font-bold text-white "
        >
          Save Your Pin List
        </button>
      </div>
    </div>
  );
};

export default PinList;
