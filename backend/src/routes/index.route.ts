import {Application} from 'express'
import userRoute from "../routes/user.route";
import uploadedFile from "../routes/uploadedFiles.route";


export const mountRoutes =(app:Application)=>{
app.use("/User",userRoute)
app.use("/uploadedFile",uploadedFile)

}