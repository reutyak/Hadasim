import express from "express";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import memberRoutes from "./6-routes/member-routes";
import coronaRouter from "./6-routes/corona-routes"
import dal from "./2-utils/dal";
import expressFileUpload from "express-fileupload";

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload()); // Creates request.files object containing files sent from backend.
server.use("/api/corona", coronaRouter);
server.use("/api", memberRoutes);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port,async () =>
{
    await dal.connect();
    console.log(`Listening on http://localhost:${appConfig.port}`)
});
