import axios from "axios";
import appConfig from "../Utils/AppConfig";
import Coronavirus from "../Models/coronavirus-model";
import Vaccine from "../Models/vaccine-model";

class CoronaService {

public async addCorona(corona:Coronavirus ): Promise<string> {
    const response = await axios.post(appConfig.coronaUrl, corona);
    const addedCorona = response.data;
    return addedCorona
};

public async getAllVaccinated():Promise<number>{
    const response = await axios.get(appConfig.coronaUrl+"vaccinated");
    return response.data
};

public async getActivePatients(date:string):Promise<number>{
    const response = await axios.get(appConfig.coronaUrl+`active/${date}`);
    const num = response.data
    return num
};

public async updateCorona(id:string,positive:string,rec:string):Promise<any>{
    const response = await axios.put(appConfig.coronaUrl+`${id}/${positive}/${rec}`)
    return response.data
};

public async addVaccine(vaccine:Vaccine):Promise<any>{
    const response = await axios.put(appConfig.coronaUrl, vaccine);
    const newVaccine = response.data;
    return newVaccine
};
}

const coronaService = new CoronaService();

export default coronaService;
