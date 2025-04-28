(function addGenreDeletionFormScript() {
  const genreList = document.querySelector(".js-genre-list");
  const formModal = document.querySelector(".js-modal");
  const deleteGenreForm = document.querySelector(".js-delete-form");
  const dynamicGenreName = document.querySelector(".js-genre-name");
  const cancelButton = document.querySelector(".js-delete-cancel");
  const deleteError = document.querySelector(".js-delete-error");

  const showDeleteForm = (id, name) => {
    deleteGenreForm.action = `/genre/delete/${id}`;
    dynamicGenreName.textContent = name;
    formModal.showModal();
  };

  // Show genre deletion form when a button on genre list is clicked
  genreList.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-genre")) {
      const { id, name } = e.target.dataset;
      showDeleteForm(id, name);
    }
  });

  // Close form
  cancelButton.addEventListener("click", () => {
    deleteError.textContent = "";
    formModal.close();
  });

  // Display form after validation reload to immediately show errors
  // dataset should be given on page render by backend
  if (formModal.dataset.open) {
    const { id, name } = formModal.dataset;
    showDeleteForm(id, name);
  }
})();
