// @ts-nocheck
import { GoCopy } from 'react-icons/go';
import RichEditor from '../RichEditor';
import { convertToRaw } from 'draft-js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectSummaryInstruction } from '../../../components/feature/AudioSlice';
import { convertFromRaw, EditorState } from 'draft-js';
const Transcription = ({ data, index }: any) => {
  const insT = useSelector(selectSummaryInstruction);
  const studioId = localStorage.getItem('studioI');
  const handleEditor = async () => {
    const newI = JSON.stringify(convertToRaw(insT));
    const formData = new FormData();
    console.log(newI);
    formData.append('StudioText', newI);

    //  console.log(newI)
    await axios
      .post(
        `https://noteit-server-1.onrender.com/UpdateWithTranscription/${studioId}`,
        {
          StudioText: newI,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="relative">
      {data.map(
        (item: any, i: any) =>
          item._id === index && (
            <>
              <div
                key={i}
                className=" m-5 rounded-md bg-white px-1 py-2 shadow-1"
              >
                {item?.StudioText === undefined ? (
                  <div>
                    <p>No Transcription has found</p>
                  </div>
                ) : (
                  <RichEditor
                    text={
                      item?.StudioText?.substring(0, 1) == '{'
                        ? EditorState.createWithContent(
                            convertFromRaw(JSON.parse(item?.StudioText))
                          )
                        : EditorState.createWithContent(
                            convertFromRaw({
                              blocks: [{ text: item.StudioText }],
                              entityMap: {},
                            })
                          )
                    }
                    type={'transcription'}
                  />
                )}

                {/* <GoCopy color="black" size={25} className="absolute top-1 right-8"/>
              <p className="font-satoshi text-lg text-black font-normal">{item?.StudioText}</p> */}
              </div>
              <div className="ml-5">
                <button
                  onClick={handleEditor}
                  className=" bg-gray-100  cursor-pointer rounded-md bg-[black] py-2 px-6 font-bold text-white "
                >
                  Save your changes
                </button>
              </div>
            </>
          )
      )}
    </div>
  );
};

export default Transcription;
