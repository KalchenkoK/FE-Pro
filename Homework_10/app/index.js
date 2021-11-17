const APPLICATION = (() => {
  const archive = archiveFabric(),
    OPERATIONS = [
      ["Add user", "addUser"],
      ["Delete user", "delete"],
      ["Find user", "find"],
      ["Filtered user", "filter"],
      ["Show adult users", "each"],
      ["Show users slice", "take"],
      ["Is archive empty?", "isEmpty"],
      ["How many users in archive", "count"],
    ];
  const validationOperationName = function (input) {
    input = input ?? "";
    return input.trim().length < minName || input.trim().length > maxName;
  };

  return {
    run() {
      do {
        console.clear();
        const operationIndex = this.getOperation();
        this.doOperation(operationIndex);
      } while (confirm("Do you want to retry?"));
      this.end();
    },

    doOperation(index) {
      const [, methodName] = OPERATIONS[index];
      if (typeof this[methodName] === "function") {
        this[methodName]();
      }
    },

    getOperation() {
      const availables = Object.keys(OPERATIONS);
      const validationOperation = (input) => {
        return !availables.includes(input);
      };

      coerceAgeToNumber = (beforeAssign) => {
        return Number(beforeAssign);
      };

      return STDIN.getOperationInput(operation_message, validationOperation);
    },

    end() {
      console.log("Bye bye");
    },

    addUser() {
      const validationMessageName = `Put your first name:  min: ${minName}, max: ${maxName}`;
      const firstName = STDIN.getOperationInput(
        validationMessageName,
        validationOperationName
      );

      const validationMessageSecondName = `Put your second name:  min: ${minSecondName}, max: ${maxSecondName}`;
      const validationOperationSurname = function (input) {
        input = input ?? "";
        return (
          input.trim().length < minSecondName ||
          input.trim().length > maxSecondName
        );
      };
      const lastName = STDIN.getOperationInput(
        validationMessageSecondName,
        validationOperationSurname
      );

      const validationOperationYear = function (input) {
        return isNaN(input) || input < minYear || input > date.getFullYear();
      };

      const validationMessageYear = `Put your YEAR of birthday: only numbers, min: ${minYear}, max: ${date.getFullYear()}`;

      const year = STDIN.getOperationInput(
        validationMessageYear,
        validationOperationYear,
        coerceAgeToNumber
      );

      const validationMessageMonth = `Put your MONTH of birthday: only numbers, min: ${minMonth}, max: ${maxMonth}`;
      const validationOperationMonth = function (input) {
        return isNaN(input) || input < minMonth || input > maxMonth;
      };
      const month = STDIN.getOperationInput(
        validationMessageMonth,
        validationOperationMonth,
        coerceAgeToNumber
      );

      let leap = DATE.getLeap(year);
      let maxDay = DATE.getMaxDay(year, month);

      const validationMessageDay = `Put your DAY of birthday: only numbers, min: ${minDay}, max: ${maxDay}`;
      const validationOperationDay = function (input) {
        return isNaN(input) || input < minDay || input > maxDay;
      };
      const day = STDIN.getOperationInput(
        validationMessageDay,
        validationOperationDay,
        coerceAgeToNumber
      );

      const user = usersFabric(firstName, lastName, year, month, day);

      archive.add(user);
    },
    delete() {
      const validationOperationDelete = function (input) {
        return isNaN(input) || input < 0 || input >= archive.count();
      };

      if (archive.isEmpty() === true) {
        console.log("Archive is empty");
        return;
      } else {
        const deleteUser = STDIN.getOperationInput(
          `Enter index for delete from 0 to ${archive.count() - 1}`,
          validationOperationDelete,
          coerceAgeToNumber
        );
        const deleted = archive.delete(deleteUser);
        console.log(
          `You deleted user ${deleted.fullName}, ${deleted.age} years old`
        );
      }
    },
    find() {
      const findUserMessage = "Enter name of user you want find";
      const findUser = STDIN.getOperationInput(
        findUserMessage,
        validationOperationName
      );

      const findUserName = function (user) {
        return user.firstName === findUser;
      };
      const finded = archive.find(findUserName);

      if (finded) {
        console.log(
          `You find user: ${finded.fullName}, ${finded.age} years old`
        );
      } else {
        console.log(`There is no user whith first name ${findUser}`);
      }
    },
    filter() {
      const filterUserMessage = "Enter name of users you want filtered";
      const filterUser = STDIN.getOperationInput(
        filterUserMessage,
        validationOperationName
      );

      const filterUserName = function (user) {
        return user.firstName === filterUser;
      };
      const filtered = archive.filter(filterUserName);

      if (filtered.length > 0) {
        for (let i of filtered) {
          console.log(`Your filtered users: ${i.fullName} ${i.age} years old`);
        }
      } else {
        console.log(`There are no users whith name ${filterUser}`);
      }
    },
    each() {
      if (archive.count() <= 0) {
        console.log("Archive is empty");
      } else {
        const adultUser = function (user) {
          if (user.age >= 18) {
            return console.log(`${user.fullName}, ${user.age} years old`);
          } else {
            console.log(`${user.fullName} - younger 18`);
          }
        };
        const eachUsers = archive.each(adultUser);
      }
    },
    take() {
      const takeMessage1 = `Enter first index of users, from 0 to ${archive.count()}`;
      const takeMessage2 = `Enter second index of users, from 0 to ${archive.count()}`;
      const validationOperationTake = function (input) {
        return isNaN(input) || input < 0 || input > archive.count();
      };

      const firstIndex = STDIN.getOperationInput(
        takeMessage1,
        validationOperationTake,
        coerceAgeToNumber
      );

      const secondIndex = STDIN.getOperationInput(
        takeMessage2,
        validationOperationTake,
        coerceAgeToNumber
      );

      const takeUser = archive.take(firstIndex, secondIndex);
      if (takeUser.length > 0) {
        for (let i of takeUser) {
          console.log(`Your sliced users: ${i.fullName} ${i.age} years old`);
        }
      } else {
        console.log(`There are no users whith this index`);
      }
    },
    isEmpty() {
      const status = archive.isEmpty();

      if (status === true) {
        console.log("Archive is empty");
      } else {
        console.log(`No, arhive is not empty`);
      }
    },
    count() {
      const countUser = archive.count();
      console.log(`There are ${countUser} user(s) in the archive`);
    },
  };
})();
APPLICATION.run();
