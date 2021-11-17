
const minYear = 1900;
let date = new Date();
const minMonth = 1;
const maxMonth = 12;
const minName = 1;
const maxName = 20;
const minSecondName = 1;
const maxSecondName = 30;
const minDay = 1;


const zeroUser = "There are no users to delete";
const validationMessageMaxYear = `Put max YEAR of birth to show: only numbers, min: ${minYear}, max: ${date.getFullYear()}`;
const operation_message = `Enter operation: 
0 - Add user,
1 - Delete user,
2 - Find user,
3 - Filtered user,
4 - Show adult users,
5 - Show a slice of users,
6 - Is archive empty?,
7 - How many users are in the archive`;
