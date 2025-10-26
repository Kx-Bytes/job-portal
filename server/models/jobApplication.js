import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "User",          // Reference to Job model
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",         // Reference to User model (the job seeker)
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",      // Reference to Company model
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "reviewed", "interview", "rejected", "accepted"],
        default: "pending"
    },
    date: {
        type: Number,
        required:true         // Company/admin notes about the application
    }
}, {
    timestamps: true         // Adds createdAt and updatedAt automatically
});

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);
export default JobApplication;