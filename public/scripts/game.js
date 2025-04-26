document.querySelector(".js-delete-btn").addEventListener("click", () => {
  document.querySelector(".js-delete-form").classList.add("open");
  document.querySelector(".js-password").focus();
});

document.querySelector(".js-delete-cancel").addEventListener("click", () => {
  document.querySelector(".js-delete-form").classList.remove("open");
});
