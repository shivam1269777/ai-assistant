import React from 'react'
import { createContext } from 'react'
import { useMemo,useEffect,useState } from 'react';
import main from '../gemini';
 export const dataContext=createContext({})
function UserContext({children}) {
  let [spoke,setSpoke]=useState(false);
  let [text,setText]=useState("loading...");
  let [response,setResponse]=useState(false);
    function speech(text){
       let Speech_text=new SpeechSynthesisUtterance(text);
       Speech_text.volume=1;
       Speech_text.rate=1.05;
       Speech_text.pitch=0.9;
       Speech_text.lang="en-US"
       Speech_text.onend = () => {
        console.log("Now ai finished speaking")
    setSpoke(false);
    setText("...loading")
    setResponse(false);
  }
Speech_text.onboundary=(e)=>{
  
   const text_part=text.substring(0,e.charIndex);
     setText(text_part);
   
  }
       window.speechSynthesis.speak(Speech_text)
    }
const recognition=useMemo(()=>{
    let speech_Recognition=window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!speech_Recognition) return null;
    let r = new speech_Recognition();
   
    r.lang = "en-US";
    return r;
},[]);

async function aiResponse(prom){
let res=  await main(prom);

speech(res)
setResponse(true)

}
function OpenWebsite(command){
  if(command.startsWith("open")){
let site=command.replace("open","").trim();
site = site.trim().replace(/\.$/, "");  
site = site.replace(/\s+/g, ""); 
let Url = site.includes(".") ? `https://${site}` : `https://www.${site}.com`;
window.open(Url,"_blank")
speech(`opening ${site}`)
return;
  }
if(command.startsWith("hey jarvis open")){
  let site=command.replace("hey jarvis open","").trim();
  site = site.trim().replace(/\.$/, ""); 
  site = site.replace(/\s+/g, "");  
  let Url = site.includes(".") ? `https://${site}` : `https://www.${site}.com`;
window.open(Url,"_blank")
speech(`opening ${site}`)
return;
}
if(command.startsWith("jarvis open")){
  let site=command.replace( "jarvis open","").trim();
  site = site.trim().replace(/\.$/, "");  
  site = site.replace(/\s+/g, ""); 
  let Url = site.includes(".") ? `https://${site}` : `https://www.${site}.com`;
window.open(Url,"_blank")
speech(`opening ${site}`)
return;
}

else{ aiResponse(command);}
}
useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (e) => {
      let speak_result=e.results[0][0].transcript;
      let res=speak_result.toLowerCase();
     OpenWebsite(res)
     setText(speak_result)
    };

    recognition.onerror = (e) => {
      if (e.error === "no-speech") {
    console.warn(" No speech detected. Try again, or check language settings.");
  } else {
    console.error("SpeechRecognition Error:", e.error);
  }
    };

     

  }, [recognition]);
    const value={
recognition,
spoke,
setSpoke,
text,
setText,
response,
setResponse,
    }
  return (
    
        <dataContext.Provider value={value}>
            {children}
        </dataContext.Provider>
    
    
  )
}

export default UserContext
