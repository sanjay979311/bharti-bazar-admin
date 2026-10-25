import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { useGetMeQuery } from "../features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const PersistLogin = () => {
    const token = useSelector(selectCurrentToken);
    console.log("token is =========>",token)
    const { isLoading, isError } = useGetMeQuery(undefined, {
        skip: !!token, // Skip the API call if we already have a token in Redux
    });

    if (isLoading) {
        return <div className="loading-spinner">Restoring Session...</div>;
    }

    // Once loading is finished (success or error), render the app
    return <Outlet />;
};

export default PersistLogin;