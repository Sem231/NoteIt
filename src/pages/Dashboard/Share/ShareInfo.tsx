// @ts-nocheck
import { AiOutlineBuild } from 'react-icons/ai';
import Transcription from '../SaveList/Transcription';
import Summary from '../SaveList/Summary';
import Notes from '../SaveList/Notes';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import PinItemList from './PinItemList';
import ShareTranscription from './ShareTranscription';
import ShareSummary from './ShareSummary';
import ShareNotes from './ShareNotes';
import { BiBlanket } from 'react-icons/bi';
import { TbNotes } from 'react-icons/tb';
import { CiShoppingTag } from 'react-icons/ci';
const HeaderItem = [
  {
    id: 1,
    name: 'Pin Items',
    icon: CiShoppingTag,
  },
  {
    id: 2,
    name: 'Transcription',
    icon: AiOutlineBuild,
  },
  {
    id: 3,
    name: 'Summary',
    icon: BiBlanket,
  },
  {
    id: 4,
    name: 'Notes',
    icon: TbNotes,
  },
];
const ShareInfo = () => {
  const { studioId } = useParams();
  const [acttiveIndex, setACtiveIndex] = useState(0);
  const [saveItem, setSaveItem] = useState();

  const [loading, setLoading] = useState(false);
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
  const HeaderIdentification = () => {
    if (acttiveIndex === 0) {
      return (
        <div className="w-full">
          <PinItemList saveItem={saveItem} />
        </div>
      );
    } else if (acttiveIndex === 1) {
      return (
        <div>
          <ShareTranscription item={saveItem?.item1[0]?.StudioText} />
        </div>
      );
    } else if (acttiveIndex === 2) {
      return (
        <div>{<ShareSummary item={saveItem?.item1[0]?.SummaryText} />}</div>
      );
    } else {
      return <div>{<ShareNotes item={saveItem?.item1[0]?.NoteText} />}</div>;
    }
    return null;
  };
  const getSaveList = async () => {
    setLoading(true);
    // const sid=localStorage.getItem("sid")
    // const studioId=localStorage.getItem("studioI")
    await axios
      .get(`https://noteit-server-1.onrender.com/specificStudio/${studioId}`)
      .then((res) => {
        setSaveItem(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSaveList();
  }, []);

  const screenHeight = window.innerHeight;

  return (
    <div
      style={{
        height: screenHeight,
      }}
      className="relative mx-auto  w-[950px]"
    >
      <div className=" flex h-full w-full flex-col border border-[whitesmoke] bg-white shadow-1">
        <div className={'mx-auto mt-1'}>
          <div className="relative flex  h-[55px] w-[690px]  items-center rounded-lg border border-[whitesmoke] bg-white py-6  px-10  shadow-[rgba(0,_0,_0,_0.1)_2px_2px_2px]">
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
          {loading ? (
            <div className="flex h-screen items-center justify-center">
              <ScaleLoader color="black" />
            </div>
          ) : (
            <HeaderIdentification />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareInfo;
