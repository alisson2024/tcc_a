import './index.scss';
import React from 'react';

const SideBar = ({ active }) => {

    const closeSidebar = () => {
        active(false);
    };

    return (
        <div className="componente-menuSidebar">
            <div className={`container-sidebar ${active ? 'active' : ''}`}>
                <svg onClick={closeSidebar} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                </svg>

                <div className='itens-menu'>
                    <h1>item 1</h1>
                    <h1>item 1</h1>
                    <h1>item 1</h1>
                    <h1>item 1</h1>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
