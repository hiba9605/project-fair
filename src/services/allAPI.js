import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverUrl";

// registerapi
export const registerAPI=async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/register`,reqBody)
}

// loginAPI
export const loginAPI=async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/login`,reqBody)
}


// add-project 
export const addProjectAPI=async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_BASE_URL}/add-project`,reqBody,reqHeader)
}

// homeprojects
export const homeProjectAPI=async ()=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/home-projects`,{})
}


// userprojects
export const userProjectAPI=async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_BASE_URL}/user-projects`,{},reqHeader)
}


// allprojects
export const allProjectAPI=async (reqHeader,searchKey)=>{
    // query parameter of url - ?search=${searchKey}  & query stored in 'search'
    return await commonAPI("GET",`${SERVER_BASE_URL}/all-projects?search=${searchKey}`,{},reqHeader)
}