import express from 'express'
import cors from 'cors'
import mongoConnect from './config/mongodb.js'
import userRoute from './routes/userRoute.js'
const app = express()

app.use(cors({
  origin:"http://localhost:5173",
  methods:['GET','POST','PUT','PATCH'],
  credentials:true
}))

mongoConnect()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/',userRoute)

app.listen(8000,()=> {
  console.log("http://localhost:8000")
})