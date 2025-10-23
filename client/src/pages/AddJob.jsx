import React, { useState, useRef, useEffect } from 'react';
import { JobCategories, JobLocations } from '../assets/assets';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Bangalore');
  const [category, setCategory] = useState('Programming');
  const [level, setLevel] = useState('Beginner level');
  const [salary, setSalary] = useState(0);
  const [description, setDescription] = useState('');

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write a detailed job description...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ],
        },
      });

      // Update state when content changes
      quillRef.current.on('text-change', () => {
        setDescription(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      category,
      location,
      level,
      salary,
      description,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center items-start">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl space-y-8 border border-gray-100"
      >
        <h1 className="text-3xl font-semibold text-gray-800 text-center">
          Add New Job
        </h1>
        <p className="text-center text-gray-500 mb-4">
          Fill in the job details carefully before publishing.
        </p>

        {/* Job Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Job Title
          </label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Job Description
          </label>
          <div
            ref={editorRef}
            className="bg-white border border-gray-300 rounded-lg min-h-[200px] focus-within:ring-2 focus-within:ring-blue-500 quill-editor"
          ></div>
        </div>

        {/* Category, Location, Level, Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {JobCategories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Location
            </label>
            <select
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {JobLocations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Level
            </label>
            <select
              onChange={(e) => setLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Beginner level">Beginner level</option>
              <option value="Intermediate level">Intermediate level</option>
              <option value="Senior level">Senior level</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Salary
            </label>
            <input
              type="number"
              placeholder="e.g. 100000"
              onChange={(e) => setSalary(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-md cursor-pointer" 
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;