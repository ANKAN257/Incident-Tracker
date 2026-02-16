const Incident=require('../models/incident.model');
const User = require('../../user/model/user.model');


const updateIncident=async(req,res,next)=>{
    try {
        const { id } = req.params;
       const { title, service, assignTo, summary } = req.body;
        const status   = req.body.status?.toUpperCase();
        const severity = req.body.severity?.toUpperCase();
        const  priority = req.body.priority?.toUpperCase();
       
       const incident = await Incident.findOne({publicId: id})
       if(!incident){
        return res.status(404).json({
            success:false,
            message:"Incident-Ticket not found"
        })
       }


    if (assignTo !== undefined) {
  if (assignTo === "") {
    incident.assignTo = null;
  } else {
    const assignee = await User.findOne({ email: assignTo });
    if (!assignee) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    incident.assignTo = assignee._id;
  }
}


// Update only fields that are provided
if(title)        incident.title=title
if(service)      incident.service=service
if(severity)     incident.severity=severity
if(priority)     incident.priority=priority
if(status)       incident.status=status
if(summary)      incident.summary=summary

await incident.save()

const updated=await Incident.findOne({publicId: id })
       .populate("createdBy", "email")
       .populate("assignTo",  "email");
     
return res.status(200).json({
    success:true,
    message:"Incident updated successfully",
    data:updated

})





    } catch (error) {
        next(error)
    }  
}

module.exports=updateIncident 