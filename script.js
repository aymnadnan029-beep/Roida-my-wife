const openButton = document.getElementById("openButton");
const replayButton = document.getElementById("replayButton");
const intro = document.getElementById("intro");
const story = document.getElementById("story");
const voice = document.getElementById("voice");
const spokenMessage = document.getElementById("spokenMessage");
const voiceStatus = document.getElementById("voiceStatus");

const messageText = "رويدا حبيبتي بعرف انك زعلانه مني وانا مو زي كل مره جاي بررلك بس يقلبي اكتشفت اني ما بقدر اقعد لحظة بدونك والحياة بعيدة عنك صعبة كتير تعالي جنبي حبيبتي ما الي غيرك";
spokenMessage.textContent = messageText;

let musicPlayer = null;
let youtubeReady = false;

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

async function playMessage() {
  intro.classList.add("hidden");
  story.classList.remove("hidden");

  try {
    voice.pause();
    voice.currentTime = 0;
    // يبدأ الصوت والموسيقى بعد ضغطة الزائرة، لتوافق قيود تشغيل الهاتف.
    const voicePromise = voice.play();
    if (youtubeReady && musicPlayer) {
      try {
        musicPlayer.setVolume(12);
        musicPlayer.playVideo();
      } catch (e) { console.warn("تعذر تشغيل موسيقى الخلفية", e); }
    }
    await voicePromise;
    voiceStatus.textContent = "أيمن يحكيلك رسالته بكل حب ❤️";
  } catch (error) {
    voiceStatus.textContent = "لم نتمكن من تشغيل التسجيل. تأكدي من وجود ملف الصوت بجانب index.html.";
    console.error(error);
  }
}

openButton.addEventListener("click", playMessage);
replayButton.addEventListener("click", playMessage);

voice.addEventListener("ended", () => {
  voiceStatus.textContent = "خلصت رسالتي… بس حبي إلك ما بيخلص ❤️♾️";
});
voice.addEventListener("error", () => {
  voiceStatus.textContent = "ملف الصوت لم يتم تحميله. تأكدي من رفع your-voice.m4a.m4a.";
});
