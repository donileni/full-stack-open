
type BMI = "Underweight" | "Normal range" | "Overweight" | "Obese"

const calculateBmi = (height: number, weight: number): BMI => {

    const value = parseFloat((weight / ((height / 100) ** 2)).toFixed(1))
    console.log("value: ", value);
    

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


console.log(calculateBmi(180, 95))