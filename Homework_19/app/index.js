const form = document.forms.login;
const emailValue = form.email;
const paswordValue = form.password;
const submitButton = form.querySelector('[type="submit"]');
const root = document.querySelector("#root");
const state = {};
const emailAdmin = "admin@example.com";
const passwordAdmin = "admin";
const user = document.querySelector("span");
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
};
const handleSubmit = (event) => {
  event.preventDefault();
  if (emailValue.value === emailAdmin && paswordValue.value === passwordAdmin) {
    change();
    user.innerHTML = emailValue.value;
    if (form.remember.checked) {
      document.cookie = `${emailValue.value}; max-age = ${60 * 60 * 24}`;
    }
  }
};
// document.cookie = `admin@example.com; max-age = -1`;
const change = () => {
  user.innerHTML = document.cookie;
  const hiddenSection = root.lastElementChild;
  const section = root.firstElementChild;
  section.hidden = true;
  hiddenSection.hidden = false;
};
const ready = () => {
  if (document.cookie) {
    return change();
  }
};
ready();

form.addEventListener("change", handleEvent);
form.addEventListener("submit", handleSubmit);
