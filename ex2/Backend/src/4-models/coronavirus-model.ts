import Vaccine from "./vaccine-model"
import { Document, Schema, model } from "mongoose";


export interface ICoronavirusModel extends Document {
    id:string;
    positive_result:Date;
    recuperation:Date;
    vaccines:Array<Vaccine>;
    vaccinated:boolean;
}

export const CoronavirusSchema = new Schema<ICoronavirusModel>({
    id:{
        type:String,
        required:true,
        unique: true
    },
    positive_result:{
        type:Date
    },
    recuperation:{
        type:Date
    },
    vaccines:{
        type:[{
            type:Object
        }],
        validate: [arrayLimit, 'exceeds the limit of 4']
    },
    vaccinated:{
        type:Boolean,
        default:false
    }
},{
    versionKey: false
})

function arrayLimit(val) {
    return val.length < 3;
  }

export const CoronaModel = model<ICoronavirusModel>("CoronaModel", CoronavirusSchema, "corona");


