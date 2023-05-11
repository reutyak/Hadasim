import express, { Request, Response, NextFunction } from "express";
import coronaServices from "../5-services/corona-services";
import { CoronaModel } from "../4-models/coronavirus-model";
import { ResourceNotFoundError } from "../4-models/client-errors";

const router = express.Router(); 

//Receiving the corona information of all members - http://localhost:4001/api/corona/
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allCorona =await coronaServices.getAllCorona();
        response.json(allCorona);
    }
    catch (err: any) {
        next(err);
    }
});

//Receiving the corona information of one member by id - http://localhost:4001/api/corona/single/:id
router.get("/single/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const corona =await coronaServices.getOneCorona(id);
        if(!corona) throw new ResourceNotFoundError(id);
        response.json(corona);
    }
    catch (err: any) {
        next(err);
    }
});

// Add corona information of new member - http://localhost:4001/api/corona/
router.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const newCorona = new CoronaModel(request.body);
        const corona =await coronaServices.addCorona(newCorona);
        response.json(corona);
    }
    catch (err: any) {
        next(err);
    }
});

//Updating the vaccination details of a single member - http://localhost:4001/api/corona/
router.put("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const newVaccine = request.body;
        const corona = await coronaServices.updateVaccine(newVaccine);
        response.json(corona);

    }
    catch (err: any) {
        next(err);
    }
});

//Update on receiving a positive result for Corona - http://localhost:4001/api/corona/:id/:positive/:rec
router.put("/:id/:positive/:rec", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const positive = request.params.positive;
        const rec = request.params.rec;
        const corona = await coronaServices.updatePositive(id,positive,rec);
        response.json(corona);

    }
    catch (err: any) {
        next(err);
    }
});

//Receiving the number of vaccinated from all members - http://localhost:4001/api/corona/vaccinated
router.get("/vaccinated", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allVaccinated =await coronaServices.getVaccinated();
        response.json(allVaccinated);
    }
    catch (err: any) {
        next(err);
    }
});

//Receiving a number of active patients on a specific date from all members - http://localhost:4001/api/corona/active/:date
router.get("/active/:date", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const date = request.params.date;
        const allActive =await coronaServices.getActivePatients(date);
        response.json(allActive);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
