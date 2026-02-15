

const Incident=require('../models/incident.model');


//get all incidents
const getIncidents=async(req,res,next)=>{
    try {
        
    const incidents = await Incident.find()
         .populate("createdBy", "email")
         .populate("assignTo",  "email")
         .sort({ createdAt: -1 }); // newest first

    return res.status(200).json({
        success:true,
        total:incidents.length,
        data: incidents

    })

    } catch (error) {
        next(error)
    }
}

module.exports=getIncidents