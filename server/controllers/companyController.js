//Register a new company
import Company from '../models/Company.js';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import generateToken from '../utils/generateToken.js';
import Job from '../models/Job.js';
import JobApplication from '../models/jobApplication.js';
// -----------------------------------------------------
// REGISTER COMPANY
// -----------------------------------------------------
const registerCompany = async (req, res) => {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if company already exists
        const Companyexist = await Company.findOne({ email });
        if (Companyexist) {
            return res.status(400).json({ message: "Company with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        const company = await Company.create({
            name,
            email,
            password: hashedPassword,
            image: imageUpload.secure_url,
        });

        res.json({
            success: true,
            message: "Company registered successfully",
            company: {
                id: company._id,
                name: company.name,
                email: company.email,
                image: company.image,
            },
            token: generateToken(company._id),
        });
    } catch (error) {
        console.error("Error registering company:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// -----------------------------------------------------
// LOGIN COMPANY
// -----------------------------------------------------
const loginCompany = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.json({
            success: true,
            message: "Login successful",
            company: {
                id: company._id,
                name: company.name,
                email: company.email,
                image: company.image,
            },
            token: generateToken(company._id),
        });
    } catch (error) {
        console.error("Error logging in company:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// -----------------------------------------------------
// GET COMPANY DATA
// -----------------------------------------------------
const getCompanyData = async (req, res) => {
    try {
        const company = req.company; // from auth middleware

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        res.json({ success: true, company });
    } catch (error) {
        console.error("Error fetching company data:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// -----------------------------------------------------
// POST A JOB
// -----------------------------------------------------
const postJob = async (req, res) => {
    const { title, description, location, salary, level, category } = req.body;
    const companyId = req.company._id; // from auth middleware

    if (!title || !description || !location || !salary || !level || !category) {
        return res.status(400).json({ message: "Title, description, and location are required" });
    }

    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            level,
            category,
            companyId,
            date: Date.now(),
            visible: true
        });
        await newJob.save();
        res.json({
            success: true,
            message: "Job posted successfully",
            newJob
        });

    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ message: "Server error" });

    }


};

// -----------------------------------------------------
// GET JOB APPLICANTS FOR A COMPANY’S JOB
// -----------------------------------------------------
const getCompanyJobApplicants = async (req, res) => {
    try {
        const companyId = req.company._id;

        //Find job applications for the user and populate related data
        const applicants = await JobApplication.find({ companyId })
            .populate('userId', 'name email resume')
            .populate('jobId', 'title location category level salary')
            .exec()

        return res.json({ success: true, applicants })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
};

// -----------------------------------------------------
// GET COMPANY’S POSTED JOBS
// -----------------------------------------------------
const getCompanyPostedJobs = async (req, res) => {
    try {
        const companyId = req.company._id;

        const jobs = await Job.find({ companyId })

        //Adding no:of Applicants
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await JobApplication.find({ jobId: job._id });
            return { ...job.toObject(), applicants: applicants.length }
        }))
        res.json({ success: true, jobsData: jobsData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
};

// -----------------------------------------------------
// CHANGE APPLICATION STATUS (e.g., accepted/rejected)
// -----------------------------------------------------
const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ success: false, message: 'Missing id or status' });
    }

    const updatedApplication = await JobApplication.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true } // return the updated document
    );

    if (!updatedApplication) {
      return res.status(404).json({ success: false, message: 'Job application not found' });
    }

    res.json({ success: true, message: 'Status changed successfully', data: updatedApplication });
  } catch (error) {
    console.error('Error changing job application status:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// -----------------------------------------------------
// CHANGE COMPANY VISIBILITY (e.g., visible/invisible to users)
// -----------------------------------------------------
const changeVisibility = async (req, res) => {

    try {
        const { id } = req.body;
        const companyId = req.company._id;

        const job = await Job.findById(id);

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible;
        }

        await job.save();

        res.json({
            success: true,
            job
        });
    } catch (error) {
        console.error("Error changing visibility:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// -----------------------------------------------------
export {
    registerCompany,
    loginCompany,
    getCompanyData,
    postJob,
    getCompanyJobApplicants,
    getCompanyPostedJobs,
    changeJobApplicationStatus,
    changeVisibility,
};