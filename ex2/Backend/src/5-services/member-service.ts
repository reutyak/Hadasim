import fileHandler from "../2-utils/image-handler";
import { ResourceNotFoundError, ValidationError } from "../4-models/client-errors";
import { IMemberModel, MemberModel } from "../4-models/member-model";

//get all members with the information on corona
async function getAllMembers():Promise<IMemberModel[]> {
    return await MemberModel.find({},{picture:0}).populate("coronavirus").exec();
}

//get one member by id
async function getOneMember(myId:string):Promise<IMemberModel> {
    //find specific member
    const member =await MemberModel.find({id:myId},{picture:0}).populate("coronavirus").exec();
    //If member not exists, return error
    if(!member) throw new ResourceNotFoundError(myId);
    //If exists return member
    return member[0];
}

// Add new member:
async function addMember(member: IMemberModel): Promise<IMemberModel> {
    // Validate: 
    const errors = member.validateSync();
    if (errors) throw new ValidationError(errors.message);
    //Save the image to disk and get a unique name for the image
    if(member.picture){
    member.picture_name = await fileHandler.saveImage(member.picture);
    }
    //save to the DB
    await member.save();
    // delete member.picture;
    delete member.picture;
    return member;
}


export default {
    getAllMembers,
    getOneMember,
    addMember  
};
