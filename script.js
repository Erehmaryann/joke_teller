// Variables
const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable audio
function toggleAudio() {
  button.disabled = !button.disabled;
}

// Passing our joke to the VoiceRSS API
function speakJoke(joke) {
  VoiceRSS.speech({
    key: "ef4445946bdf46e7998ff95e8afe42f2",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const jokeUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const res = await fetch(jokeUrl);
    const data = await res.json();
    if (data.type === "twopart") {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text to speech
    speakJoke(joke);
    // Disable audio
    toggleAudio();
  } catch (e) {
    // Catch errors here
  }
}

// Button Click Event
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleAudio);
