import { useNavigate } from "react-router-dom";
import Coronavirus from "../../../Models/coronavirus-model";
import coronaService from "../../../Services/coronaService";
import "./Positive.css";
import { useForm } from "react-hook-form";

function Positive(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit} = useForm<Coronavirus>();
    
    async function send(corona: Coronavirus) {
        try {
            corona.id = localStorage.getItem("id");
            await coronaService.updateCorona(corona.id,corona.positive_result.toString(),corona.recuperation.toString());
            navigate("/list");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="Positive Box" >
			<form onSubmit={handleSubmit(send)}>
            <label>Positive result date:</label>
            <input type="date" {...register("positive_result")}/>
            <label>Recuperation:</label>
            <input type="date" {...register("recuperation")}/>
            <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Positive;
