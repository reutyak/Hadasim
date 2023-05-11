import { ResourceNotFoundError, ValidationError } from "../4-models/client-errors";
import { CoronaModel, ICoronavirusModel } from "../4-models/coronavirus-model";
import Vaccine from "../4-models/vaccine-model";

//Receiving the corona information of all members
async function getAllCorona():Promise<ICoronavirusModel[]> {
    return await CoronaModel.find().exec();
}

//Receiving the corona information of one member by id
async function getOneCorona(myId:string):Promise<ICoronavirusModel> {
    //find specific 
    const corona =await CoronaModel.find({id:myId}).exec();
    //If not exists, return error
    if(!corona) throw new ResourceNotFoundError(myId);
    //If exists return 
    return corona[0];
}

// Add corona information of new member:
async function addCorona(corona: ICoronavirusModel): Promise<ICoronavirusModel> {
    // Validate: 
    const errors = corona.validateSync();
    if (errors) throw new ValidationError(errors.message);    
    //save to the DB
    await corona.save();
    return corona._id;
};

//Updating the vaccination details of a single member 
async function updateVaccine(vaccine:Vaccine):Promise<Vaccine>{
    //Checking if a member exists in the system
    const myCorona = getOneCorona(vaccine.id);
    if(!myCorona) throw new ResourceNotFoundError(vaccine.id);
    //Check if the member received 4 vaccinations
    if((await myCorona).vaccines.length>3){
        throw new ValidationError("Maximum number of corona vaccines is 4");
    }
    //if exists and not received
    await CoronaModel.updateOne({id:vaccine.id},{$push: {vaccines: vaccine },$set:{vaccinated:true}})
    return vaccine
}

//Update on receiving a positive result for Corona 
async function updatePositive(id:string, positive:string, recuperation:string ):Promise<boolean>{
    //Checking if a member exists in the system
    const myCorona = getOneCorona(id);
    if(!myCorona) throw new ResourceNotFoundError(id);
    //if exists
    await CoronaModel.updateOne({id:id},{positive_result: new Date(positive), recuperation:new Date(recuperation)})
    return true
}

//Receiving the number of vaccinated from all members
async function getVaccinated():Promise<number>{
    const vaccinated =await CoronaModel.find({vaccinated:true}).exec();
    const num = vaccinated.length
    return num
}

//Receiving a number of active patients on a specific date from all members
async function getActivePatients(date:string):Promise<number>{
    const active =await CoronaModel.find({recuperation: { $gt: new Date(date) },positive_result:{$lt: new Date(date)}}).exec();
    const num = active.length
    return num
}

export default {
    getAllCorona,
    getOneCorona,
    addCorona,
    updateVaccine,
    updatePositive,
    getVaccinated,
    getActivePatients
}