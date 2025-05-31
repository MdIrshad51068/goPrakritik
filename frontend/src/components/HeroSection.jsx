import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/components/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [Query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(Query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold text-[#558000] '>Search, Apply & <br /> Get Your <span className='text-[#003300]'>Dream Jobs</span></h1>
                <p>Go Prakritik is dedicated to revolutionizing health and wellness by providing organic and natural products 🌿.</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#558000]">
                        <Search className='h-5 w-5' />
                    </Button>
                    
                </div>
            </div>
        </div>
    )
}

export default HeroSection