import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoApi";

const KaKaoLoginComponent = () => {

    const link = getKakaoLoginLink()

    return (
        <div className="flex flex-col">

            <div className="flex justify-center w-full">
                <div className="m-2">
                <Link to={link}>
                <img src={process.env.PUBLIC_URL + '/kakao_login_medium_wide.png'} 
                        alt="카카오로그인"/>
                </Link>
                </div>
            </div>
            <div className="text-center text-blue-500">
                로그인시에 자동 가입처리 됩니다
            </div>
        </div>
    )
}

export default KaKaoLoginComponent;