// Juste pour ouvrir/fermer les dialogs
document.querySelectorAll('.view-btn').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    document.getElementById(`modal${index + 1}`).showModal();
  });
});

document.querySelectorAll('.close-dialog').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('dialog').close();
  });
});