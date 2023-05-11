class Member{
    constructor(
    public first_name: string,
    public last_name: string,
    public readonly id: string,
    public picture: File,
    public pictureURL:string,
    public city: string,
    public street: string,
    public home_number: number,
    public date_birth:Date,
    public phone: string,
    public cellular:string
    ){}
}

export default Member;

