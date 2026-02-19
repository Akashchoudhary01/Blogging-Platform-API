import mongoose from "mongoose";

mongoose.set('strictQuery' , false);

export const connectToDb = async ()=>{
    try{

        const {connection} = await mongoose.connect(
            process.env.MONGODB_URL
        )
        if(connection){
            console.log(`Connected To MongoDb ${connection.host}`);
            
        }
    }catch(e){
        console.log(e);
        process.exit(1);
        
    }
}