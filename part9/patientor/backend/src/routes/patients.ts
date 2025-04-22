import express, {Request, Response, NextFunction} from "express"; 
import patientService from "../services/patientService";
import { NewPatientSchema, toNewEntry } from "../utils";
import { NewPatient, Patient } from "../types";
import { z } from "zod";

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues }); 
    } else {
        next(error);
    }
};

router.get("/", (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
    res.send(patientService.getNonSensitivePatient((req.params.id)));
});

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
});

router.post("/:id", (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(req.params.id, newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
});

router.use(errorMiddleware);

export default router;
