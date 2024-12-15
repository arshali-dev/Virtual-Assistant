let btn=document.querySelector("#btn")
let content=document.querySelector("#content")
let voice=document.querySelector("#voice")
let song = document.getElementById("song");

function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="fr"
    window.speechSynthesis.speak(text_speak)
}

function wishMe(){
    let day=new Date()
    let hours=day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours <16){
        speak("Good afternoon Sir")
    }else{
        speak("Good Evening Sir")
    }
}
window.addEventListener('load',()=>{
    wishMe()
})
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition 
let recognition =new speechRecognition()
recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
   takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    voice.style.display="block"
    btn.style.display="none"
})
function takeCommand(message) {
    console.log("Recognized command:", message);
    voice.style.display = "none";
    btn.style.display = "flex";

    if (message.includes("hello") || message.includes("hey")) {
        speak("hello Arsh, what can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am Jenny, a virtual assistant, created by Arsh Ali");
    } else if (message.includes("open youtube")) {
        speak("opening youtube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("opening google...");
        window.open("https://www.google.co.in/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("opening facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("opening instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open calculator")) {
        speak("opening calculator...");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("opening whatsapp...");
        window.open("whatsapp://");
    } 
    else if (message.includes("open microsoft Store")) {
        speak("opening icrosoft Store...");
        window.open("Microsoft Store://");
    } 
    else if (message.includes("play song")) {
        speak("sure!, This song will remind you of some good moments");
        window.open("https://www.youtube.com/watch?v=gkCKTuR-ECI&list=RDMMgkCKTuR-ECI&start_radio=1");
    } else if (message.includes("sing a song")) {
        speak("Alright! Here’s a song just for you.");
        song.play();  // Plays the audio file added in the HTML
    } 

    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } 

    else {
        let finalText = "This is what I found on the internet regarding " + message.replace(/Jenny|Janny/g, "").trim();
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace(/Jenny|Janny/g, "").trim()}`, "_blank");
    }
}
