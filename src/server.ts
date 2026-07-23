// path: ./server.ts
import app from "./app";
import router from "./routes/bookRouter";

const port = process.env.PORT || 6767;

app.use('/api/books', router);

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
});