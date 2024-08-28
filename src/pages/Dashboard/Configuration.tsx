import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { SUMMARY_TONES } from '../../components/Data';
import { SUMMARY_STYLES } from '../../components/Data';
import { SUMMARY_LANGUAGES } from '../../components/Data';
import { LENGTH_LIST } from '../../components/Data';

import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const AdvancedC = () => {
  const [tone,setTone]=useState<any>('caring')
  const [style,setStyle]=useState<any>('decent')
  const [language,setLanguage]=useState<any>('English')
  const [length,setLength]=useState<any>(3)

  
  const setupAdvanced=()=>{
    localStorage.setItem('tone',tone)
    localStorage.setItem('style',style)
    localStorage.setItem('language',language)
    toast.success("Configaration successfully saved",{
      position:"top-right",
      autoClose:5000,
      closeOnClick:true,
    })

  }

  

  return (
    <div style={{width:460,marginLeft:20,marginTop:100}}>
      <p className='absolute top-2 left-7 font-satoshi font-medium text-lg'>Advanced congiguration for your notes</p>
      <div>
        <p style={{
          color: '#333',
          border: 'none',
          fontSize: '17px',
          cursor: 'pointer',
          fontWeight:"bold"
        }}>Summary Styles</p>
        <Select
    defaultValue={SUMMARY_STYLES[0]}
    options={SUMMARY_STYLES}
    theme={(theme) => ({
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary25: 'whitesmoke',
        primary: 'black',
        
      },
    })}
    onChange={(e)=>setStyle(e?.value)}
  />
      </div>
      <div className='mt-8'>
        <p style={{
          color: '#333',
          border: 'none',
          fontSize: '17px',
          cursor: 'pointer',
          fontWeight:"bold"
        }}>Summary Tones</p>
        <Select
    defaultValue={SUMMARY_TONES[3]}
    options={SUMMARY_TONES}
    theme={(theme) => ({
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary25: 'whitesmoke',
        primary: 'black',
        
      },
    })}
    onChange={(e)=>setTone(e?.value)}
  />
      </div>
      <div className='mt-8'>
        <p style={{
          color: '#333',
          border: 'none',
          fontSize: '17px',
          cursor: 'pointer',
          fontWeight:"bold"
        }}>Summary Language</p>
        <Select
    defaultValue={SUMMARY_LANGUAGES[11]}
    options={SUMMARY_LANGUAGES}
    theme={(theme) => ({
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary25: 'whitesmoke',
        primary: 'black',
        
      },
    })}
    onChange={(e)=>setLanguage(e?.label)}
  />
      </div>
      <div className='mt-8'>
        <p style={{
          color: '#333',
          border: 'none',
          fontSize: '17px',
          cursor: 'pointer',
          fontWeight:"bold"
        }}>Summary Length</p>
        <Select
    defaultValue={LENGTH_LIST[2]}
    options={LENGTH_LIST}
    theme={(theme) => ({
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary25: 'whitesmoke',
        primary: 'black',
        
      },
    })}
    onChange={(e)=>setLength(e?.value)}
  />
      </div>
      <button onClick={setupAdvanced}  style={{ backgroundColor: '#000000', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer',width: '460px',marginTop:40,fontSize:15  }}>Save</button>
      {/* <ToastContainer /> */}
      
      </div>
  );
};

export default AdvancedC;
