const express = require ('express');
const cors = require ('cors');
const app = express ();
const mongoose = require ('mongoose');

require ('dotenv').config();

const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());


async function main(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Coneected to MongoDB")
}

main().catch(console.error);

app.use("/api/login",require("./routes/login"));
app.use("/api/refreshtoken",require("./routes/refreshToken"));
app.use("/api/singout",require("./routes/signout"));
app.use("/api/signup",require("./routes/signup"));
app.use("/api/todos",require("./routes/todos"));
app.use("/api/user",require("./routes/user"));


app.get('/',(req,res)=>{res.send('Hello World')});


app.listen(port,() => {console.log(`Server is runing on port: ${port}`)})
