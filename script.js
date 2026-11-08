const openButton = document.getElementById("openButton");
const replayButton = document.getElementById("replayButton");
const replayDuringVoice = document.getElementById("replayDuringVoice");
const intro = document.getElementById("intro");
const story = document.getElementById("story");
const letter = document.getElementById("letter");
const voice = document.getElementById("voice");

let musicPlayer = null;
let youtubeReady = false;

window.onYouTubeIframeAPIReady = function () {
  musicPlayer = new YT.Player("youtubePlayer", {
    videoId: "EI2oxQd95z4",
    playerVars: {
      playsinline: 1,
      controls: 1,
      rel: 0
    },
    events: {
      onReady: function () {
        youtubeReady = true;
        musicPlayer.setVolume(15);
      }
    }
  });
};

async function playMessage() {
  intro.classList.add("hidden");
  letter.classList.add("hidden");
  story.classList.remove("hidden");

  try {
    voice.currentTime = 0;

    // Attempt to start the YouTube song after the visitor's tap.
    if (youtubeReady && musicPlayer) {
      try {
        musicPlayer.setVolume(15);
        musicPlayer.playVideo();
      } catch (musicError) {
        console.warn("YouTube music could not start:", musicError);
      }
    }

    await voice.play();
  } catch (error) {
    alert("تعذّر تشغيل التسجيل. تأكدي من رفع ملف الصوت مع الموقع ثم حاولي مرة ثانية ❤️");
  }
}

openButton.addEventListener("click", playMessage);

if (replayButton) {
  replayButton.addEventListener("click", playMessage);
}
if (replayDuringVoice) {
  replayDuringVoice.addEventListener("click", playMessage);
}

voice.addEventListener("ended", () => {
  // Keep the complete written message visible after the voice finishes.
  if (musicPlayer && youtubeReady) {
    try { musicPlayer.pauseVideo(); } catch (e) {}
  }
});

voice.addEventListener("error", () => {
  alert("ملف الصوت غير موجود أو تعذّر تحميله. تأكدي من وجود your-voice.m4a.m4a داخل ملفات الموقع ❤️");
});
