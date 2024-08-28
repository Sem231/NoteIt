import { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { DotLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const override = {
  display: 'block',
  margin: '0 auto',
};
const Space = () => {
  const [Name, setName] = useState(null);
  const [WebsiteN, setWebsiteN] = useState(null);
  const [WebsietUrl, setWebsietUrl] = useState(null);
  const [stateLoading, setStateLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const email = localStorage.getItem('email');
    if (Name === null || WebsietUrl === null || WebsiteN === null) {
      toast('Field are required');
    } else {
      setStateLoading(true);
      await axios
        .post(`https://noteit-server-1.onrender.com/CreateSpace/${email}`, {
          Name: Name,
          WebsiteUrl: WebsietUrl,
          WebsiteN: WebsiteN,
        })
        .then((res) => {
          navigate('/space');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Header />
      {}

      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="w-[700px]   rounded-lg bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
          <div className="h-[600px] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="text-center text-xl font-semibold text-black dark:text-white">
                Create Your Workspace
              </h3>
            </div>
            <div className="relative p-6.5">
              <div className="mb-4.5 mt-5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Space Name <span className="text-meta-1">*</span>
                </label>
                <input
                  onChange={(e: any) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your email address"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5 mt-8">
                <label className="mb-2.5 block text-black dark:text-white">
                  Website url <span className="text-meta-1">*</span>
                </label>
                <input
                  onChange={(e: any) => setWebsietUrl(e.target.value)}
                  type="text"
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5 mt-8">
                <label className="mb-2.5 block text-black dark:text-white">
                  Website Name <span className="text-meta-1">*</span>
                </label>
                <input
                  onChange={(e: any) => setWebsiteN(e.target.value)}
                  type="text"
                  placeholder="Select subject"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <button
                onClick={handleSubmit}
                type="submit"
                className="mt-14 flex w-full  justify-center rounded-lg bg-[#25224A] p-4 text-lg font-semibold text-white"
              >
                {stateLoading ? (
                  <DotLoader
                    color="white"
                    // loading={stateLoading}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    cssOverride={override}
                  />
                ) : (
                  <p className="font-serif font-[600]">Create Space</p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Space;
