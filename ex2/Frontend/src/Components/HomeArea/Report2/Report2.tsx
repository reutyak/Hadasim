import "./Report2.css";
import React, {useEffect, useState } from 'react';
import CanvasJSReact from '../../../Assets/canvasjs/canvasjs.react';
import membersService from "../../../Services/memberService";
import coronaService from "../../../Services/coronaService";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Report2(): JSX.Element {    
    const [members, setMembers] = useState([]);
    const [myData, setMyData] = useState([])
    const [state, setState] = useState(false)

      useEffect(() => {
        membersService
          .getAllMembers()
          .then((members) => setMembers(members))
          .catch((err) => alert(err.message));
      }, []);

      useEffect(() => {
        const myDataPoints: React.SetStateAction<any[]> = [];
        let i = 0;
        for(i=0;i<30;i+=1){
            let temp = 3600 * 1000 *i* 24
            coronaService.getActivePatients(new Date(Date.now() - temp).toISOString()).then((res)=>{
                myDataPoints.push({
                    x: new Date(Date.now() - temp), y:res }
                );
            }).then(()=>myDataPoints.sort(
                (objA, objB) => objA.x.getTime() - objB.x.getTime(),
                
              ))            
        }
        setMyData(myDataPoints);
        setState(true);
        
      }, []);
    
    function show(){
        if(state){
            return <CanvasJSChart options = {options}/>
        }
    }
    
    const options = {
        animationEnabled: true,
        title:{
            text: "Active patients in the last month"
        },
        axisX: {
            valueFormatString: "DD/MM"
        },
        axisY: {
            title: "Number",
        },
        data: [{
            yValueFormatString: "############",
            xValueFormatString: "DD/MM",
            type: "spline",
            dataPoints: myData
        }]
    }
    return (
        <div className="Report2">
			<div>
			{show()}
		</div>
        </div>
    );
}

export default Report2;
