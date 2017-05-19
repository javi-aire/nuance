window.onload = () => {
  let nameInput = document.forms.nuance.fullName;
  let phoneInput = document.forms.nuance.phoneNum;

  let onFocus = (e) => {
    let element = e.target || window.event.srcElement;
    if ( element.value === "John Doe"  || element.value === "888-123-4567"){
      element.value = "";
      element.style.cssText = "color: black; font-style: normal; opacity: 1";
    }
  };

  let onBlur = (e) =>{
    let element = e.target || window.event.srcElement;
    if ( element.value === "" && element === document.forms.nuance.fullName ){
      element.value = "John Doe";
      element.style.cssText = "font-style: italic; opacity: .6; position: relative; padding-left: 5px;";
    } else if (element.value === "" && element === document.forms.nuance.phoneNum){
      element.value = "888-123-4567";
      element.style.cssText = "font-style: italic; opacity: .6; position: relative; padding-left: 5px;";
    }
  };

  if(nameInput.addEventListener || phoneInput.addEventListener){
    nameInput.addEventListener("focus", onFocus, false);
    phoneInput.addEventListener("focus", onFocus, false);
    nameInput.addEventListener("blur", onBlur, false);
    phoneInput.addEventListener("blur", onBlur, false);
  } else if(nameInput.attachEvent || phoneInput.attachEvent){
    nameInput.attachEvent("onfocus", onFocus);
    phoneInput.attachEvent("onfocus", onFocus);
    nameInput.attachEvent("onblur", onBlur);
    phoneInput.attachEvent("onblur", onBlur);
  }

};