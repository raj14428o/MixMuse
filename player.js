console.log("Welcome to Spotify");

let songIndex = 0; 
let masterplay = document.getElementById('masterPlay');  // lowercase p consistent
let myProgressbar = document.getElementById('myProgressBar');
myProgressbar.value = 0;
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Added duration property here, optional but recommended if you want to update timestamp
let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "3:40" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "3:12" },
    { songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "2:58" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "3:25" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "4:00" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "3:50" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "3:45" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", duration: "4:05" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", duration: "3:15" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", duration: "3:30" },
];

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
    
    const timestampElement = document.getElementById(`timestamp${i}`);
    if (timestampElement && songs[i].duration) {
        timestampElement.childNodes[0].nodeValue = songs[i].duration + ' '; 
    }
});

let audioelement = new Audio(songs[0].filePath);

masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;

        makeAllPlays();
        const currentPlayBtn = document.getElementById(`${songIndex}`);
        if(currentPlayBtn){
            currentPlayBtn.classList.remove('fa-play-circle');
            currentPlayBtn.classList.add('fa-pause-circle');
        }
    } else {
        audioelement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        makeAllPlays();
        gif.style.opacity = 0;
    }
});

audioelement.addEventListener('timeupdate', () => {
    if (!isNaN(audioelement.duration)) {
        let progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
        myProgressbar.value = progress;
    }
});

myProgressbar.addEventListener('change', () => {
    audioelement.currentTime = myProgressbar.value * audioelement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('SongItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);

        if (clickedIndex === songIndex) {
            if (audioelement.paused) {
                audioelement.play();
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                masterplay.classList.remove('fa-play-circle');
                masterplay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            } else {
                audioelement.pause();
                e.target.classList.remove('fa-pause-circle');
                e.target.classList.add('fa-play-circle');
                masterplay.classList.remove('fa-pause-circle');
                masterplay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            }
        } else {
            makeAllPlays();
            songIndex = clickedIndex;
            audioelement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioelement.currentTime = 0;
            audioelement.play();
            gif.style.opacity = 1;
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
        }
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    audioelement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioelement.currentTime = 0;
    audioelement.play();
    
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

    makeAllPlays();

    const currentPlayButton = document.getElementById(`${songIndex}`);
    if (currentPlayButton) {
        currentPlayButton.classList.remove('fa-play-circle');
        currentPlayButton.classList.add('fa-pause-circle');
    }

    gif.style.opacity = 1;
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioelement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioelement.currentTime = 0;
    audioelement.play();

    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');

    makeAllPlays();

    const currentPlayButton = document.getElementById(`${songIndex}`);
    if (currentPlayButton) {
        currentPlayButton.classList.remove('fa-play-circle');
        currentPlayButton.classList.add('fa-pause-circle');
    }

    gif.style.opacity = 1;
});
