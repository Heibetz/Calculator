/**
 * @author Hank Heiselbetz
 * JavaScript Calculator Using HTML, CSS, JavaScript
 * This is a basic JavaScript Calculator that performs simple operations 
 */

/**
 * Class Calculator
 * Contains all the numbers, and calculations
 * for the calcutor, and how they are displayed
 */
class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    /**
     * Clears the entire calculator when clear buttons is pressed
     */
    clear(){
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    /**
     * Deletes the last input in the calculator
     */
    delete(){
        //Takes all the characters except the last one
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    /**
     * Append number adds a number or perios to the end of the current number
     * @param number 
     */
    appendNumber(number){
        //Ensure that there isn't multiple periods
        if(number === '.' && this.currentOperand.includes('.')) return
        //adds the numbers in strings
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    /**
     * Saves the operation to the calculator
     * @param operation 
     */
    chooseOperation(operation){
        //Check to make sure that when a Operation is pressed there is something in the current operand
        if(this.currentOperand === "") return
        if(this.previousOperand !== ""){
            this.compute()
        }
        this.operation = operation
        //Make Previous Operand = to current
        this.previousOperand = this.currentOperand
        //set current to an empty string
        this.currentOperand = ""
    }

    /**
     * Uses a fast switch statement to do a calculation and updates the 
     * screen by setting computation to the current operand
     */
    compute(){
        let computation //What is being added
        const prev = parseFloat(this.previousOperand) //Change to float to do calculation
        const cur = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(cur)) return //Makes sure they are both numbers

        //Switch operation to check which operation is pressed
        switch (this.operation){
            case '+': 
                computation = prev + cur
                break
            case '-':
                computation = prev - cur
                break
            case '/':
                computation = prev / cur
                break
            case '*':
                computation = prev * cur
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }

    /**
     * Updates the calculators display
     */
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null ) {
            this.previousOperandTextElement.innerText = 
             `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = ""
        }
    }

    /**
     * getDisplayNumber adds commas to the current and previous operations
     * This function is called in updateDisplay
     * @param number
     */
    getDisplayNumber(number){
        const stringNumber = number.toString() //Converts the number to a string
        //Integer digits are converted to float
        const integerDigits = parseFloat(stringNumber.split('.')[0]) 
        //Decimal digits can't be converted to float because they can lead with multiple 0's
        const decimalDigits = stringNumber.split('.')[1] 
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ""
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }
        else {return integerDisplay}
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})