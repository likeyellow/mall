import { useState } from "react";
import DaumPostcode from 'react-daum-postcode'

const AddressInput = ({onComplete, isOpen, toggleHandler}) => {

    const themeObj = {
        bgColor: "", 			// 바탕 배경색
        searchBgColor: "", 		// 검색창 배경색
        contentBgColor: "", 		// 본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
        pageBgColor: "", 		// 페이지 배경색
        textColor: "", 			// 기본 글자색
        queryTextColor: "", 		// 검색창 글자색
        postcodeTextColor: "", 	// 우편번호 글자색
        emphTextColor: "", 		// 강조 글자색
        outlineColor: "" 		// 테두리
    }

    const closeHandler = (state) => {
        if(state === 'FORCE_CLOSE' || state === 'COMPLETE_CLOSE') {
            toggleHandler();
        }
    }

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
    }

    const postCodeStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '460px',
        height: '480px',
        border: '1px solid #000000',
        // zIndex: 100, // 팝업 내부의 zIndex 설정
        backgroundColor: '#FFFFFF', // 팝업 내부 배경색
        color: '#000000', // 글자색
    }

    const completeHandler = (data) => {
        const {address, zonecode} = data
        onComplete({address, zonecode})
        toggleHandler()
    }

    return (
        <div style={popupWrapperStyle}>
            <div style={postCodeStyle}>
                {/* X 버튼 추가 */}
                <button
                    className="absolute top-0 right-0 bg-gray-700 text-white rounded-full p-2 z-50"
                    type="button"
                    onClick={toggleHandler}
                    style={{ transform: 'translate(50%, -50%)' }}
                >
                    X
                </button>

                    <DaumPostcode
                        theme={themeObj}
                        style={postCodeStyle}
                        onComplete={completeHandler}
                        onClose={closeHandler}
                    />

            </div>
        </div>
    );
};
export default AddressInput;

