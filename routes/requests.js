const Request = require('../model/Request');

const router = require('express').Router();

router.post("/getrequests",async(req,res)=>{
    try {
        const data = await Request.find({ for_whom: req.body.id})
        res.status(200).json({
            data:data,
            success:true
        })
    } catch (error) {
        res.status(200).json({
            success:false,
            message:"Unable to find data"
        })
    }
})


module.exports = router;