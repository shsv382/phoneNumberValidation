// required <input type='text' class='phoneNumberValidation' />
const phoneFields = document.querySelectorAll('.phoneNumberValidation');

const phoneFormat = function(e) {
  let content = e.target.value;
  if(!content) return;
  
  // symbol validations, digits only
  content = Array.from(content).filter(ltr => ltr.charCodeAt(0) > 47 && ltr.charCodeAt(0) < 58);
  
  // country code "+7"
  switch(content[0]) {
    case "8":
      content[0] = "7";
      break;
    case "9":
      content.unshift("7");
      break;
    default:
      break;
  }
  
  let [
    countryCode, 
    operatorCode, 
    number3, 
    number21, 
    number22] = [
      content[0], 
      content.slice(1,4).join(''), 
      content.slice(4,7).join(''),
      content.slice(7,9).join(''),
      content.slice(9,11).join('')
  ]

  !content.length ? 
      e.target.value = '' :
  // division
      e.target.value = countryCode.length ? `+${countryCode}` : '';
      if(operatorCode.length) e.target.value += `(${operatorCode}`;
      if(number3.length) e.target.value += `)${number3}`;
      if(number21.length) e.target.value += `-${number21}`;
      if(number22.length) e.target.value += `-${number22}`;
}

for(let i=0; i<phoneFields.length; i++) {
  phoneFields[i].oninput = (e) => phoneFormat(e)
}
