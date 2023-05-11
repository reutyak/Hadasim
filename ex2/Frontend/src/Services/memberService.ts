import axios from "axios";
import Member from "../Models/member-model";
import appConfig from "../Utils/AppConfig";

class MembersService {

    public async getAllMembers(): Promise<Member[]> {
        const response = await axios.get<Member[]>(appConfig.membersUrl);
        const members = response.data;
        return members;
    };

    public async getOneMember(id:string) {
        const response = await axios.get<Member>(appConfig.membersUrl+id);
        const member = response.data;
        return member;
};

public async addMember(member: Member): Promise<Member> {
    const headers = { "Content-Type": "multipart/form-data" }; // Tell axios that we're sending text and file to backend:
    const response = await axios.post<Member>(appConfig.membersUrl, member, { headers });
    const addedMember = response.data;
    return addedMember
};
}

const membersService = new MembersService();

export default membersService;
