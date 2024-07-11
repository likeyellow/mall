import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginPostAsync } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import KaKaoLoginComponent from "./KakaoLoginComponent";

const RegisterComponent = () => {


    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <h1>회원가입 페이지</h1>
        </div>      
    )
}

export default RegisterComponent;