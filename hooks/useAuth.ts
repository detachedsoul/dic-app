import { useEffect, useState } from "react";

const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const getUserDetails = localStorage.getItem("user-details") ?? "";

            if (!getUserDetails) {
                setIsAuthenticated(false);
				setUserDetails(userDetails);
            } else {
				setIsAuthenticated(true);
				setUserDetails(JSON.parse(getUserDetails));
            }

            setIsLoading(false);
        }
    }, [userDetails]);

    return {
		isLoading,
		userDetails,
		isAuthenticated,
	};
};

export default useAuth;
