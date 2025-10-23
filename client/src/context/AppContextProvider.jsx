// AppContextProvider.js
import React, { useEffect } from "react";
import { AppContext } from "./AppContext";
import { useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContextProvider = ({ children }) => {

    const [searchFilter, setSearchFilter] = useState({
        title: "",
        location: ""
    });

    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])
    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);


    //Function to fetch job Data

    const fetchJobs = async () => {
        try {

            setJobs(jobsData);
        } catch (error) {
            console.error("Error fetching job data:", error);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, []);


    const value = {
        setSearchFilter,searchFilter,
        isSearched,setIsSearched,
        jobs,setJobs,
        showRecruiterLogin,setShowRecruiterLogin
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};