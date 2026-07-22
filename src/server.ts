import app from "./app";

const port = process.env.PORT || 6767;

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
});