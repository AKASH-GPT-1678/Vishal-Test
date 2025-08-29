"use client"
import React from 'react'
import axios from 'axios';
import { set } from 'zod';
// types.ts
export interface TopRead {
    id: string;
    title: string;
    content: string;
    category: string;
    source: string;
    url: string;
    imageUrl: string;
    reads: number;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}
const NewsPage = () => {
    const [newsData, setNewsData] = React.useState<TopRead[]>([]);
    const endpoint = "https://polytikka-production.up.railway.app/api/allnews";

    // Function to fetch data
    async function getTopReads() {
        try {
            const response = await axios.get(endpoint);
            // API se aaya data return kar
            console.log(response.data);
            setNewsData(response.data.data);
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
        <div className='flex flex-row flex-wrap gap-4 p-8'>
            {
                newsData.length > 0 && (
                    newsData.map((news: TopRead, index) => (
                        <div key={index} className='flex flex-col max-w-[300px] rounded-2xl shadow-xl p-2 ' onClick={()=>window.open(news.url)}>
                            <img src={news.imageUrl} alt={news.title} />
                            <h1>{news.title}</h1>
                            <p>{news.content.substring(0, 100)}</p>
                            <p>{news.category}</p>
                            <p>{news.source}</p>
                      
                         
                            <p>{news.publishedAt}</p>
                           
                        </div>
                    ))
                )
            }


        </div>
    )
}

export default NewsPage
