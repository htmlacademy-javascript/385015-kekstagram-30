const openModal = (windowModal) => {
  document.body.classList.add('modal-open');
  windowModal.classList.remove('hidden');
};

const closeModal = (windowModal) => {
  document.body.classList.remove('modal-open');
  windowModal.classList.add('hidden');
};

export { openModal, closeModal };
