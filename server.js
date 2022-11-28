const app = require("./app");
require("dotenv").config();
const connectDB = require("./configs/db");

const start = async () => {
    try {
        await connectDB(process.env.DB_URL);
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running at ${process.env.PORT ? process.env.PORT
                : 3000}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();