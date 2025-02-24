import { isNumber } from "./utils"

interface Result {
    periodLenght: number
    trainingDays: number
    success: boolean
    rating: 1 | 2 | 3
    ratingDescription: "you need to do better" | "not too bad by could be better" | "excellent work"
    target: number
    average: number
}

interface InputValues {
    target: number;
    numbers: number[];
}

const parseArguments = (args: string[]): InputValues => {
    if (args.length < 4) throw new Error("not enough args");
    if (Number(args[2]) > 3 || Number(args[2]) < 1 || !isNumber(args[2])) throw new Error("target must be a number between 1 and 3");
    console.log("args 2: ", args[2])
    const target = Number(args[2])
    const numbers = []
    
    for (let i = 3; i < args.length; i++) {
        if (isNumber(args[i])) {
            numbers.push(Number(args[i]))
        } else {
            throw new Error("provided values were not valid numbers")
        }
    }

    return { target, numbers }
}

const calculateExercises = (weeklyExercise: number[], target: number): Result => {
    const periodLenght = weeklyExercise.length
    const trainingDays = weeklyExercise.filter((number) => number !== 0).length
    const trainingtime = weeklyExercise.reduce((sum, number) => sum + number, 0)
    const average = trainingtime / periodLenght
    const trainigTarget = target
    let rating: 1 | 2 | 3 
    let ratingDescription: "you need to do better" | "not too bad by could be better" | "excellent work";

    if (average < 1) {
        rating = 1
    } else if (average >= 1 && average < 2) {
        rating = 2
    } else if (average >= 2) {
        rating = 3
    }

    if (rating === 1) {
        ratingDescription = "you need to do better"
    } else if (rating === 2) {
        ratingDescription = "not too bad by could be better"
    } else if (rating === 3) {
        ratingDescription = "excellent work"
    }

    return {
        periodLenght: periodLenght,
        trainingDays: trainingDays,
        success: rating >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: trainigTarget,
        average: average
    }
}

try {
    const {target, numbers} = parseArguments(process.argv)
    console.log(calculateExercises(numbers, target))
} catch (error: unknown) {
    let errorMessage = "something went wrong"
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message
    }
    console.log(errorMessage)
}