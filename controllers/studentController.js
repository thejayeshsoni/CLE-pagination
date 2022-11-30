const Student = require("../models/student");

exports.addStudent = async (req, res) => {
    try {
        const { name, email, mobile, dateOfBirth, city, branch, gender } = req.body;

        if (!(name && email && mobile && branch && gender)) {
            return res.status(400).json({
                success: false,
                message: "students must provide their name, email, gender, mobile and branch for registration"
            });
        }

        const existingStudent = await Student.findOne({ email: email }).exec();
        if (existingStudent) {
            return res.status(400).json({ message: "Student already exists" });
        }

        const newStudent = { name, email: email.toLowerCase(), gender: gender.toUpperCase(), mobile, dateOfBirth, city, branch: branch.toUpperCase() };

        const registeredStudent = await Student.create(newStudent);

        if (!registeredStudent) {
            return res.status(400).json({
                success: false,
                message: "student registration failed"
            });
        }

        res.status(200).json({
            success: true,
            message: "student registration successfully completed"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Student registration Failed",
            error
        });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const { city, branch, name, gender, sort, fields } = req.query;
        const queryObject = {};

        if (city) {
            queryObject.city = city;
        }
        if (branch) {
            queryObject.branch = branch;
        }
        if (name) {
            queryObject.name = { $regex: name, $options: 'i' };
        }
        if (gender) {
            queryObject.gender = gender;
        }

        let data = Student.find(queryObject);

        if (sort) {
            const sortList = sort.split(",").join(" ");
            data = data.sort(sortList);
        } else {
            data = data.sort("name");
        }

        if (fields) {
            const fieldList = fields.split(",").join(" ");
            data = data.select(fieldList);
        }

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};
        const totalStudents = await Student.countDocuments().exec();
        if (endIndex < totalStudents) {
            results.next = {
                page: page + 1,
                limit
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit
            }
        }
        data = data.skip(startIndex).limit(limit);

        results.students = await data;
        res.status(200).json({
            success: true,
            totalStudents,
            results
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Can't find student",
            error
        });
    }
};