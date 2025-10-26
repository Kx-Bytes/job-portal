import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const ManageJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const { backendUrl, companyToken } = useContext(AppContext);


  const fetchCompanyJobs = async () => {
    try {

      const { data } = await axios.get(backendUrl +'/api/company/list-jobs', { headers: { token: companyToken } });

      if (data.success) {
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData);
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }

  }

  //Function To change Job Visibility

  const changeJobVisibility=async(id)=>{
    try {
            const {data}= await axios.post(backendUrl+'/api/company/change-visibility',
              {id},{headers:{token:companyToken}});

            if(data.success){
              toast.success(data.message);
              fetchCompanyJobs();
            }
            else{
              toast.error(data.message);
            }

    } catch (error) {
      toast.error(error);
    }
  }


  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken])


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Jobs</h2>
          <button
            onClick={() => navigate('/dashboard/add-job')}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm"
          >
            + Add New Job
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                <th className="px-4 py-3 text-sm font-semibold">#</th>
                <th className="px-4 py-3 text-sm font-semibold">Job Title</th>
                <th className="px-4 py-3 text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-sm font-semibold">Location</th>
                <th className="px-4 py-3 text-sm font-semibold">Applicants</th>
                <th className="px-4 py-3 text-sm font-semibold">Visible</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3 text-gray-800 font-medium">{job.title}</td>
                  <td className="px-4 py-3 text-gray-600">{moment(job.date).format('ll')}</td>
                  <td className="px-4 py-3 text-gray-600">{job.location}</td>
                  <td className="px-4 py-3 text-gray-600">{job.applicants}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={job.visible}
                      onChange={()=>changeJobVisibility(job._id)}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ManageJobs