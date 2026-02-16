
const Incident=require('../models/incident.model');
const User=require('../../user/model/user.model');

// Create a new incident
const createIncident=async (req,res,next) => {
    try {
        const {title,service,severity,status,priority,assignTo,summary}=req.body;
    if (!title || !service || !severity ) {
      return res.status(400).json({ message: "title, description, service, and severity are required" });
    }


    let assignToId = null;
   if(assignTo){
      const assignee = await User.findOne({ email: assignTo }); // TODO we can create get api for this
      if(!assignee){
        return res.status(404).json({success:false,message:"user not found"})
      }
     assignToId=assignee._id
   }




    const incident=await Incident.create({
        title,
        service,
        severity,
        priority,
        assignTo: assignToId ,  
        summary: summary || null,
        createdBy:  req.user._id ,
        status: status || "OPEN"

    });
    
    return res.status(201).json({
        message:"incident created successfully",
        incident
    })

    } catch (error) {
        next(error)
    }
}

module.exports=createIncident
