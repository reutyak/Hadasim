import { useEffect, useState } from "react";
import "./DataList.css";
import membersService from "../../../Services/memberService";
import { Table } from "react-bootstrap";
import appConfig from "../../../Utils/AppConfig";
import { useNavigate } from "react-router-dom";

function DataList(): JSX.Element {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    membersService
      .getAllMembers()
      .then((members) => setMembers(members))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="DataList">
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>id</th>
            <th>image</th>
            <th>first name</th>
            <th>last name</th>
            <th>city</th>
            <th>street</th>
            <th>number</th>
            <th>date of birth</th>
            <th>phone</th>
            <th>cellular</th>
            <th>positive result</th>
            <th>recuperation</th>
            <th>vaccine 1</th>
            <th>vaccine 2</th>
            <th>vaccine 3</th>
            <th>vaccine 4</th>
          </tr>
        </thead>
        <tbody>
          {members.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{<img src={appConfig.imageUrl + item.picture_name} />}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.city}</td>
              <td>{item.street}</td>
              <td>{item.home_number}</td>
              <td>{new Date(item.date_birth).toLocaleDateString()}</td>
              <td>{item.phone}</td>
              <td>{item.cellular?item.cellular:0}</td>
              <td>{item.coronavirus?.positive_result?
              new Date(item.coronavirus.positive_result).toLocaleDateString()
              :
              <button onClick={() => {
                    localStorage.setItem("id", item.id);
                    navigate("/positive");
                  }}>update</button>}
              </td>
              <td>
                {item.coronavirus?.recuperation?new Date(item.coronavirus.recuperation).toLocaleDateString():<button onClick={() => {
                      localStorage.setItem("id", item.id);
                      navigate("/positive");
                    }}>update</button>}
              </td>
              <td>
                {item.coronavirus?.vaccines.length > 0 ? (
                  `✔ \n ${new Date(
                    item.coronavirus.vaccines[0].vaccination_date
                  ).toLocaleDateString()}\n${
                    item.coronavirus.vaccines[0].manufacturer
                  }`
                ) : (
                  <button
                    onClick={() => {
                      localStorage.setItem("id", item.id);
                      navigate("/vaccine");
                    }}
                  >
                    update ❌
                  </button>
                )}
              </td>
              <td>
                {item.coronavirus?.vaccines.length > 1
                  ? `✔ \n ${new Date(
                      item.coronavirus.vaccines[1].vaccination_date
                    ).toLocaleDateString()}\n${
                      item.coronavirus.vaccines[1].manufacturer
                    }`
                  : (<button
                    onClick={() => {
                      localStorage.setItem("id", item.id);
                      navigate("/vaccine");
                    }}
                  >
                    update ❌
                  </button>)}
              </td>
              <td>
                {item.coronavirus?.vaccines.length > 2
                  ? `✔ \n ${new Date(
                      item.coronavirus.vaccines[2].vaccination_date
                    ).toLocaleDateString()}\n${
                      item.coronavirus.vaccines[2].manufacturer
                    }`
                  : (<button
                    onClick={() => {
                      localStorage.setItem("id", item.id);
                      navigate("/vaccine");
                    }}
                  >
                    update ❌
                  </button>)}
              </td>
              <td>
                {item.coronavirus?.vaccines.length > 3
                  ? `✔ \n ${new Date(
                      item.coronavirus.vaccines[3].vaccination_date
                    ).toLocaleDateString()}\n${
                      item.coronavirus.vaccines[3].manufacturer
                    }`
                  : (<button
                    onClick={() => {
                      localStorage.setItem("id", item.id);
                      navigate("/vaccine");
                    }}
                  >
                    update ❌
                  </button>)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>{" "}
    </div>
  );
}

export default DataList;
