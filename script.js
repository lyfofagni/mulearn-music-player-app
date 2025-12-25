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

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  updatePlaylist();
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
  isPlaying = !isPlaying;
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  isPlaying = true;
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  isPlaying = true;
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
      audio.play();
      isPlaying = true;
    };
    playlist.appendChild(li);
  });
}

audio.addEventListener("ended", nextSong);

loadSong(currentSong);
audio.volume = 0.8;
