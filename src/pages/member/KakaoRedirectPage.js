import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
//import { useDispatch } from "react-redux";
//import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {

    const [searchParams] = useSearchParams()
    //const dispatch = useDispatch()

    const {moveToPath, saveAsCookie} = useCustomLogin()

    const authCode = searchParams.get("code")

    useEffect(() => {
        getAccessToken(authCode).then(accessToken => {
            console.log(accessToken)

            getMemberWithAccessToken(accessToken).then(memberInfo => {

                console.log("-----------------------")
                console.log(memberInfo)

                //dispatch(login(memberInfo))
                saveAsCookie(memberInfo)

                // 소셜 회원이 아니라면
                if(memberInfo && !memberInfo.social) {
                    moveToPath("/")
                } else {
                    moveToPath("/member/modify")
                }
            })
        })
    }, [authCode])

    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{authCode}</div>
        </div>
    )
}

export default KakaoRedirectPage;