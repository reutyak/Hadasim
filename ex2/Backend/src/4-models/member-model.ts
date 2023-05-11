import { UploadedFile } from "express-fileupload";
import { Document, Schema, model } from "mongoose";
import { CoronaModel } from "./coronavirus-model";

export interface IMemberModel extends Document {
    first_name: string;
    last_name: string;
    id: string;
    picture: UploadedFile,
    picture_name:string,
    city: string;
    street: string;
    home_number: number;
    date_birth:Date;
    phone: string;
    cellular:string;
}

export const MemberSchema = new Schema<IMemberModel>({
    first_name: {
        type: String,
        minlength: [2, "First name must be minimum 2 chars"],
        maxlength:[15, "First name must be maximum 15 chars"],
        required: [true, "missing first name"],
        trim: true,
    },
    last_name:{
        type: String,
        minlength: [2, "Last name must be minimum 2 chars"],
        maxlength:[15, "Last name must be maximum 15 chars"],
        required: [true, "missing last name"]
    },
    id: {
        type: String,
        required: [true, "missing id"],
        unique: true
    },
    picture: {
        type: Object
    },
    picture_name:{
        type:String
    },
    city:{
        type: String,
        minlength:[2, "City name must be minimum 2 chars"],
        maxlength:[15, "City name must be maximum 15 chars"],
        required: [true, "missing city"]
    },
    street:{
        type:String
    },
    home_number:{
        type:Number
    },
    date_birth: {
        type: Date,
        required: [true, "missing date of birth"]
    },
    phone: {
        type: String,
        required: [true, "missing phone"]
    },
    cellular:{
        type: String
    },
},{
    versionKey: false,
    selectPopulatedPaths: false,
    toJSON: { virtuals: true },
    toObject: {virtuals: true}
});

MemberSchema.virtual("coronavirus",{
    ref:CoronaModel,
    localField:"id",
    foreignField:"id",
    justOne:true
});

export const MemberModel = model<IMemberModel>("MemberModel", MemberSchema, "members");