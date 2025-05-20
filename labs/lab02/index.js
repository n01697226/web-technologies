import express from "express";
import lab_router from "./routers/lab_router.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.use('/lab', lab_router);