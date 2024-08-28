// @ts-nocheck
import { Link, useNavigate } from 'react-router-dom';
import Logo from './hiresyncscom-website-favicon-black.png';
import DropdownUser from './DropdownUser';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Modal } from "@mui/material"
import ReviewLink from './ReviewLink';

const style2 = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: '#1C1B22',
  boxShadow: 24,
  p: 2,
  outline: 0,
  height:650,
  borderRadious:20
};
const Header = ({sidebarOpen,setSidebarOpen}:any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate=useNavigate()
  const openModal = () => {
    setModalOpen(!modalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const logOut=()=>{
    localStorage.removeItem("_ttt_")
    navigate("/")
    
  }
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white  dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex  flex-grow items-center justify-between  px-4  md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        {/* <div className=" flex flex-row items-center text-lg ">
          <img 
          width={50}
          height={50}
          className='object-cover'
          src='data:image/png;base64,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'/>
          <p>Testimonial</p>
        
        </div> */}

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center flex-row gap-2 2xsm:gap-4">

            <div>
              {/* <button  onClick={()=>setModalOpen(true)} className="flex   w-[150px] justify-center rounded-[8px] bg-[#25224A] p-3 font-medium text-white">
                  Collect  Review
                </button> */}
            </div>
           
          </ul>

          {/* <!-- User Area --> */}
          {/* <DropdownUser /> */}
          {/* <!-- User Area --> */}
        </div>
      
      
      
      </div>
    </header>
  );
};

export default Header;
