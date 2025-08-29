import React from 'react'
import axios from 'axios';
const NewsPage = () => {
    const endpoint = "https://polytikka-production.up.railway.app/api/allnews";

    // Function to fetch data
    async function getTopReads() {
        try {
            const response = await axios.get(endpoint);
            // API se aaya data return kar
            return response.data;
        } catch (error) {
            console.error("Error fetching top reads:", error);
            return null;
        }
    };


    React.useEffect(() => {
        getTopReads();
    }, []);
    return (
        <div>

        </div>
    )
}

export default NewsPage
