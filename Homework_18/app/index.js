const form = document.forms.form;
const emailValue = form.email;
const passwordValue = form.password;
const submitButton = form.submitButton;
 const state = {};

const validation = {
  email: (value) => !value.includes("@"),
  password: (value, mail) =>
    value.length < 9 || value.length > 24 || value === mail.email,
  passwordConfirm: (value, rest) => rest.password !== value,
  consent: (checked) => !checked,
};

const isErrors = {
  email: true,
  password: true,
  passwordConfirm: true,
  consent: true,
};

const handleEvent = (event) => {
  const { type, name, value, checked } = event.target;
  switch (type) {
    case "checkbox":
      state[name] = checked;
      break;

    default:
      state[name] = value;
      break;
  }

  isErrors[name] =
    name in validation ? validation[name](state[name], state) : false;
  event.currentTarget.submitButton.disabled = Object.keys(isErrors).some(
    (key) => isErrors[key]
  );
};

// const handleFocusOut = (event) => {
//   event.currentTarget.submitButton.disabled = !state.consent;
// };
const handleSubmit = (event) => {
  event.preventDefault();
  const outTag = document.createElement("output");

  outTag.innerHTML = `email: ${emailValue.value}, password: ${passwordValue.value}`;
  form.after(outTag);
};
form.addEventListener("focusout", handleEvent);
form.addEventListener("submit", handleSubmit);
// submitButton.addEventListener('click', () => {
// 	form.requestSubmit();
// });
