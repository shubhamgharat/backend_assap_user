const router = require("express").Router();
const Hospital = require("../model/Hospital");

router.get("/", async(req, res) => {
    const listt= await Hospital.find({},{_id:0,email:0,password:0,latitude:0,xyz:0,date:0,__v:0,contact:0,main_doc_name:0});
    console.log(listt);
    res.status(200).json({data:listt,success:true});
})


module.exports = router;