import React, {useState} from 'react';
import BasicMenu from "../../components/menus/BasicMenu";
import RegisterComponent from '../../components/member/RegisterComponent';

const RegisterPage = () => {

    return (
        <div className='fixed top-0 left-0 z-[1055] flex flex-col h-full w-full'>
            <BasicMenu />

            <div className="flex flex-wrap w-full h-full justify-center items-center border-2">
                <RegisterComponent />
            </div>
        </div>
    )
}

export default RegisterPage;