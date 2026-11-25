const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ascii = document.getElementById("ascii");

const ctx = canvas.getContext("2d");

video.addEventListener("loadeddata", () => {
  const width = 100;
  const height = Math.floor(
    (video.videoHeight / video.videoWidth) * width * 0.5,
  );
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(video, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  console.log(imageData);
});

for (let y = 0; y < height; y++) {
  let row = "";
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    ((r = data[i]), (g = data[i + 1]), (b = data[i + 2]));
    const brightness = (r + g + b) / 3;
    const charIndex = Math.floor((brightness / 255) * (Chars.length - 1));
    row += chars[charIndex];
  }
  asciiImage += row + "\n";
}

ascii.textContent = asciiImage;
