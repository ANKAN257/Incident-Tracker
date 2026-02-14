const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const incidentSchema = new mongoose.Schema(
  {
    
    publicId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    ticketID: {
      type: String,
      unique: true,
      sparse: true, 
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

 

    service: {
      type: String,
      required: true,
      trim: true,
    },

    severity: {
      type: String,
      enum: ["SEV1", "SEV2", "SEV3", "SEV4"],
      required: true,
    },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "MITIGATED", "RESOLVED", "CLOSED"],
      default: "OPEN",
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
    },

   
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    
    assignTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

  
    summary: {
      type: String,
      trim: true,
       default: null,
    },

  
    resolvedAt: {
      type: Date,
      default: null,
    },
    closedAt: {
      type: Date,
      default: null,
    },


  },
  {
    timestamps: true, 
    
  }
);


incidentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await mongoose.model("Incident").countDocuments();
    this.ticketID = `INC-${String(count + 1).padStart(4, "0")}`;
  }
  next();
});


incidentSchema.pre("save", function (next) {
  if (this.isModified("status")) {
    if (this.status === "RESOLVED" && !this.resolvedAt) {
      this.resolvedAt = new Date();
    }
    if (this.status === "CLOSED" && !this.closedAt) {
      this.closedAt = new Date();
    }
  }
  next();
});

incidentSchema.index({ severity: 1 });
incidentSchema.index({ status: 1 });
incidentSchema.index({ createdAt: -1 });
incidentSchema.index({ createdBy: 1 });
incidentSchema.index({ ticketID: 1 });
incidentSchema.index({ publicId: 1 })

module.exports = mongoose.model("Incident", incidentSchema);