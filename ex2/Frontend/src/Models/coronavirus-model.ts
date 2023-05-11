class Coronavirus{
    public id:string;
    public positive_result:Date;
    public recuperation:Date;

    constructor(id:string,positive_result:Date,recuperation:Date){
        this.id = id;
        this.positive_result = positive_result;
        this.recuperation = recuperation;
    }
}

export default Coronavirus;
