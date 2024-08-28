// @ts-nocheck
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { FadeLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
// @ts-ignore
import { setSpaceId } from '../components/feature/videoSlice.js';
import SupportedPlatfoem from './SupportedPlatfoem.js';
const override = {
  display: 'block',
  margin: '0 auto',
};
const SpaceInfo = () => {
  const [spaceList, setSpaceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const email = localStorage.getItem('email');
  const getSpaceList = async () => {
    await axios
      .get(`https://noteit-server-1.onrender.com/getSpaeList/${email}`)
      .then((res) => {
        setSpaceList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSpaceList();
  }, []);
  const navigation = useNavigate();
  const ShiftSpaceId = (id: any, name: any) => {
    //    dispatch(
    //     setSpaceId(
    //         {
    //         SpaceId:id
    //         }
    //     )

    //    )
    localStorage.setItem('sid', id);
    localStorage.setItem('Name', name);

    navigation(`/overview/${id}`);
  };

  return (
    <div>
      <Header />
      {loading ? (
        <div className="grid h-screen place-items-center">
          <FadeLoader
            color="#000"
            // @ts-ignore
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
            cssOverride={override}
          />
        </div>
      ) : (
        <div>
          <div className="flex h-screen w-full flex-col bg-white  ">
            <div className="ml-auto mr-auto mt-5 flex  h-[100px] w-[700px] items-center justify-between rounded-lg bg-white px-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
              <p className="text-xl font-semibold">Space</p>
              <div
                onClick={() => navigation('/createspace')}
                className="flex w-[30%] cursor-pointer flex-row items-center justify-center rounded bg-[#25224A] p-3 font-medium text-white "
              >
                <AiOutlinePlus size={27} color="white" className="mr-3" />
                <button type="submit" className="flex   ">
                  Create Workspace
                </button>
              </div>
            </div>
            <div className="flex cursor-pointer flex-col items-center">
              {spaceList.map((item: any, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => ShiftSpaceId(item?._id, item?.Name)}
                    className="mt-5 flex h-[80px] w-[700px] flex-row items-center justify-between rounded-lg bg-white px-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] "
                  >
                    <div className="flex h-full w-[13%] items-center justify-center rounded-[50%] bg-[#25224A] p-3 text-3xl text-white">
                      {item?.Name[0]}
                    </div>
                    <div>
                      <p className="text-xl font-semibold">{item?.Name}</p>
                      <p className="text-md ml-2">{item?.Des}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceInfo;
