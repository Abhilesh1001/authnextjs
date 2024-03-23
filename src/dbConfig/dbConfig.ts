import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        
        const connection= mongoose.connection
        connection.on('connected',()=>{
            console.log('MongoDB Connected')
        })
        connection.on('error',(error)=>{
            console.log('Mongo DB connection erorr, Please make sure db is up running' +error);
            process.exit()
        })
    }catch(error){
        console.log('Something wnt wrong to DB')
        console.log(error)

    }
    
}

