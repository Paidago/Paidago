import { app } from './app.js'
import { connectDB } from './db.js'
import { PORT } from './config.js'


async function main(){
    try{
        await connectDB()
        app.listen(PORT)
        console.log('>>> SERVER RUNNING ON PORT -> ', PORT)
    }catch(e){
        console.log(e)
    }
}

main();