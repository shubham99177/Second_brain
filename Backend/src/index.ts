import {app} from "./app";
import dotenv from "dotenv";
import Connectdb from "./db";

dotenv.config();

const PORT = process.env.PORT || 5000;

Connectdb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})


