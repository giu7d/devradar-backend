import { Router } from "express";
import DevController from "./controllers/DevController";
import SearchController from "./controllers/SearchController";

const routes = Router();

routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);
routes.put("/devs/:username", DevController.indexOne);
routes.put("/devs/:username", DevController.update);
routes.put("/devs/:username/location", DevController.updateLocation);
routes.delete("/devs/:username", DevController.destroy);

routes.get("/search", SearchController.index);

export default routes;
