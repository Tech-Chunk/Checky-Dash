import React from 'react';
import Link from 'next/link';
import './/sidebar.css'

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <a href='/'>Recent Check-ins</a>
            <a>Analytics</a>
            <a>Map</a>
            <a>Settings</a>
        </div>

        
    );
};



export default Sidebar;

