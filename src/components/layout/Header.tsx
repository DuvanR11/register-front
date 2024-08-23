"use client";

import React, { FC } from 'react';
import { Menubar } from 'primereact/menubar';
import { endPointAuthentication } from '@/gateway/endPointAuthentication';
import { useRouter } from 'next/navigation'

export const Header: FC = () => {

    const router = useRouter();

    const handleLogout = () => {
        endPointAuthentication("Login-Out", "")
            .then((data) => {
                router.push('/login');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const items = [
        {
            label: 'Panel',
            icon: 'pi pi-home',
            command: () => { window.location.href = '/' }
        },
        {
            label: 'Servicios',
            icon: 'pi pi-percentage',
            command: () => { window.location.href = '/explorer' }
        },
        {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: handleLogout
        }
    ];
    const sessionDataString = localStorage.getItem("sessionData");
    let sessionData: any = null;

    if (sessionDataString !== null) {
        sessionData = JSON.parse(sessionDataString);
    }

    const start = <img alt="logo" src="https://travel.gloupper.com/images/logo.svg" height="40" className="p-mr-5"></img>;
    const end = (
            <div className="flex items-center gap-4 mr-5">
                <img  
                    style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%' }} 
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt=""
                />
                <div className="font-medium">
                    <div className='mb-1 capitalize'>Hola, { sessionData?.txUserName }</div>
                    <div className="text-sm text-center text-gray-500 dark:text-gray-400">{ sessionData?.txRole }</div>
                </div>
            </div>
    );

    return (
        <Menubar model={items} start={start} end={end} />
    );
}
