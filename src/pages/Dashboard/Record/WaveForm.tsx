// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

const WaveForm = ({ audio }) => {
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  const [isPlaying, toggleIsPlaying] = useState(false);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      barWidth: 2,
      barHeight: 10,
      cursorWidth: 0,
    });
    waveSurfer.load(audio);
    waveSurfer.on('ready', () => {
      waveSurferRef.current = waveSurfer;
    });

    return () => {
      waveSurfer.destroy();
    };
  }, [audio]);

  return (
    <div className='pt-5 pl-5 h-fit mt-5'>
    <WaveSurferWrap>
      <button
        onClick={() => {
          waveSurferRef.current.playPause();
          toggleIsPlaying(waveSurferRef.current.isPlaying());
        }}
        type="button"
      >
        {
          (audio)&&
          <div>
      {isPlaying ? <FaPauseCircle className='pr-2'  size="3em" />
         : 
        <FaPlayCircle className='pr-2' size="3em" />}
          </div>
          
        }
        
      </button>
      <div ref={containerRef} />
    </WaveSurferWrap>
    </div>
  );
};

// Waveform.propTypes = {
//   audio: PropTypes.string.isRequired,
// };

const WaveSurferWrap = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr;
  align-items: center;

  button {
    width: 40px;
    height: 40px;
    border: none;
    padding: 0;
    background-color: white;
    
  }
`;


export default WaveForm;