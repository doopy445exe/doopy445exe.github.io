/**
 * Kalkylator – komplett implementation
 */

let lcd = null;          // displayen
let memory = 0;          // sparat värde
let arithmetic = null;   // vald operator
let isComma = false;     // om decimaltecken redan används
let newNumber = true;    // om nästa siffra ska börja ny inmatning

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard');
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för tangentbordet
 */
function buttonClick(e) {
    let btn = e.target.id;
    if (!btn) return;

    // Siffertangenter (b0–b9)
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1);
        addDigit(digit);
        return;
    }

    // Övriga tangenter
    switch (btn) {
        case 'comma':
            addComma();
            break;
        case 'add':
            setOperator('+');
            break;
        case 'sub':
            setOperator('-');
            break;
        case 'mul':
            setOperator('*');
            break;
        case 'div':
            setOperator('/');
            break;
        case 'enter':
            calculate();
            break;
        case 'clear':
            memClear();
            break;
    }
}

/**
 * Lägg till siffra på display
 */
function addDigit(digit) {
    if (newNumber) {
        lcd.value = digit;
        newNumber = false;
    } else {
        lcd.value += digit;
    }
}

/**
 * Lägg till decimaltecken (,)
 */
function addComma() {
    if (!isComma) {
        if (newNumber) {
            lcd.value = "0,";
            newNumber = false;
        } else {
            lcd.value += ",";
        }
        isComma = true;
    }
}

/**
 * Spara operator (+ - * /)
 */
function setOperator(operator) {
    // Om det redan finns en operator → räkna först
    if (arithmetic !== null && !newNumber) {
        calculate();
    }

    memory = getDisplayNumber();
    arithmetic = operator;
    newNumber = true;
    isComma = false;
}

/**
 * Beräkna resultat
 */
function calculate() {
    if (arithmetic === null) return;

    let current = getDisplayNumber();
    let result = memory;

    switch (arithmetic) {
        case '+':
            result = memory + current;
            break;
        case '-':
            result = memory - current;
            break;
        case '*':
            result = memory * current;
            break;
        case '/':
            if (current === 0) {
                lcd.value = "Error";
                memClear();
                return;
            }
            result = memory / current;
            break;
    }

    showNumber(result);
    arithmetic = null;
    memory = result;
    newNumber = true;
}

/**
 * Hämta tal från display (konvertera , → .)
 */
function getDisplayNumber() {
    if (!lcd.value) return 0;
    return parseFloat(lcd.value.replace(',', '.'));
}

/**
 * Visa tal på display (konvertera . → ,)
 */
function showNumber(num) {
    let text = num.toString().replace('.', ',');
    lcd.value = text;
    isComma = text.includes(',');
}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
}

/** Reset */
function memClear() {
    memory = 0;
    arithmetic = null;
    newNumber = true;
    clearLCD();
}

window.onload = init;