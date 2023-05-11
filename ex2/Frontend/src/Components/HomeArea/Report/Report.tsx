import "./Report.css";
import { useEffect, useState } from "react";
import CanvasJSReact from '../../../Assets/canvasjs/canvasjs.react';
import membersService from "../../../Services/memberService";
import coronaService from "../../../Services/coronaService";


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Report(): JSX.Element {
    
    const [members, setMembers] = useState(0);
    const [vaccinated, setVaccinated] = useState(0);

  useEffect(() => {
    membersService
      .getAllMembers()
      .then((members) => setMembers(members.length))
      .catch((err) => alert(err.message));
  }, []);

  useEffect(() => {
   coronaService.getAllVaccinated()
      .then((num) => setVaccinated(num))
      .catch((err) => alert(err.message));
  }, []);
  
  
  const options = {
    title: {
      text: "Number of vaccinated and unvaccinated"
    },
    data: [{				
              type: "column",
              dataPoints: [
                  { label: "vaccinated",  y: vaccinated},
                  { label: "unvaccinated", y: members-vaccinated  }
              ]
     }]
 }

  return (
    <div className="Report">
      <main>
        <h3 className="head">Vaccinated Report</h3>
      </main>
      <CanvasJSChart options = {options}
        />
    </div>
  );
}

export default Report;
