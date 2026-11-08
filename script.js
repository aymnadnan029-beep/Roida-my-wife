const openButton = document.getElementById("openButton");
const replayButton = document.getElementById("replayButton");
const intro = document.getElementById("intro");
const story = document.getElementById("story");
const voice = document.getElementById("voice");
const spokenMessage = document.getElementById("spokenMessage");
const voiceStatus = document.getElementById("voiceStatus");

spokenMessage.textContent = "رويدا حبيبتي بعرف انك زعلانه مني وانا مو زي كل مره جاي بررلك بس يقلبي اكتشفت اني ما بقدر اقعد لحظة بدونك والحياة بعيدة عنك صعبة كتير تعالي جنبي حبيبتي ما الي غيرك";

let musicPlayer = null;
let youtubeReady = false;
let musicWasStarted = false;

window.onYouTubeIframeAPIReady = function () {
  musicPlayer = new YT.Player("youtubePlayer", {
    videoId: "EI2oxQd95z4",
    playerVars: { playsinline: 1, controls: 1, rel: 0 },
    events: {
      onReady: function () {
        youtubeReady = true;
        musicPlayer.setVolume(12);
      }
    }
  });
};

function pauseBackgroundMusic() {
  if (youtubeReady && musicPlayer) {
    try { musicPlayer.pauseVideo(); } catch (e) { console.warn(e); }
  }
}

function resumeBackgroundMusic() {
  if (youtubeReady && musicPlayer) {
    try {
      musicPlayer.setVolume(12);
      musicPlayer.playVideo();
      musicWasStarted = true;
    } catch (e) { console.warn(e); }
  }
}

async function playMessage() {
  intro.classList.add("hidden");
  story.classList.remove("hidden");

  // مهم على Safari/iPhone: لا نشغّل YouTube بالتزامن مع تسجيل الصوت.
  // تشغيل مصدرين صوتيين معاً قد يجعل iOS يوقف عنصر الصوت الأول.
  pauseBackgroundMusic();
  voice.pause();
  voice.currentTime = 0;

  try {
    await voice.play();
    voiceStatus.textContent = "أيمن يحكيلك رسالته بكل حب ❤️";
  } catch (error) {
    voiceStatus.textContent = "تعذّر تشغيل التسجيل. تأكدي من رفع ملف الصوت بجانب index.html.";
    console.error("Voice playback error:", error);
  }
}

openButton.addEventListener("click", playMessage);
replayButton.addEventListener("click", playMessage);

voice.addEventListener("ended", () => {
  voiceStatus.textContent = "خلصت رسالتي… بس حبي إلك ما بيخلص ❤️♾️";
  // بعد انتهاء التسجيل فقط، نسمح للموسيقى بالعمل.
  resumeBackgroundMusic();
});

voice.addEventListener("error", () => {
  pauseBackgroundMusic();
  voiceStatus.textContent = "ملف الصوت لم يتم تحميله. تأكدي من وجود your-voice.m4a.m4a.";
});
