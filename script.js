const songs = [
  {
    title: "SoundHelix Song 1",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    title: "SoundHelix Song 2",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "SoundHelix Song 3",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
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
  updatePlaylist();
}

function togglePlay() {
  if (!isPlaying) {
    audio.play()
      .then(() => {
        isPlaying = true;
        playBtn.textContent = "⏸ Pause";
      })
      .catch(() => {
        alert("Audio could not be played. Please try another song.");
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
  resetPlayState();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  resetPlayState();
}

function resetPlayState() {
  isPlaying = false;
  playBtn.textContent = "▶ Play";
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
      resetPlayState();
    };
    playlist.appendChild(li);
  });
}

audio.addEventListener("ended", nextSong);

loadSong(currentSong);
