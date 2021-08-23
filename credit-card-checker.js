// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// An array of all invalid arrays above
const invalidBatch = [invalid1, invalid2, invalid3, invalid4, invalid5];


const validateCred = (array) => {

    let lastDigit = array[array.length-1];
    
    // Get all the digites array except the last digit
    let tempArr = array.slice(0,array.length-1);
    // Reverse this array for easy calculation
    tempArr.reverse();
    
    //Loop through the temporary array
    for (let i = 0; i < tempArr.length; i++) {
        //Double the digit that in even position and check if the result if bigger than 9. Digit in odd position will stay the same
        if (i % 2 === 0) {
            let doubleDigit = tempArr[i]*2;
            if (doubleDigit > 9) {
                tempArr[i] = doubleDigit - 9;
            } else {
                tempArr[i] = doubleDigit;
            }
        }
    }
    // Push the last digit in the original array to the temporary array
    tempArr.push(lastDigit);

    //Sum all the digits in the temporary array and check modulo by 10
    let sumAllDigits = tempArr.reduce((a,b) => a+b);
    if (sumAllDigits % 10 !== 0) {
        return false;
    }

    return true;
};

// findInvalidCards function.

const findInvalidCards = nestedArray => nestedArray.map(array => validateCred(array));


//Create 
const companies = {
    'Amex (American Express)' : 3,
    'Visa': 4,
    'Mastercard' : 5,
    'Discover' :6,
};

const inInvalidCardCompanies = nestedArrayInvalid => {
    let resultArr = [];
    let valueOfCompanies = Object.values(companies);
    

    // Loop through the array in the nested Array
    for (let array of nestedArrayInvalid) {
        //Check if the first digit have values within the companies Object
        if (valueOfCompanies.includes(array[0])) {

            // If yes, loop through the key in companies and push the key to the object
            for (let key in companies) {
                if (array[0] === companies[key]) {
                    resultArr.push(key);
                }
            }
        } else {
            resultArr.push('Company Not Found');
        }
    }

    // Remove Duplicate and Return the Result
    return resultArr.filter((element, index, array) => array.indexOf(element) === index)
};


//Call all the created functions
console.log(validateCred(valid1));
console.log(validateCred(valid2));
console.log(validateCred(valid3));
console.log(validateCred(valid4));
console.log(validateCred(valid5));
console.log(validateCred(invalid1));
console.log(validateCred(invalid2));
console.log(validateCred(invalid3));
console.log(validateCred(invalid4));
console.log(validateCred(invalid5));

console.log(findInvalidCards(batch));

console.log(inInvalidCardCompanies(invalidBatch));
