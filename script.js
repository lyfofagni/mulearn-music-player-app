const songs = [
  {
    title: "Inspiring Cinematic",
    artist: "Pixabay Music",
    src: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_7c8b8d1f9c.mp3"
  },
  {
    title: "Chill Abstract",
    artist: "Pixabay Music",
    src: "https://cdn.pixabay.com/download/audio/2022/10/12/audio_73bfa7a9c5.mp3"
  },
  {
    title: "Ambient Piano",
    artist: "Pixabay Music",
    src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d1718ab41c.mp3"
  }
];

let currentSong = 0;
let isPlaying = false;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playlist = document.getElementById("playlist");
const playBtn = document.getElementById("playBtn");

audio.volume = 0.8;

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  audio.load();
  updatePlaylist();
}

function togglePlay() {
  if (!isPlaying) {
    audio.play().then(() => {
      isPlaying = true;
      playBtn.textContent = "⏸ Pause";
    }).catch(err => {
      console.error("Playback blocked:", err);
      alert("Click play again — browser blocked autoplay.");
    });
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶ Play";
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  forcePlay();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  forcePlay();
}

function forcePlay() {
  audio.play().then(() => {
    isPlaying = true;
    playBtn.textContent = "⏸ Pause";
  });
}

function setVolume(value) {
  audio.volume = value;
}

function updatePlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    if (index === currentSong) li.classList.add("active");
    li.onclick = () => {
      currentSong = index;
      loadSong(index);
      forcePlay();
    };
    playlist.appendChild(li);
  });
}

audio.addEventListener("ended", nextSong);

loadSong(currentSong);
