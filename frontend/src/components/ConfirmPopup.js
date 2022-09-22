import PopupWithForm from "./PopupWithForm.js";

function ConfirmPopup() {
  
  return (
    <PopupWithForm
      formType={'confirm'}
      formTitle={'Вы уверены?'}
      submitButtonText={'Да'}>
    </PopupWithForm>
  );
}

export default ConfirmPopup;