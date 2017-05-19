let nameInput = document.forms.nuance.fullName,
  phoneInput = document.forms.nuance.phoneNum,
  closeButton = document.getElementsByClassName('header-close')[0],
  submitButton = document.forms.nuance.submitBtn,
  form = document.forms.nuance,

  onFocus = (e) => {
    let element = e.target || window.event.srcElement;
    element.style.cssText = "color: black; font-style: normal; opacity: 1";
  },

  onBlur = (e) => {
    let element = e.target || window.event.srcElement;
    if ( element.value === "" && element === document.forms.nuance.fullName ){
      element.value = "John Doe";
      element.style.cssText = "font-style: italic; opacity: .6; position: relative; padding-left: 5px;";
    } else if (element.value === "" && element === document.forms.nuance.phoneNum){
      element.value = "888-123-4567";
      element.style.cssText = "font-style: italic; opacity: .6; position: relative; padding-left: 5px;";
    }
  },

  closeChat = (e) => {
    document.getElementById('survey').style.cssText = "display: none;";
  },

  onSubmit = (e) => {
    let phoneTitle = document.getElementsByClassName('form-title')[1],
      phoneNum = document.forms.nuance.phoneNum.value,
      form = document.getElementsByClassName('survey-form')[0],
      thankYouMsg = document.getElementById('thankyou');


      console.log("t or f", checkPhoneNum(phoneNum));

    /**
    * set the appropriate styles
    * and add invalid message
    * if phone number is invalid
    */
    e.preventDefault();
    if(!checkPhoneNum(phoneNum)) {
      phoneInput.removeEventListener("focus", onFocus, true);
      phoneInput.style.cssText = "border: 1px solid #ff0000; background: #ffc0cb; color: #ff0000;";
      phoneTitle.textContent = '* Phone Number - invalid phone number';
      phoneTitle.style.cssText = 'color: #ff0000';
    }
    else {
      form.style.display = 'none';
      thankYouMsg.style.display = 'block';
      form.submit();
    }
  },

  /**
  * checks if the phone
  * number is invalid
  */
  checkPhoneNum = (inputText) => {
    var regex = /^\d{10}$/ | /^\d{3}[-]\d{3}[-]\d{4}$/ | /^\(\d{3}\) \d{3}[-]\d{4}$/;

    if(inputText.match(regex)) {
      return true;
    }
    else {
      return false;
    }
  };


nameInput.addEventListener("focus", onFocus);
phoneInput.addEventListener("focus", onFocus);
nameInput.addEventListener("blur", onBlur);
phoneInput.addEventListener("blur", onBlur);
closeButton.addEventListener("click", closeChat);
form.addEventListener('submit', onSubmit);
