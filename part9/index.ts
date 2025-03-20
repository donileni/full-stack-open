import express from "express";
import calculateBmi from "./bmiCalculator";
import { isNumber } from "./utils";
const app = express(); 

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

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});

