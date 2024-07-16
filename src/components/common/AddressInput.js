import { useState } from "react";
import DaumPostcode from 'react-daum-postcode'

const AddressInput = (props) => {
    const [zonecode, setZonecode] = useState('')
    const [address, setAddress] = useState('')
    const [detailedAddress, setDetailedAddress] = useState('')
    const [isOpen, setIsOpen] = useState('false')

    const themeObj = {
        bgColor: '#FFFFFF',
        pageBgColor: '#FFFFFF',
        postcodeTextColor: '#C05850',
        emphtextColor: '#222222'
    }

    const closeHandler = (state) => {
        if(state === 'FORCE_CLOSE') {
            setIsOpen(false)
        } else if(state === 'COMPLETE_CLOSE') {
            setIsOpen(false)
        }
    }

    const toggleHandler = () => {
        setIsOpen((prevOpenState) => !prevOpenState)
    }

    const inputChangeHandler = (e) => {
        setDetailedAddress(e.target.value);
    }
    const postCodeStyle = {
        width: '360px',
        height: '480px'
    }

    const completeHandler = (data) => {
        const {address, zonecode} = data;
        setZonecode(zonecode)
        setAddress(address)
    }


    return (
        <div>
            <div>{zonecode}</div>
            <button 
                type={'button'}
                onClick={toggleHandler}
            >
                주소 찾기
            </button>
            {isOpen && (
                <div>
                    <DaumPostcode
                        theme={themeObj}
                        style={postCodeStyle}
                        onComplete={completeHandler}
                        onClose={closeHandler}
                    />
                </div>    
            )}
            <div>{address}</div>
            <input
                value={detailedAddress}
                onChange={inputChangeHandler}
            />
        </div>          
    );
};

export default AddressInput;

