import React, { useContext } from 'react';
import virtual from "./assets/ai.png";
import "./App.css";
import { CiMicrophoneOn } from "react-icons/ci";
import { dataContext } from './context/UserContext';
import speakImg from "./assets/speak.gif";
import Aispeak from './assets/aiVoice.gif'
function App() {
  const {recognition,spoke,setSpoke,text,response}=useContext(dataContext);
 
  return (
    <div className="main">
<img src={virtual} alt="virtual assistant" id="charvis"/>
<span>I am Charvis, Your Advance Virtual Assistant</span>{
  spoke?<div className='loading-le'>{response?<img src={Aispeak} id="speak"/>:<img src={speakImg} id="loading"/>}
  <span id="load">{text}</span></div>:
<button onClick={()=>{
  console.log("Recognition started ✅");
  setSpoke(true)
  recognition.start()}}>Ask me <CiMicrophoneOn />
</button>}

    </div>
  )
}

export default App;
