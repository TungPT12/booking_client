const isEmptyInput = (input) => {
    if (input.trim()) {
        return true;
    }
    return false;
}
const isZeroInput = (input) => {
    input = parseFloat(input)
    if (input > 0) {
        return true;
    }
    return false;
}
const isZeroInputInt = (input) => {
    input = parseInt(input)
    if (input > 0) {
        return true;
    }
    return false;
}

const isShowWarning = (isValid, isTouch) => {
    if (isTouch) {
        if (isValid === false) {
            return true;
        }
    }
    return false
}

const isEmptySelect = (input) => {
    if (input !== 'none' || input === '') {
        return true;
    }
    return false;
}

const isValidInputRooms = (input) => {
    try {
        if (input) {
            const roomNumbers = input.split(',').map((number) => {
                return parseInt(number.trim());
            })
            if (roomNumbers.includes(NaN)) {
                return false;
            }
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

const validatedEmail = (input) => {
    let pattern = /^[a-zA-z0-9]+@([a-z]+.)+[\w-]{2,4}$/;
    if (input.trim()) {
        let result = pattern.test(input);
        return result;
    }
    return false;

}

const validPassword = (input) => {
    if (input.trim().length >= 8) {
        return true;
    }
    return false;
}

const validatePhoneNumber = (phone) => {
    const pattern = /^\d{10,11}$/
    const isPhone = pattern.test(phone)
    if (isPhone) {
        return true
    }
    return false;
}

const validateVisa = (cardNumber) => {
    const pattern = /^\d{16}$/
    const isCardNumber = pattern.test(cardNumber)
    if (isCardNumber) {
        const numbers = cardNumber.split('').map((number, index) => {
            if (index % 2 === 0) {
                number = parseInt(number)
                if ((number * 2) > 9) {
                    const numberThan9s = ((number * 2).toString()).split('').map((numberThan9) => {
                        return parseInt(numberThan9);
                    });
                    return numberThan9s.reduce((sum, numberThan9) => {
                        return sum + numberThan9
                    }, 0)
                }
                return number * 2;
            }
            return parseInt(number);
        })
        console.log(numbers)
        const sumNumberCard = numbers.reduce((sum, number) => {
            console.log(sum + " + " + number)
            return sum + number;
        }, 0)
        console.log(sumNumberCard)
        if (sumNumberCard % 10 === 0) {
            return true;
        }
    }
    return false;
}


export {
    isEmptyInput,
    isShowWarning,
    isEmptySelect,
    isZeroInput,
    isZeroInputInt,
    isValidInputRooms,
    validatedEmail,
    validatePhoneNumber,
    validPassword,
    validateVisa
}