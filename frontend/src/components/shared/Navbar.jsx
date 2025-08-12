import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import Bee from '../../assets/Bee.png';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/components/utils/constant.js'
import { setUser } from '@/components/redux/authSlice.js'
import { toast } from 'sonner'
import dotenv from 'dotenv'
dotenv.config()

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${process.env.USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-[#558000]'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div className='flex items-center'>
                    <h1 className='text-2xl font-bold text-white'>GO <span className='text-WHITE'>PRAKRITIK</span></h1>
                    <img src={Bee} alt="not found" className='w-15 h-15' />
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user?.role === 'admin' ? (
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            ) : user?.role === 'empoly' ? (
                                <>
                                    <li><Link to="/" className='text-white'>Home</Link></li>
                                    <li><Link to="/jobs" className='text-white'>Jobs</Link></li>
                                    <li><Link to="/browse" className='text-white'>Browse</Link></li>
                                </>
                            ) : null


                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <ul className='flex font-medium items-center gap-5'>
                        {
                            user?.role === 'admin' ? (
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            ) : user?.role === 'empoly' ? (
                                <>
                                    <li><Link to="/" className='text-white'>Home</Link></li>
                                    <li><Link to="/jobs" className='text-white'>Jobs</Link></li>
                                    <li><Link to="/browse" className='text-white'>Browse</Link></li>
                                </>
                            ) : null


                        }


                    </ul>

                                <Link to="/login"><Button variant="outline" className="hover:bg-[#c2d6d6]">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#264d00] hover:bg-[#336600] text-white">Signup</Button></Link>


                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />

                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />

                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>

                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'empoly' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>

                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>

                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar