import dotenv from 'dotenv'
dotenv.config()
import express from "express";
import 'express-async-errors'
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { currentUser } from './middleware/current-user';

import { NotFoundError } from './errors/not-found-error'
import { ErrorHandler } from './middleware/error-handler'
import { GetBusRoute } from "./routes/bus/get";
import { GetAllBusRoute } from "./routes/bus/index";
import { NewBusRoute } from "./routes/bus/new";
import { DeleteBusRoute } from "./routes/bus/delete";
import { UpdateBusRoute } from "./routes/bus/update";
import { GetQuickStats } from "./routes/data/quickStats";

import { NewStopRoute } from "./routes/stop/new";
import { GetAllStops } from "./routes/stop";
import { GetStop } from "./routes/stop/get";
import { DeleteStop } from "./routes/stop/delete";

import { NewGpsTracker } from './routes/tracking/new';
import { GetAllGpsTracker } from './routes/tracking';

import { NewAnnouncement } from './routes/announcement/new';
import { GetAllAnnouncement } from './routes/announcement/index';
import { DeleteAnnouncement } from './routes/announcement/delete'

import { NewFeedback } from './routes/feedback/new';
import { GetAllFeedback } from './routes/feedback/index';
import { DeleteFeedback } from './routes/feedback/delete';;

import { signinRouter } from './routes/auth/signin';
import { signupRouter } from './routes/auth/signup';
import { signoutRouter } from './routes/auth/signout';
import { currentUserRouter } from './routes/auth/current-user';

import { GetDriver } from './routes/driver/get';
import { NewDriver } from './routes/driver/new';
import { GetAllDriver } from './routes/driver';
import { DeleteDriver } from './routes/driver/delete'

import { getAllPoints } from './routes/point/get'
import { GetBackTrackBus } from './routes/data/backTracking';
import { GetSpeedTracking } from './routes/data/speedTracking';

const app = express();



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY,
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())


const httpServer = createServer(app)
const io = new Server(httpServer)

app.use(currentUser)

app.use(NewBusRoute)
app.use(GetAllBusRoute)

app.use(NewStopRoute)
app.use(GetAllStops)
app.use(GetStop)
app.use(DeleteStop)

app.use(GetBusRoute)
app.use(DeleteBusRoute)
app.use(UpdateBusRoute)

app.use(NewGpsTracker)
app.use(GetAllGpsTracker)

app.use(NewFeedback)
app.use(GetAllFeedback)
app.use(DeleteFeedback)

app.use(NewAnnouncement)
app.use(GetAllAnnouncement)
app.use(DeleteAnnouncement)

app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)
app.use(currentUserRouter)

app.use(GetAllDriver)
app.use(NewDriver)
app.use(GetDriver)
app.use(DeleteDriver)

app.use(getAllPoints)


app.use(GetQuickStats)
app.use(GetBackTrackBus)
app.use(GetSpeedTracking)


app.use('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(ErrorHandler)

export { app, io, httpServer };
