import { useDispatch, useSelector } from "react-redux";
import { Navigate, createSearchParams, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";
import { loginPost } from "../api/memberApi";
import { removeCookie, setCookie } from "../util/cookieUtil";
//import { useRecoilState, useResetRecoilState } from "recoil";
import signinState from "../atoms/signinState";
import { cartState } from "../atoms/cartState";

const useCustomRegister = () => {

    const doRegister = () => {

    }

    const moveToPath = () => {

    }

    const moveToRegister = () => {

    }

    const moveToRegisterReturn = () => {

    }

    const exceptionHandler = () => {

    }

    
    return {doRegister, moveToPath, moveToRegister, moveToRegisterReturn, exceptionHandler}
}

export default useCustomRegister;