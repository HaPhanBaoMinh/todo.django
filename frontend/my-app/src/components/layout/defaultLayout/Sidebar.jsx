import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { v4 as uuidv4 } from 'uuid';
import { BsSun, BsCalendarWeek, BsStar, BsMenuButtonWide } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom';


const taskList = [
    {
        id: 1,
        label: 'My day',
        logo: <BsSun />,
        number: 1,
        path: '/home'
    },
    {
        id: 2,
        label: 'Important',
        logo: <BsStar />,
        number: 0,
        path: '/important'
    },
    {
        id: 3,
        label: 'Planned',
        logo: <BsCalendarWeek />,
        numer: 6,
        path: '/planned'
    },
    {
        id: 4,
        label: 'Tasks',
        logo: <BsMenuButtonWide />,
        numer: 0,
        path: '/tasks'
    }
]

export const Sidebar = ({ onCloseSidebar }) => {
    const location = useLocation();
    const [tasks, setTasks] = useState(taskList);
    const [activeId, setActiveId] = useState(0);

    useEffect(() => {
        if (!tasks) return;
        const selectTask = tasks.find(task => task.path === location.pathname)
        setActiveId(selectTask.id)
    }, [location.pathname])


    return (
        <>
            <div className='w-full h-full bg-white shadow-[0_2px_3px_0px_rgba(0,0,0,0.1)]'>
                {/* Button to close sidebar */}
                <button className=" w-full py-5 flex px-10" onClick={() => onCloseSidebar(false)}>
                    <MenuIcon className='text-2xl' />
                </button>

                {/* Task select */}
                <section className="w-full h-[100px]">
                    {
                        taskList.map(taskListItem =>
                            // Task 
                            <Link to={taskListItem.path}>
                                <div key={uuidv4()} className={
                                    `w-ful py-3 flex justify-between pl-10 pr-5 cursor-pointer
                                 hover:bg-[#e4e4e47d] transition-all ${activeId === taskListItem.id ? "bg-[#0e5e6f47] border-l-4 border-[#3A8891]" : ""}`
                                }>
                                    {/* Task content */}
                                    <div className="w-[90%] flex gap-3 items-center">
                                        {taskListItem.logo}
                                        <p className={`text-sm font-light ${activeId === taskListItem.id ? "font-medium" : ""}`}>{taskListItem.label}</p>
                                    </div>
                                    <p className={`text-sm font-light w-2 ${activeId === taskListItem.id ? "font-medium" : ""}`}>{taskListItem.number}</p>
                                </div>
                            </Link>
                        )
                    }

                </section>
            </div>
        </>
    )
}
