import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props: any) => {
    const { Component } = props
    const navigate = useNavigate()

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        const isAuthenticated = userData !== null;
        if(!isAuthenticated){
            navigate('sign-in')
        }
    })

    return (<>
        <div>
            <Component />
        </div>
    </>
    );
};

export default ProtectedRoute;
