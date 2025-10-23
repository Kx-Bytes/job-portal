import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 lg:p-10">
        {/* Resume Section */}
        <section className="bg-white shadow-md rounded-2xl p-6 mb-10 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Your Resume</h2>

          {isEdit ? (
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Edit your resume</h3>

              <label
                htmlFor="resumeUpload"
                className="flex items-center justify-center gap-3 p-4 border-2 border-dashed border-blue-400 rounded-xl bg-blue-50 hover:bg-blue-100 transition cursor-pointer"
              >
                <input
                  id="resumeUpload"
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="hidden"
                />
                <img src={assets.profile_upload_icon} alt="Upload" className="w-6 h-6 opacity-80" />
                <span className="text-gray-700 font-medium">
                  {resume ? resume.name : 'Click to upload a PDF file'}
                </span>
              </label>

              <div className="mt-6 flex gap-4 justify-end">
                <button
                  onClick={() => setIsEdit(false)}
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Current Resume</h3>
                <p className="text-gray-500 text-sm">
                  {resume ? resume.name : 'No resume uploaded yet.'}
                </p>
              </div>
              <button
                onClick={() => setIsEdit(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
              >
                Edit Resume
              </button>
            </div>
          )}
        </section>

        {/* Applied Jobs Section */}
        <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-2xl font-semibold text-gray-800">Applied Jobs</h2>
            <span className="text-gray-500 text-sm">
              Total: {jobsApplied.length}
            </span>
          </div>

          {jobsApplied.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-700 text-sm uppercase tracking-wide">
                    <th className="border-b p-3">Company</th>
                    <th className="border-b p-3">Title</th>
                    <th className="border-b p-3">Location</th>
                    <th className="border-b p-3">Date</th>
                    <th className="border-b p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {jobsApplied.map((job, index) =>
                    true ? (
                      <tr
                        key={index}
                        className="hover:bg-blue-50 transition text-gray-700 text-sm border-b"
                      >
                        <td className="p-3 flex items-center gap-3">
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="w-8 h-8 object-contain rounded-md"
                          />
                          <span className="font-medium">{job.company}</span>
                        </td>
                        <td className="p-3">{job.title}</td>
                        <td className="p-3">{job.location}</td>
                        <td className="p-3">
                          {moment(job.appliedAt).format('MMM DD, YYYY')}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold
                              ${
                                job.status === 'Accepted'
                                  ? 'bg-green-100 text-green-700'
                                  : job.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                          >
                            {job.status}
                          </span>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-10">
              You haven’t applied for any jobs yet.
            </p>
          )}
        </section>
      </div>
      <Footer/>
    </>
  )
}

export default Applications