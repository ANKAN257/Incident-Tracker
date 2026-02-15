
const { query } = require('express');
const Incident=require('../models/incident.model');

//pagination
const getPagination =(query)=>{
    const page=parseInt(query.page) || 1
    const limit=5
    const skip=(page-1)*limit
    return {page, limit,skip}
}
const buildFilter=(query)=>{
    const {status, severity}=query
    const filter = {};
    if (status)   filter.status   = status.toUpperCase();
    if (severity) filter.severity = severity.toUpperCase();

    return filter;
}

const buildSort=(query)=>{
    const sortBy=query.sortBy || "createdAt";
    const order=query.order || "desc";
    const sortOrder = order === "asc" ? 1 : -1;
    return { [sortBy]: sortOrder };
}

const buildPagination=(total,page,limit)=>{
    const totalPages=Math.ceil(total/limit)
    return {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
    }
}



//get all incidents
const getIncidents=async(req,res,next)=>{
    try {
         const { page, limit, skip } = getPagination(req.query);
         const filter=buildFilter(req.query)
         const sort=buildSort(req.query)

        const [incidents,total]=await Promise.all([
            Incident.find(filter)
            .populate("createdBy", "email")
            .populate("assignTo",  "email")
            .sort(sort)
            .skip(skip)
            .limit(limit),
            Incident.countDocuments(filter),
        ])

  

    return res.status(200).json({
        success:true,
        total:incidents.length,
        data: incidents,
        pagination:buildPagination(total,page,limit)

    })

    } catch (error) {
        next(error)
    }
}

module.exports=getIncidents