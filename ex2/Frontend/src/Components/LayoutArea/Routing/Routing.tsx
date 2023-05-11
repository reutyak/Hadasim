import { Navigate, Route, Routes } from "react-router-dom";
import DataList from "../../DataArea/DataList/DataList";
import Insert from "../../DataArea/Insert/Insert";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import Vaccines from "../../DataArea/vaccines/vaccines";
import Positive from "../../DataArea/Positive/Positive";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/vaccine" element={<Vaccines />} />
            <Route path="/positive" element={<Positive />} />
            <Route path="/list" element={<DataList />} />
            <Route path="/add" element={<Insert />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
