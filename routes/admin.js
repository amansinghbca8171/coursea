const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");
// bcrypt ,zod ,jsonWebToken
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function(req, res) {
    const { email, password, firstName, lastname } = req.body;

    await adminModel.create({
        email:email,
        password: password,
        firstName: firstName,
        lastName: lastname
    })
    res.json({
        message:"signup succeeded"
    }) 


})

adminRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email,
        password: password
    }); 
     
    if(admin){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);  

        res.json({
            token:token
        })

    } else {
        res.status(403).json({
            message:"incorrect credentials"
        })

    }

})

// /api/v1/course/
adminRouter.post("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl , price } = req.body;

    // creating a web3 saas in 6 hours of harkirt singh video on youtube which can learn you to add video pipeline to admin section
    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })
    
    res.json({
        message: "Course created",
        courseId: course._id
    })
})


adminRouter.put("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware,async function(req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})


module.exports = {
    adminRouter: adminRouter
}