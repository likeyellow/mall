import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginPostAsync } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import useCustomRegister from "../../hooks/useCustomRegister";
import { Link } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';

const RegisterComponent = () => {

    // const [user, setUser] = useState({
    //     username: '',
    //     password: '',
    //     email: ''
    // });

    // const handleChange = (e) => {
    //     const {name, value} = e.target
    //     setUser({
    //         ...user,
    //         [name]: value
    //     });
    // };
    const initState = {
        email: '',
        pw: '',
        username: '',
        zonecode: '', // 우편번호
        address: '', // 주소
        detailedAddress: '' // 상세주소
    }
    
    const [registerParam, setRegisterParam] = useState({...initState})
    const [isOpen, setIsOpen] = useState(false) // 주소찾기 모달 열기/닫기 상태

    const {doRegister, moveToPath} = useCustomRegister()

    const handleChange = (e) => {
        // registerParam[e.target.name] = e.target.value
        // setRegisterParam({...registerParam})
        setRegisterParam({
            ...registerParam,
            [e.target.name]: e.target.vaule
        });
    }

    const [error, setError] = useState()

    const handleComplete = (data) => {
        setRegisterParam({
            ...registerParam,
            zonecode: data.zonecode,
            address: data.address
        });
        setIsOpen(false); // 주소찾기 모달 닫기
    }

    const toggleModal = () => {
        setIsOpen(!isOpen); // 주소찾기 모달 열기/닫기 토글
    }

    const handleClickRegister = () => {
        // 회원가입 처리 로직
    }


    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">
                    회원가입
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 py-3 pr-3 text-left font-bold">Email</div>
                    <input className="w-4/5 p-3 rounded-r border 
                            border-solid border-neutral-500 shadow-md"
                    name="email"
                    type={'text'}
                    value={registerParam.email}
                    onChange={handleChange}>
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 py-3 pr-3 text-left font-bold">
                        Password
                    </div>
                    <input className="w-4/5 p-3 rounded-r border border-solid
                             border-neutral-500 shadow-md"
                    name="pw"
                    type={'password'}
                    value={registerParam.pw}
                    onChange={handleChange}>                    
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relateve mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 py-3 pr-3 text-left font-bold">
                        Username
                    </div>
                    <input className="w-4/5 p-3 rounded-r border border-solid
                             border-neutral-500 shadow-md"
                    name="username"
                    type={'text'}
                    value={registerParam.username}
                    onChange={handleChange}>    
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relateve mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 py-3 pr-3 text-left font-bold">
                        Address
                    </div>
                    <div className="w-4/5 flex">
                        <input className="mr-3 p-3 rounded-r border border-solid 
                                        border-neutral-500 shadow-md"
                               name="address"
                               type={'text'}
                               value={registerParam.address}
                               readOnly>
                        </input>                 
                        <button className="w-36 rounded 
                                         bg-blue-500 text-xl text-white"
                                onClick={toggleModal}>
                            주소찾기
                        </button>
                    </div>

                    
                    {isOpen && (
                        <div className="flex justify-center">
                            <DaumPostcode 
                            onComplete={handleComplete}
                            style={{width: '360px', height: '480px'}}
                            animation={true}
                            autoClose={true}/>  
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relateve mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-3 text-left font-bold">
                    </div>
                    <input className="w-4/5 p-3 rounded-r border border-solid 
                                        border-neutral-500 shadow-md"
                            name="address"
                            type={'text'}
                            value={registerParam.address}
                            readOnly>
                    </input>
                </div>     
            </div>    
            <div className="flex justify-center">
                <div className="relateve mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-3 text-left font-blod">
                    </div>
                    <input className="w-4/5 p-3 rounded-r border border-solid
                                     border-neutral-500 shadow-md"
                            name="detailedAddress"
                            type={'text'}
                            value={registerParam.detailedAddress}
                            onChange={handleChange}>
                    </input>               
                </div>
            </div>  


            <div className="flex justify-center">
                <div className="relative mb-1 flex w-full flex-wrap items-stretch">
                    {error && <label className="text-red-600 font-bold">{error}</label>}
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-1 flex w-full justify-center">
                    <div className="w-4/5 p-6 flex justify-center font-bold">
                        <button className="rounded p-4 bg-blue-500 text-xl text-white"
                        onClick={handleClickRegister}>
                            REGISTER
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-4/5 p-6 flex justify-center font-bold">
                    <Link to="/member/login" className="text-blue-500">
                        로그인 페이지로 이동
                    </Link>
                </div>
            </div>

        </div>      
    )
}

export default RegisterComponent;