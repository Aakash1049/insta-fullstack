const PORT = process.env.PORT || 5000;
const express= require("express")
const app= require("./app")
const connectDatabase  = require("./config/db")
connectDatabase();

if (process.env.NODE_ENV === 'production') {
    //*Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }
app.listen(PORT,()=>{
    console.log("server is running at port ",PORT)
})