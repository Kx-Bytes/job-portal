import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          View Applications
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                <th className="px-4 py-3 text-sm font-semibold">#</th>
                <th className="px-4 py-3 text-sm font-semibold">User Name</th>
                <th className="px-4 py-3 text-sm font-semibold">Job Title</th>
                <th className="px-4 py-3 text-sm font-semibold">Location</th>
                <th className="px-4 py-3 text-sm font-semibold">Resume</th>
                <th className="px-4 py-3 text-sm font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {viewApplicationsPageData.map((application, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>

                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={application.imgSrc}
                      alt={application.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <span className="text-gray-800 font-medium">{application.name}</span>
                  </td>

                  <td className="px-4 py-3 text-gray-700">{application.jobTitle}</td>
                  <td className="px-4 py-3 text-gray-700">{application.location}</td>

                  <td className="px-4 py-3">
                    <a
                      href={application.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                    >
                      <img
                        src={assets.resume_download_icon}
                        alt="download"
                        className="w-4 h-4"
                      />
                      <span>Resume</span>
                    </a>
                  </td>

                  {/* Action Buttons on Hover */}
                  <td className="px-4 py-3 relative group">
                    <div className="flex justify-center items-center">
                      <span className="text-gray-500 group-hover:hidden cursor-pointer">
                        ⋮
                      </span>
                      <div className="hidden group-hover:flex gap-2">
                        <button className="px-3 py-1 text-sm text-green-600 border border-green-500 rounded-lg hover:bg-green-50 transition">
                          Accept
                        </button>
                        <button className="px-3 py-1 text-sm text-red-600 border border-red-500 rounded-lg hover:bg-red-50 transition">
                          Reject
                        </button>
                      </div>
                    </div>
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

export default ViewApplications