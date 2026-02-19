import app from './app.js';
import { configDotenv } from 'dotenv';
import {connectToDb} from './utils/mongodbConnection.js'

configDotenv();
const PORT = process.env.PORT || 3333;

app.listen(PORT , async()=>{
    await connectToDb();
    console.log(`app is live at http://localhost:${PORT}`);
    
})