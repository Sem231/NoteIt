// @ts-nocheck
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import WaveForm from "../Record/WaveForm";
import { CiSearch } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";
import useCopyToClipboard from "../AudioToText/useCopyToClipboard";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const PinItemList = ({saveItem}:any) => {
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(saveItem.item2[0].type)
function formatSrtTimeToMinutesSeconds(srtTime:any) {
  // Split the time into hours, minutes, seconds, and milliseconds
  const [time, milliseconds] = srtTime.split(',');
  const [hours, minutes, seconds] = time.split(':');
 
  // Calculate the total time in seconds
  const totalSeconds = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);
 
  // Calculate minutes and seconds
  const formattedMinutes = Math.floor(totalSeconds / 60);
  const formattedSeconds = totalSeconds % 60;
 
  // Return the formatted time as a string
  return `${formattedMinutes}:${formattedSeconds}`;
 }
 function extractAndFormatStartTime(srtTimeRange:any) {
  // Split the time range into start and end times
  const [startTime] = srtTimeRange?.split(" --> ");
 
  // Format the start time
  const formattedStartTime = formatSrtTimeToMinutesSeconds(startTime);
 
  return formattedStartTime;
 }
 const screenHeight = window.innerHeight;
 console.log(screenHeight)

 const [value, copy] = useCopyToClipboard()
const handleCopy=(text:any)=>{
  copy(text)
  toast.success("Text copied successfuly")
}
const playerRef = useRef(null);

const handleTranscriptionClick = (timestamp:any) => {
  console.log(timestamp)
  if (playerRef.current) {
    const startTime = timestamp.split(" --> ")[0];
    // Convert the startTime to total seconds (assuming time format HH:MM:SS,SSS)
    const [hours, minutes, seconds, milliseconds] = startTime
      .split(/[:,]/)
      .map(parseFloat);
    const totalSeconds =
      hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
    playerRef.current?.seekTo(totalSeconds, "seconds");
  }
};
  return (
    <div>

      {
     
         <div  className="w-[590px] flex  flex-col border-r border-r-[whitesmoke] ">
          {
            saveItem?.item===undefined?
            <div className="w-[95%] flex justify-center items-center h-[250px] rounded-md m-4 bg-white shadow-1 border border-[whitesmoke]">
              <p className="font-satoshi font-light text-black text-lg">No Pin Items found</p>
              </div>:
            <div>
              {
            saveItem?.item1[0].type==='file'?
            <div className="w-[95%] h-[250px] rounded-md m-4 bg-white shadow-1 border border-[whitesmoke]">
             {/* <WaveForm audio={`http://localhost:8081/${saveItem?.item2[0].url}`} /> */}
             <ReactPlayer playing={true} ref={playerRef}   height={110} width={"95%"} controls url={`http://localhost:8081/${saveItem?.item2[0].url}`} />

            </div>:
            <div className="w-[95%] h-[350px] rounded-md m-4 bg-white shadow-1 border border-[whitesmoke]">
             <ReactPlayer  height={350} width={"100%"} controls url={`${saveItem?.item2[0].type}`} />
            </div>
          }
            </div>
          }
          
        
        <div className="h-[322px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden  border-t border-t-[lightgray]">
        <p className="px-5 py-2 font-satoshi font-medium text-lg">Pin Item List</p>
        <div>
          {
            saveItem?.item===undefined?
            <div className="h-[322px] flex items-center justify-center overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden  border-t border-t-[lightgray]"><p className="font-satoshi font-light text-black text-lg">No Pin Items found</p></div>:
            <div>
              {
        saveItem?.item2[0]?.timestamps.map((value:any,index:any)=>{
          return(
            <div onClick={() => handleTranscriptionClick(value)} key={index} className="flex flex-row group  relative  rounded-md py-[6px] px-7 cursor-pointer h-fit hover:bg-[whitesmoke]">
            <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex-col absolute top-1 right-1 items-center">
              <IoCopyOutline onClick={()=>handleCopy(saveItem?.item2[0]?.subtitles[index])} className="text-black mr-1" size={16}/>
            </div>
           <p className="mr-5 text-[blue] font-satoshi text-md font-medium">{extractAndFormatStartTime(value)}</p>
           <p className="mr-5 text-black font-satoshi font-normal">{saveItem?.item2[0]?.subtitles[index]}</p>
           </div>
          )
        })
      }
            </div>
          }
        
        </div>
        </div>
        
        <div  className="w-[350px] h-[550px] absolute right-0  ">
         <p className="p-3 font-satoshi font-bold text-[20px]">Transcript</p>
         <div className="h-full overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden   ">
         <div  className="relative  cursor-pointer bg-white shadow-1  border-b border-b-[whitesmoke] p-4 ">
             <button className="absolute top-1/2 left-0 -translate-y-1/2">
               <CiSearch size={27} className="ml-2"/>
             </button>
             <input
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
               type="text"
               placeholder="Type to search your demo..."
               className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
             />
           </div>
           <div className="py-5 px-2 ">
          <div  className="">
          {
  saveItem?.item1[0]?.timestamps.map((timestamps:any, inx:any) => {
    const subtitle = saveItem?.item1[0]?.subtitles[inx];

    if (searchTerm && !subtitle.includes(searchTerm)) {
      return null;
    }

    return (
      <div
      onClick={() => handleTranscriptionClick(timestamps)}
        className={`flex flex-row group relative items-start justify-center rounded-md py-[6px] px-7 cursor-pointer h-fit hover:bg-[whitesmoke]`}
      >
        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex-col absolute top-1 right-1 items-center">
          <IoCopyOutline
            onClick={() => handleCopy(subtitle)}
            className="text-black mr-1 hover:scale-[1.2]"
            size={16}
          />
          
        </div>
        <p className="mr-5 text-[blue] font-satoshi text-md font-medium">
          {extractAndFormatStartTime(timestamps)}
        </p>
        <p className="mr-5 text-black font-satoshi font-normal">{subtitle}</p>
      </div>
    );
  })
}
         </div>
           </div>
        </div>
        </div>
         </div>
    }
    <ToastContainer/>
    </div>
  )
}

export default PinItemList