import express, {Request,Response} from "express"

const app = express();


// Middlewares here //

app.get("/",(req:Request,res:Response)=>{
    res.send("On Homepage Voila !!!")
})


app.listen(3200,()=>console.log("Testing react on 3200 ..."))