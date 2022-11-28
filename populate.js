require("dotenv").config();

const connectDB = require("./configs/db");
const Student = require("./models/student");

const studentJSON = require("./students.json");

const start = async () => {
    try {
        await connectDB(process.env.DB_URL)
        await Student.deleteMany()
        await Student.create(studentJSON)
        console.log('Success!!!!')
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()