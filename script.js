let audio = new Audio();
let currSong = null;

function cleanfileName(fileName) {
    let name = decodeURIComponent(fileName);
    // let cleaned = name.split("-")[0].trim(); // "Tum Ho Toh"
    return name;
}
async function getSongs() {

    let a = await fetch("http://127.0.0.1:3000/PROJECT%202-SPOTIFY/songs/");
    let response = await a.text();
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;
    let tds = div.getElementsByTagName("td");
    console.log(tds);

    let as = div.getElementsByTagName("a");

    let songs = {};
    for (let i = 0; i < as.length; i++) {
        const elem = as[i];
        if (elem.href.endsWith(".mp3")) {
            let parts = elem.href.split("/");
            let fileName = parts[parts.length - 1];
            let cleanedName = cleanfileName(fileName);
            songs[cleanedName] = elem.href;
        }
    }
    return songs;
}
async function main() {
    let songs = await getSongs();
    console.log(songs);

    let playButtons = document.querySelectorAll(".playBtn");
    const img = document.querySelector("#changeBtn");
    playButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            let songName = btn.getAttribute("data-song");
            if (songs[songName]) {
                if (currSong !== songName) {
                    currSong = songName;
                    img.src = "pauseBtn.svg";
                    audio.src = songs[songName];
                    audio.play();
                    console.log("Playing the Song :", songName);
                }
                else {
                    if (audio.paused) {
                        img.src = "pauseBtn.svg";
                        audio.play();
                    }
                    else {
                        img.src = "playBtn.svg";
                        audio.pause();
                    }
                }
            }
            else {
                console.warn("the song is not found :", songName);
            }
        });
    });
    
    let seqSongs=Object.keys(songs);
    let index=0;

    document.getElementById("changeBtn").addEventListener("click",()=>{
        if(audio.paused){
            let song1=seqSongs[index];
            img.src = "pauseBtn.svg";
            audio.src=songs[song1];
            audio.play();
        }
        else{
            img.src = "playBtn.svg";
            audio.pause(); 
        }
    });

    document.getElementById("next").addEventListener("click",()=>{
        if(index<seqSongs.length-1){
            index++;
        }
        let song1=seqSongs[index];
        img.src = "pauseBtn.svg";
        audio.src=songs[song1];
        audio.play();
    });
    document.getElementById("prev").addEventListener("click",()=>{
        if(index<seqSongs.length-1){
            index--;
        }
        let song1=seqSongs[index];
        img.src = "pauseBtn.svg";
        audio.src=songs[song1];
        audio.play();
    });
}

main();