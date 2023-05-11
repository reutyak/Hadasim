import { useForm } from "react-hook-form";
import Vaccine from "../../../Models/vaccine-model";
import "./vaccines.css";
import { useNavigate } from "react-router-dom";
import coronaService from "../../../Services/coronaService";
import { useState } from "react";

function Vaccines(): JSX.Element {
    const { register, handleSubmit } = useForm<Vaccine>();
    const navigate = useNavigate();
    const [num, setNum] = useState(1);

    async function send(vaccine: Vaccine) {
        try {
            vaccine.id = localStorage.getItem("id");
            await coronaService.addVaccine(vaccine);
            setNum(num+1);
            navigate("/list");
        }
        catch (err: any) {
            alert(err.message);
        }
    }
    return (
        <div className="vaccines Box">
			<form onSubmit={handleSubmit(send)}>
            <label>Corona Virus</label><br/>
            <label>COVID 19 vaccines</label>
            <label>Vaccine number</label>
            <input type="number" min={1} max={4} {...register("num_vaccine")}/>
            <label>Vaccine date</label>
            <input type="date" {...register("vaccination_date")}/>
            <label>manufacturer</label>
            <input type="text" {...register("manufacturer")}/>
            <button type="submit">Add vaccine</button>
            </form>
        </div>
    );
}

export default Vaccines;
