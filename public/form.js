(function addPreviewImageScript() {
  const imageInput = document.querySelector(".js-image-input");
  const image = document.querySelector(".js-image");

  // Useful after page reload
  if (imageInput.value) {
    image.src = imageInput.value;
  }

  imageInput.addEventListener("blur", (e) => {
    image.src = e.target.value;
  });
})();
