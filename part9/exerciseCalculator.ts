
interface Result {
    periodLenght: number
    trainingDays: number
    success: boolean
    rating: 1 | 2 | 3
    ratingDescription: "you need to do better" | "not too bad by could be better" | "excellent work"
    target: 1 | 2 | 3
    average: number
}

const calculateExercises = (weeklyExercise: number[], target: 1 | 2 | 3): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1, 2], 2))