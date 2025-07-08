import { postAnalytics } from "../../controllers/analytics/controllers.js"
import express from "express"

const analyticsRouter = express.Router();

analyticsRouter.post('/', postAnalytics);

export default analyticsRouter;