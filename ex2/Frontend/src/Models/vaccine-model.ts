class Vaccine{
    public id: string;
    public num_vaccine:number;
    public vaccination_date:Date;
    public manufacturer: string;

    constructor(id:string, num_vaccine:number,vaccination_date:Date,manufacturer: string){
        this.id = id;
        this.num_vaccine = num_vaccine;
        this.vaccination_date = vaccination_date;
        this.manufacturer = manufacturer;
    }
}

export default Vaccine;
