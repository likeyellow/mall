import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginPostAsync } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import useCustomRegister from "../../hooks/useCustomRegister";
import { Link } from "react-router-dom";
import AddressInput from '../common/AddressInput';

const RegisterComponent = () => {

    const initState = {
        email: '',
        pw: '',
        confirmPw: '', // 비밀번호 확인 필드 추가
        username: '',
        zonecode: '', // 우편번호
        address: '', // 주소
        detailedAddress: '' // 상세주소
    }
    
    const [registerParam, setRegisterParam] = useState({...initState})

    const {doRegister, moveToPath} = useCustomRegister()

    const [isOpen, setIsOpen] = useState(false) // 주소찾기 모달 열기/닫기 상태
    const [errors, setErrors] = useState({
        email: '',
        pw: '',
        confirmPw: '',
        username: '',
        address: '',
        detailedAddress: ''
    })

    const validateField = (name, value, pwValue) => {
        let error = ''
        switch (name) {
            case 'email':
                if (!value) {
                    error = '이메일은 필수 입력항목입니다.'
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    error = '유효한 이메일 주소를 입력해주세요.'
                }
                break
            case 'pw':
                if (!value) {
                    error = '비밀번호는 필수 입력항목입니다.'
                } else if (value.length < 6) {
                    error = '비밀번호는 최소 6자 이상이어야 합니다.'
                }
                break
            case 'confirmPw':
                if (value && value !== pwValue) {
                    error = '비밀번호가 일치하지 않습니다.'
                } 
                break
            case 'address':
                if (!value) {
                    error = '주소는 필수 입력항목입니다.'
                }
                break
            case 'detailedAddress':
                if(!value) {
                    error = '상세 주소는 필수 입력항목입니다.'
                }
                break
            default:
                break                 
        }
        return error
    }    
        // const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        

    const handleChange = (e) => {
        const {name, value} = e.target

        setRegisterParam({
            ...registerParam,
            [name]: value
        });

        let error
        if (name === 'confirmPw') { // confirmPw 필드에 입력할 때마다 현재 pw 필드의 값과 비교하여 에러 체크
            error = validateField(name, value, registerParam.pw)
        } else { // confirm 필드가 비어있을 때는 에러 메시지를 표시하지 않음
            error = validateField(name, value)
        }
        setErrors({
            ...errors,
            [name]: error
        })

        // pw가 변경되었을 때도 confirmPw 필드의 값을 재검증하여 에러 상태 업데이트
        if(name === 'pw' && registerParam.confirmPw) {
            const confirmPwError = validateField('confirmPw', registerParam.confirmPw, value)
            setErrors(prev => ({
                ...prev,
                confirmPw: confirmPwError
            }))
        }
    }

    const handleAddressComplete = (data) => {
        console.log("주소 선택 완료:", data);
        setRegisterParam({
            ...registerParam,
            zonecode: data.zonecode,
            address: data.address
        });
        setIsOpen(false); // 주소찾기 모달 닫기
    }

    const toggleModal = () => {
        console.log("토글 모달 호출됨, 현재 상태:", isOpen);
        setIsOpen(!isOpen); // 주소찾기 모달 열기/닫기 토글
    }

    const handleClickRegister = () => {
        const newErrors ={}
        Object.keys(registerParam).forEach(key => {
            const error = validateField(key, registerParam[key])
            if(error) {
                newErrors[key] = error
            }
        })
        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // 회원가입 처리 로직
        doRegister(registerParam)
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4 overflow-auto" style={{maxHeight: '100vh'}}>
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
                    placeholder="이메일주소"
                    value={registerParam.email}
                    onChange={handleChange}>
                    </input>
                    <div className="w-1/5 pr-3 text-left"></div>
                    {errors.email && <div className="w-4/5 text-red-600 mt-1">{errors.email}</div>}
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
                    placeholder="비밀번호는 최소 6자리이상 입력"
                    value={registerParam.pw}
                    onChange={handleChange}>                    
                    </input>
                    <div className="w-1/5 pr-3 text-left"></div>
                    {errors.pw && <div className="w-4/5 text-red-600 mt-1">{errors.pw}</div>}
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 py-0 pr-3 text-left font-bold">
                        Confirm Password
                    </div>
                    <input
                        className="w-4/5 p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="confirmPw"
                        type="password"
                        placeholder="비밀번호를 한번더 입력해 주세요"
                        value={registerParam.confirmPw}
                        onChange={handleChange}>
                    </input>
                    <div className="w-1/5 pr-3 text-left"></div>
                    {errors.confirmPw && <div className="w-4/5 text-red-600 mt-1">{errors.confirmPw}</div>}
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
                    placeholder="닉네임"
                    value={registerParam.username}
                    onChange={handleChange}>    
                    </input>
                    <div className="w-1/5 pr-3 text-left"></div>
                    {errors.username && <div className="w-4/5 text-red-600 mt-1">{errors.username}</div>}
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
                               name="zonecode"
                               type={'text'}
                               placeholder="우편번호"
                               value={registerParam.zonecode}
                               readOnly>
                        </input>                 
                        <button
                            className="w-36 rounded bg-green-600 text-xl text-white p-2"
                            type="button"
                            onClick={toggleModal}
                        >
                            주소찾기
                        </button>
                        <AddressInput
                            isOpen={isOpen}
                            onComplete={handleAddressComplete}
                            toggleHandler={toggleModal}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relateve mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-3 text-left font-bold">
                    </div>
                    <input className="w-4/5 p-3 rounded-r border border-solid 
                                        border-neutral-500 shadow-md"
                            name="address"
                            placeholder="주소"
                            type={'text'}
                            value={registerParam.address}
                            readOnly>
                    </input>
                    <div className="w-1/5 pr-3 text-left"></div>
                    {errors.address && <div className="w-4/5 text-red-600 mt-1">{errors.address}</div>}
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
                            placeholder="상세주소"
                            value={registerParam.detailedAddress}
                            onChange={handleChange}>
                    </input>
                    <div className="w-1/5 pr-3 text-left"></div>
                    {errors.detailedAddress && <div className="w-4/5 text-red-600 mt-1">{errors.detailedAddress}</div>}               
                </div>
            </div>  

            <div className="flex justify-center mt-8">
                <div className="relative mb-1 flex w-full justify-center">
                    <div className="w-1/5 p-3 text-left font-blod">
                    </div>
                    <div className="w-4/5 flex justify-center font-bold">
                        <button className="rounded p-4 w-full bg-blue-500 text-xl text-white"
                        onClick={handleClickRegister}>
                            가입하기
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