import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginPostAsync } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import KaKaoLoginComponent from "./KakaoLoginComponent";
import { error } from "jquery";
import { Link } from "react-router-dom";

const initState = {
    email: '',
    pw: ''
};

const LoginComponent = () => {

    const [loginParam, setLoginParam] = useState({...initState})

    const {doLogin, moveToPath} = useCustomLogin()

    //const navigate = useNavigate()
    //const dispatch = useDispatch()

    const handleChange = (e) => {

        loginParam[e.target.name] = e.target.value

        setLoginParam({...loginParam})

    }

    const [error, setError] = useState()

    const handleClickLogin = (e) => {
        //dispatch(login(loginParam)) // 동기화된 호출
        //dispatch(loginPostAsync(loginParam))  // loginSlice의 비동기 호출
        doLogin(loginParam) // loginSlice의 비동기 호출
            //.unwrap()
            .then(data => {
                //console.log("after unwrap.....")
                console.log(data)

                if(data.error) {
                    //alert(data.error)
                    setError(data.error)

                } else {
                    alert("로그인 성공")
                    //navigate({pathname: `/`}, {replace:true}) // 뒤로 가기 했을 때 로그인 화면을 볼 수없게
                    moveToPath('/')
                }
            })
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
                    Login Component
                </div>
            </div>    
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Email</div>
                    <input className="w-full p-3 rounded-r border 
                            border-solid border-neutral-500 shadow-md"
                    name="email"
                    type={'text'}
                    value={loginParam.email}
                    onChange={handleChange}>
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">
                        Password
                    </div>
                    <input className="w-full p-3 rounded-r border border-solid 
                                            border-neutral-500 shadow-md"
                        name="pw"
                        type={'password'}
                        value={loginParam.pw}
                        onChange={handleChange}>
                    </input>               
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    {error && <label className="text-red-600 font-bold">{error}</label>}
                    {/* {error && error === 404 && <label className="text-red-600 font-bold">블라블라2</label>} */}
                </div> 
            </div>

            <div className="flex justify-center">
                <div className="relative mb-1 flex w-full justify-center">
                    <div className="w-4/5 p-6 flex justify-center font-bold">
                        <button
                        className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                        onClick={handleClickLogin}>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>


            <div className="flex justify-center">
                <div className="w-4/5 p-6 flex justify-center font-bold">
                    <Link to="/member/register" className="text-blue-500">
                         회원가입 페이지로 이동
                    </Link>
                </div>
            </div>
            <KaKaoLoginComponent />
        </div>
    );
}

export default LoginComponent;