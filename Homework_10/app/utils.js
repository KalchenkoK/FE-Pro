
const STDIN = (function () {
  return {
    getOperationInput(message, validation, coerce) {
      let input;
      do {
        const beforeAssign = prompt(message);
        input = coerce ? coerce(beforeAssign) : beforeAssign;
      } while (validation(input));
      return input;
    },
  };
})();

const DATE = (function () {
  return {
    getMaxDay(year, month) {
      let maxDay =
        month === 4 || month === 6 || month === 9 || month === 11 ? 30 : 31;
      
      if (this.getLeap(year) && month === 2) {
        maxDay = 29;
      } else if (!this.getLeap(year) && month === 2) {
        maxDay = 28;
      }
      return maxDay;
    },

    getLeap(year) {
      let moduleOf400 = year % 400 === 0;
      let moduleOf100 = year % 100 === 0;
      let moduleOf4 = year % 4 === 0;

      let leap =
        moduleOf400 || (!moduleOf100 && moduleOf4) ? true : false;
      return leap;
    },

      getZodiac(month, day) {
      if (
        (month === 1 && day >= 20) ||
        (month === 2 && day <= 18)
      ) {
        zodiacIcon = "♒";
        zodiacName = "Auqarius";
      } else if (
        (month === 2 && day >= 19) ||
        (month === 3 && day <= 20)
      ) {
        zodiacIcon = "♓";
        zodiacName = "Pisces";
      } else if (
        (month === 3 && day >= 21) ||
        (month === 4 && day <= 19)
      ) {
        zodiacIcon = "♈";
        zodiacName = "Aries";
      } else if (
        (month === 4 && day >= 20) ||
        (month === 5 && day <= 20)
      ) {
        zodiacIcon = "♉";
        zodiacName = "Taurus";
      } else if (
        (month === 5 && day >= 21) ||
        (month === 6 && day <= 20)
      ) {
        zodiacIcon = "♊";
        zodiacName = "Gemini";
      } else if (
        (month === 6 && day >= 21) ||
        (month === 7 && day <= 22)
      ) {
        zodiacIcon = "♋";
        zodiacName = "Canser";
      } else if (
        (month === 7 && day >= 23) ||
        (month === 8 && day <= 22)
      ) {
        zodiacIcon = "♌";
        zodiacName = "Leo";
      } else if (
        (month === 8 && day >= 23) ||
        (month === 9 && day <= 22)
      ) {
        zodiacIcon = "♍";
        zodiacName = "Virgo";
      } else if (
        (month === 9 && day >= 23) ||
        (month === 10 && day <= 22)
      ) {
        zodiacIcon = "♎";
        zodiacName = "Libra";
      } else if (
        (month === 10 && day >= 23) ||
        (month === 11 && day <= 21)
      ) {
        zodiacIcon = "♏";
        zodiacName = "Scorpio";
      } else if (
        (month === 11 && day >= 22) ||
        (month === 12 && day <= 21)
      ) {
        zodiacIcon = "♐";
        zodiacName = "Sagittarius";
      } else {
        zodiacIcon = "♑";
        zodiacName = "Capricorn";
      }
      return [zodiacIcon, zodiacName];
    }
  };
})();

const archiveFabric = function () {
  const entries = [];
  return {
    add(item) {
      entries.push(item);
      
    },
    delete(index) {
      const deleted = entries.slice(index, 1);
      return deleted[0];
    },
    find(index) {
      return entries.find(index);
    },
    filter(index) {
      return entries.filter(index);
    },
    each(cb){
      entries.forEach(cb);
    },
    take(from, to){
      return entries.slice(from, to);
    },
    isEmpty() {
      return entries.length <= 0;
    },
    count() {
      return entries.length;
    },
  };
};

const usersFabric = function (firstName, lastName, year, month, day) {
  return {
    firstName,
    lastName,
    year,
    month,
    day,
    get fullName() {
      return `${firstName} ${lastName}`;
    },

    get age() {
      let birthDate = new Date();
      birthDate.setFullYear(year);
      birthDate.setMonth(month - 1);
      birthDate.setDate(day);
      let age = date.getFullYear() - birthDate.getFullYear();
      let m = date.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && date.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  };
};
