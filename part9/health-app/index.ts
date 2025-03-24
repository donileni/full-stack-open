import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculateExercises, ExerciseRequest } from "./exerciseCalculator";
import { isNumber } from "./utils";
const app = express(); 
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query;

    if (!req.query.height || !req.query.weight || !isNumber(height) || !isNumber(weight)) {
        res.status(400).json({ error: "malformatted parameters"});
    }

    const bmi = (calculateBmi(Number(height), Number(weight)));

    res.status(200).json({ height: Number(height), weight: Number(weight), bmi});
});

app.post("/exercises", (req, res) => {
    const request = req.body as ExerciseRequest;

    if (!request.dailyExercises || !request.target) {
        res.status(400).json({ error: "parameters missing"});
    }

    if (!request.dailyExercises.every(number => typeof number === "number") || !isNumber(request.target)) {
        res.status(400).json({ error: "malformatted parameters"});
    }

    try {
        const result = calculateExercises(request.dailyExercises, request.target);
        res.status(200).json(result);
    } catch (error: unknown) {
        let errorMessage = "something went wrong";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).json({ error: errorMessage});
    }

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});

