
const { query } = require('express');
const Incident=require('../models/incident.model');
const User= require('../../user/model/user.model');

//pagination
const getPagination =(query)=>{
    const page=parseInt(query.page) || 1
    const limit=5
    const skip=(page-1)*limit
    return {page, limit,skip}
}

const buildFilter = async (query) => {
  const { status, severity, service, assignTo, search } = query;
  const filter = {};

  
  if (status) filter.status = status.toUpperCase();
  if (severity) filter.severity = severity.toUpperCase();
  if (service) filter.service = service;


  if (assignTo) {
    const user = await User.findOne({ email: assignTo });
    if (!user) {
      return { _id: null }; 
    }
    filter.assignTo = user._id;
  }

 
  if (search && search.trim() !== "") {
    const trimmed = search.trim();

    
    const users = await User.find({
      email: { $regex: trimmed, $options: "i" },
    }).select("_id");

    const userIds = users.map((u) => u._id);

    filter.$or = [
      { title: { $regex: trimmed, $options: "i" } },
      { assignTo: { $in: userIds } },
      {severity:{ $regex: trimmed, $options: "i"}},
      {status:{ $regex: trimmed, $options: "i"}}
    ];
  }

  return filter;
};



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
const getIncidents = async (req, res, next) => {
    try {
        const { page, limit, skip } = getPagination(req.query);

        const filter = await buildFilter(req.query); 
        const sort = buildSort(req.query);

        const [incidents, total] = await Promise.all([
            Incident.find(filter)
                .populate("createdBy", "email")
                .populate("assignTo", "email")
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Incident.countDocuments(filter),
        ]);

        return res.status(200).json({
            success: true,
            total,
            data: incidents,
            pagination: buildPagination(total, page, limit),
        });

    } catch (error) {
        next(error);
    }
};

module.exports=getIncidents