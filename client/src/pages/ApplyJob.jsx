import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment/moment';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';

const ApplyJob = () => {
    const { id } = useParams();
    const [jobData, setJobData] = useState(null);
    const { jobs } = useContext(AppContext);

    const fetchJobData = async () => {
        try {
            const data = jobs.find((job) => job._id === id);
            if (data) setJobData(data);
            else console.log("Job not found");
        } catch (error) {
            console.error("Error fetching job data:", error);
        }
    };

    useEffect(() => {
        fetchJobData();
    }, [id, jobs]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            {jobData ? (
                <div>
                <div className="max-w-7xl mx-auto py-12 px-6 flex flex-col lg:flex-row gap-10">
                    
                    {/* Left Column: Job Details + Description */}
                    <div className="flex-1 flex flex-col gap-8">
                        {/* Job Header */}
                        <div className="bg-white shadow-2xl rounded-3xl p-8 flex flex-col gap-6">
                            <div className="flex items-center gap-6">
                                <img
                                    src={jobData.companyId.image}
                                    alt={jobData.companyId.name}
                                    className="w-20 h-20 object-cover rounded-full shadow-md"
                                />
                                <h1 className="text-3xl font-bold text-gray-800">{jobData.title}</h1>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-gray-600">
                                <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                                    <img src={assets.suitcase_icon} className="w-5 h-5" />
                                    {jobData.companyId.name}
                                </span>
                                <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                                    <img src={assets.location_icon} className="w-5 h-5" />
                                    {jobData.location}
                                </span>
                                <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                                    <img src={assets.person_icon} className="w-5 h-5" />
                                    {jobData.level}
                                </span>
                                <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
                                    <img src={assets.money_icon} className="w-5 h-5" />
                                    CTC: {kconvert.convertTo(jobData.salary)}
                                </span>

                                {/* Apply Button + Posted */}
                                <div className="ml-auto flex flex-col items-end mt-2 lg:mt-0">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105">
                                        Apply Now
                                    </button>
                                    <span className="text-gray-400 mt-2 text-right text-sm">
                                        Posted {moment(jobData.data).fromNow()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Job Description */}
                        <div className="bg-gray-50 rounded-2xl p-6 shadow-inner">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Job Description</h2>
                            <div className="text-gray-600 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: jobData.description }}></div>
                        </div>
                    </div>

                    {/* Right Column: More Jobs */}

                    <div className="w-full lg:w-96 flex-shrink-0 flex flex-col gap-4">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">More Jobs from {jobData.companyId.name}</h2>
                        {jobs
                            .filter(job => job.companyId._id === jobData.companyId._id && job._id !== jobData._id)
                            .slice(0, 4)
                            .map((job, index) => (
                                <JobCard key={job._id || index} job={job} />
                            ))
                        }
                    </div>

                    
                </div>

                <Footer/>

                </div>
                
            ) : (
                <div className="flex justify-center items-center py-20">
                    <div className="w-14 h-14 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            )}

            

        </div>

    );
};

export default ApplyJob;