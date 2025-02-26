import { isNumber } from "./utils";

type BMI = "Underweight" | "Normal range" | "Overweight" | "Obese"

interface InputValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): InputValues => {
    if (args.length < 4) throw new Error("not enough args");
    if (args.length > 4) throw new Error("too many args");

    if (isNumber(args[2]) && isNumber(args[3]) && Number(args[3]) !== 0) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error("provided values were not valid numbers")
    } 
}

const calculateBmi = (height: number, weight: number): BMI => {

    const value = parseFloat((weight / ((height / 100) ** 2)).toFixed(1))
    
    if (value < 18.5) {
        return "Underweight"
    } else if (value >= 18.5 && value <= 24.9) {
        return "Normal range"
    } else if (value >= 25 && value <= 28.9) {
        return "Overweight"
    } else {
        return "Obese"
    }
} 

if (require.main === module) {
    try {
        const { value1, value2 } = parseArguments(process.argv)
        console.log(calculateBmi(value1, value2))
    } catch (error: unknown) {
        let errorMessage = "something went wrong"
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message
        }
        console.log(errorMessage)
    }

}

export default calculateBmi