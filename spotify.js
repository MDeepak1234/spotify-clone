let index=0;
let audioE=new Audio('1.mp3');
let plays=document.getElementById('plays');
let next=document.getElementById('fs');
let previous=document.getElementById('bs');
let bar=document.getElementById('bar');
let songItem=Array.from(document.getElementsByClassName('boxes'));

let songs = [
    {songName: "Vesana o nichena", filePath: "1.mp3"},
    {songName: "Lemon Tree", filePath: "2.mp3"},
    {songName: "Let Me Down Slowly", filePath: "3.mp3"},
    {songName: "Moral of the Story", filePath: "4.mp3"},
    {songName: "Shaky", filePath: "5.mp3"},
    {songName: "SummerTimeSadness", filePath: "6.mp3"},
]


plays.addEventListener('click',()=>{
    if(audioE.paused || audioE.currentTime<=0){
        audioE.play();   
        plays.classList.remove('fa-play');
        plays.classList.add('fa-pause');
    }
    else{
        audioE.pause();
        plays.classList.remove('fa-pause');
        plays.classList.add('fa-play');
    }
})
audioE.addEventListener('timeupdate',()=>{
    progress =parseInt((audioE.currentTime/audioE.duration)*100);
    bar.value=progress;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('box')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
};
Array.from(document.getElementsByClassName('box')).forEach((element,i)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        index=i;
        e.target.classList.add('fa-pause');
        e.target.classList.remove('fa-play');
        audioE.currentTime=0;
        audioE.src=`${index+1}.mp3`;
        audioE.play();
        plays.classList.add('fa-pause');
        plays.classList.remove('fa-play');
    })
})
document.getElementById('fs').addEventListener('click',()=>{
    if(index>5){
        index=0;
    }
    else{
        index+=1;
    }
    audioE.src=`${index+1}.mp3`;
    audioE.currentTime=0;
    audioE.play();
    plays.classList.add('fa-pause');
    plays.classList.remove('fa-play');
})
document.getElementById('bs').addEventListener('click',()=>{
    if(index<0){
        index=5;
    }
    else{
        index-=1;
    }
    audioE.src=`${index+1}.mp3`;
    audioE.currentTime=0;
    audioE.play();
    plays.classList.add('fa-pause');
    plays.classList.remove('fa-play');
})

audioE.addEventListener('ended', () => {
    index = (index + 1) % songs.length; 
    audioE.src = songs[index].filePath;
    audioE.currentTime = 0;
    audioE.play();
});
