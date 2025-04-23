(function addPreviewImageScript() {
  const imageInput = document.querySelector(".js-image-input");
  const image = document.querySelector(".js-image");
  const errorContainer = document.querySelector(".js-image-errors");
  const loadingErrorMessage = new Range().createContextualFragment(
    "<li>Error loading image, check if the url is correct</li>",
  ).firstChild;

  // Keep a reference to the placeholder image source
  const placeholder = image.src;

  // Used on page reload to set image to the input value
  if (imageInput.value) {
    image.src = imageInput.value;
  }

  imageInput.addEventListener("blur", (e) => {
    // Remove error message when it's displayed
    if (loadingErrorMessage.parentElement === errorContainer) {
      errorContainer.removeChild(loadingErrorMessage);
    }
    image.src = e.target.value === "" ? placeholder : e.target.value;
  });

  image.addEventListener("error", (e) => {
    errorContainer.appendChild(loadingErrorMessage);
    image.src = placeholder;
  });
})();
