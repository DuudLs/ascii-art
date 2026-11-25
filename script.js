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
