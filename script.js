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
  const chars = "@%#*+=-:. ";
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
      row += chars[charIndex];
    }
    asciiImage += row + "\n";
  }
  ascii.textContent = asciiImage;
  requestAnimationFrame(renderFrame);
};

function resizeAscii() {
  if (!width || !height) return;
  const fontByWidth = window.innerWidth / (width * 0.6);
  const fontByHeight = window.innerHeight / height;
  ascii.style.fontSize = Math.min(fontByWidth, fontByHeight) + "px";
}

window.addEventListener("resize", resizeAscii);
