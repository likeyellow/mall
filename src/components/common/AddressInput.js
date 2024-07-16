import { useState, useRef, useEffect } from "react";
import DaumPostcode from 'react-daum-postcode';

const AddressInput = ({ onComplete, isOpen, toggleHandler }) => {

    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(modalRef.current && !modalRef.current.contains(event.target)) {
                toggleHandler()
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } 

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, toggleHandler]);

    if(!isOpen) return null;
    
    const popupWrapperStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)', // 배경을 반투명 검정으로 처리
        zIndex: isOpen ? 999 : -1, // 팝업이 열려 있을 때는 더 높은 zIndex로 설정
        display: isOpen ? 'flex' : 'none', // 팝업이 열려 있을 때만 표시
        justifyContent: 'center',
        alignItems: 'center'
    };

    const postCodeStyle = {
        position: 'relative',
        width: '460px',
        height: '480px',
        border: '1px solid #000000',
        backgroundColor: '#FFFFFF', // 팝업 내부 배경색
        color: '#000000', // 글자색
    };

    const themeObj = {
        bgColor: "", // 바탕 배경색
        searchBgColor: "", // 검색창 배경색
        contentBgColor: "", // 본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
        pageBgColor: "", // 페이지 배경색
        textColor: "", // 기본 글자색
        queryTextColor: "", // 검색창 글자색
        postcodeTextColor: "", // 우편번호 글자색
        emphTextColor: "", // 강조 글자색
        outlineColor: "" // 테두리
    };

    return (
        <div style={popupWrapperStyle}>
            <div ref={modalRef} style={postCodeStyle}>
                <DaumPostcode
                    theme={themeObj}
                    onComplete={(data) => {
                        onComplete(data);
                        toggleHandler();
                    }}
                />
            </div>
        </div>
    );
};
export default AddressInput;
