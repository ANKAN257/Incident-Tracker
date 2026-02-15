const Incident=require('../models/incident.model');


const getIncidentById =async(req,res,next)=>{
    try {
         const {id}=req.params
         const incident = await Incident.findOne({publicId: id})
               .populate("createdBy", "email")
               .populate("assignTo",  "email");

         if(!incident){
            return res.status(404).json({
                success:false,
                message: "Incident-Ticket not found",

            })
         }


         return res.status(200).json({
            success:true,
            data: incident,
         })

    } catch (error) {
        next(error)
    }
}


module.exports=getIncidentById