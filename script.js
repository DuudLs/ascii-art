let width, height;

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ascii = document.getElementById("ascii");

const ctx = canvas.getContext("2d");

video.addEventListener("loadeddata", () => {
  width = 300;
  height = Math.floor((video.videoHeight / video.videoWidth) * width * 0.5);
  canvas.width = width;
  canvas.height = height;
  resizeAscii();
  renderFrame();
});

const renderFrame = () => {
  ctx.drawImage(video, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const chars = " .:-=+*#%@";
  let asciiImage = "";

  for (let y = 0; y < height; y++) {
    let row = "";
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = (r + g + b) / 3;
      const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
      let char = chars[charIndex];
      if (char === " ") char = "&nbsp;";
      if (r > 70 && r > g * 1.3 && r > b * 1.3) {
        row += `<span style="color: #ff2a2a;">${char}</span>`;
      } else if (
        g > 20 &&
        g >= r * 0.98 &&
        g >= b * 0.98 &&
        (g > r + 4 || g > b + 4)
      ) {
        row += `<span style="color: #2ecc40;">${char}</span>`;
      } else {
        row += char;
      }
    }

    asciiImage += row + "<br>";
  }
  ascii.innerHTML = asciiImage;
  requestAnimationFrame(renderFrame);
};

function resizeAscii() {
  if (!width || !height) return;
  const fontByWidth = window.innerWidth / (width * 0.6);
  const fontByHeight = window.innerHeight / height;
  ascii.style.fontSize = Math.min(fontByWidth, fontByHeight) + "px";
}

window.addEventListener("resize", resizeAscii);
