const { notFound, errorHandler } = require('./middlewares/errorMiddleware')
const express = require('express')
const app = express()
const cors = require("cors")
const userRoutes = require('./routes/userRoute')
const jobRoutes = require('./routes/jobsRoutes')

const dotenv = require('dotenv')
const connectDB = require('./db/connectDB')
// const sendMail = require('./utils/sendMail')


dotenv.config()

const port = process.env.port

app.use(express.json());
app.use(cors())


app.get('/', (req,res)=>{
    res.send('hello world')
})

// app.get('/sendmail' , sendMail)

app.use('/' , userRoutes)
app.use('/' ,  jobRoutes)


const startServer = async ()=>{
    try{
        app.use(notFound)
        app.use(errorHandler)
        

        await connectDB(process.env.dbURI)
        console.log('connected with database');

        app.listen(port , ()=>{
            console.log(`server started at ${port}`);
        })
    }
    catch(error){
        console.log(error);
    }
}


startServer()