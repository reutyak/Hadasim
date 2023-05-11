import express, { Request, Response, NextFunction } from "express";
import memberServices from "../5-services/member-service";
import { ResourceNotFoundError } from "../4-models/client-errors";
import { MemberModel } from "../4-models/member-model";
import imageHandler from "../2-utils/image-handler";

const router = express.Router(); 

//get all members with the information on corona - http://localhost:4001/api/member
router.get("/member", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const allMember =await memberServices.getAllMembers();
        response.json(allMember);
    }
    catch (err: any) {
        next(err);
    }
});

//get one member by id - http://localhost:4001/api/member/:id
router.get("/member/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = request.params.id;
        const member =await memberServices.getOneMember(id);
        if(!member) throw new ResourceNotFoundError(id);
        response.json(member);
    }
    catch (err: any) {
        next(err);
    }
});

// Add new member: - http://localhost:4001/api/member
router.post("/member", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.picture = request.files?.picture
        const newMember = new MemberModel(request.body);
        const member =await memberServices.addMember(newMember);
        response.json(member);
    }
    catch (err: any) {
        next(err);
    }
});

//Receiving the photo of the member - http://localhost:4001/api/member/images/:imageName
router.get("/member/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = imageHandler.getAbsolutePath(imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;
