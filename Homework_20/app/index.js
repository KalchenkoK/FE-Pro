const load = (function () {
  setInterval(function () {
    const hour = new Date().getHours();
    document.querySelector(".hour").innerHTML = hour < 10 ? "0" + hour : hour;

    const minute = new Date().getMinutes();
    document.querySelector(".minute").innerHTML =
      minute < 10 ? "0" + minute : minute;

    const second = new Date().getSeconds();

    document.querySelector(".second").innerHTML =
      second < 10 ? "0" + second : second;
  });
})();
const alarm = document.querySelector(".alarm");
const button = document.querySelector(".button");
const btnAlarm = document.querySelector(".alarmSet");
const timer = document.querySelector(".timer");
const handleButton = (event) => {
  const clock = document.querySelector(".clock");
  timer.hidden = true;
  // clock.hidden = true
  alarm.hidden = false;
};
const handleAlarm = (event) => {
  const inputHour = document.getElementById("inpHour");
  const inputMin = document.getElementById("inpMin");
  const h = inputHour.value;
  const m = inputMin.value;
  // const x = new Date();
  // x.setHours(h);
  // x.setMinutes(m);
  // console.log(x)
  const now = new Date();
  let time =
    inputHour.value * 60 * 60 * 1000 +
    inputMin.value * 60 * 1000 -
    (now.getHours() * 60 * 60 * 1000 + now.getMinutes() * 60 * 1000);

  if (time < 0) {
    time = -time;
  }
  console.log(time);
  const check = document.getElementById("check");

  timer.hidden = false;
  alarm.hidden = true;
  const hour = inputHour.value;
  const min = inputMin.value < 10 ? "0" + inputMin.value : inputMin.value;
  timer.innerHTML = `Alarm at: ${hour} : ${min}`;
  if (check.checked) {
    console.log(check.checked);
    let repeat = setTimeout(function rep() {
      alert("GET UP!!");
      console.log(time);
      repeat = setTimeout(rep, 24 * 60 * 60 * 1000);
    }, time);
    timer.innerHTML = `Alarm at: ${hour} : ${min} EVERY DAY`;
  } else {
    const alarmTime = setTimeout(() => alert("GET UP!!"), time);
  }
};

button.addEventListener("click", handleButton);
btnAlarm.addEventListener("click", handleAlarm);
