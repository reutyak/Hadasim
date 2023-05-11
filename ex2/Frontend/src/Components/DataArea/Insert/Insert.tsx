import { useNavigate } from "react-router-dom";
import "./Insert.css";
import { useForm } from "react-hook-form";
import Member from "../../../Models/member-model";
import membersService from "../../../Services/memberService";
import Coronavirus from "../../../Models/coronavirus-model";
import { SyntheticEvent, useState } from "react";
import coronaService from "../../../Services/coronaService";
import notify from "../../../Utils/Notify";

function Insert(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<Member>();
    const navigate = useNavigate();
    const [id, setID] = useState("");
    
    function setMyID(args:SyntheticEvent){
        setID((args.target as HTMLInputElement).value)
    };

    async function send(member: Member) {
        try {
            localStorage.setItem("id",member.id);
            member.picture = (member.picture as unknown as FileList)[0];
            const corona = new Coronavirus(member.id, null,null)
            const myCorona = await coronaService.addCorona(corona);
                await membersService.addMember(member);
            console.log(member);
            notify.success("Member has been added");
            navigate("/list");
        }
        catch (err: any) {
            notify.error(err);
        }
    }
    return (
        <div className="Insert Box">
		<h2>Add Member</h2>

        <form onSubmit={handleSubmit(send)}>

        <label>First name: </label>
        <input type="text" required {...register("first_name")} />
        <span className="Err">{formState.errors.first_name?.message}</span>

        <label>Last name: </label>
        <input type="text" required {...register("last_name")} />
        <span className="Err">{formState.errors.last_name?.message}</span>

        <label>ID: </label>
        <input type="text" required onChange={setMyID} {...register("id")} />
        <span className="Err">{formState.errors.id?.message}</span>

        <label>Image: </label>
        <input type="file" required accept="image/*" {...register("picture")} />
        <span className="Err">{formState.errors.picture?.message}</span>

        <label>City: </label>
        <input type="text" required {...register("city")} />
        <span className="Err">{formState.errors.city?.message}</span>

        <label>Street: </label>
        <input type="text" {...register("street")} />
        <span className="Err">{formState.errors.street?.message}</span>

        <label>Home number: </label>
        <input type="number" required {...register("home_number")} />
        <span className="Err">{formState.errors.home_number?.message}</span>

        <label>Date of birth: </label>
        <input type="date" required {...register("date_birth")} />
        <span className="Err">{formState.errors.date_birth?.message}</span>

        <label>Phone: </label>
        <input type="text" required {...register("phone")} />
        <span className="Err">{formState.errors.phone?.message}</span>

        <label>Cellular: </label>
        <input type="text" {...register("cellular")} />
        <span className="Err">{formState.errors.cellular?.message}</span>    

        <button type="submit">Add</button>

        </form>
        </div>
    );
}

export default Insert;
