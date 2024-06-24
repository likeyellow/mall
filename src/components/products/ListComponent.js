import { useEffect, useState } from "react";
import { getList } from "../../api/productsApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
import PageComponent from "../common/PageComponent";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const initState = {
    dtoList: [],
    pageNumList:[],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const host = API_SERVER_HOST

const ListComponent = () => {

    //const {exceptionHandler} = useCustomLogin()

    // serverData는 나중에 사용
    //const [serverData, setServerData] = useState(initState)

    // for FetchingModal
    //const [fetching, setFetching] = useState(false)
    
    const {moveToLoginReturn} = useCustomLogin()

    const {page, size, refresh, moveToList, moveToRead} = useCustomMove()

    const {isFetching, data, error, isError} = useQuery(
        ['products/list', {page, size, refresh}],  // --- refresh 추가
        () => getList({page, size}),
        {staleTime: 1000 * 5}   // ----- staleTime 추가
    )

    //const queryClient = useQueryClient() // 리액트 쿼리 초기화를 위한 현재 객체

    const handleClickPage = (pageParam) => {

        // if(pageParam.page === parseInt(page)) {
        //     queryClient.invalidateQueries("products/list")
        // }
        moveToList(pageParam)
    }

    if(isError) {
        console.log(error)
        return moveToLoginReturn()
    }

    const serverData = data || initState
  

    // useEffect(() => {
        
    //     setFetching(true)

    //     getList({page,size}).then(data => {
    //         console.log(data)
    //         setServerData(data)
    //         setFetching(false)
    //     }).catch(err => exceptionHandler(err))

    // }, [page, size, refresh])


    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            {/* {fetching? <FetchingModal/> : <></>} */}
            {isFetching? <FetchingModal/> : <></>}

            <div className="flex flex-wrap mx-auto p-6">

                {serverData.dtoList.map(product => 
                    <div key={product.pno}
                    className="w-1/2 p-1 rounded shadow-md border-2"
                    onClick={() => moveToRead(product.pno)}>

                    <div className="flex flex-col h-full">
                        <div className="font-extrabold text-2xl p-2 w-full">
                            {product.pno}
                        </div>
                        <div className="text-1xl m-1 p-2 w-full flex flex-col">

                            <div className="w-full overflow-hidden">
                                <img alt="product"
                                className="m-auto rounded-md w-60"
                                src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`}/>
                            </div>

                            <div className="bottom-0 font-extrabold bg-white">
                                <div className="text-center p-1">
                                    이름: {product.pname}
                                </div>
                                <div className="text-center p-1">
                                    가격: {product.price}
                                </div>        
                            </div>
                            
                        </div>        
                    </div>  
                </div>    
                )}
            </div>
        

            {/* <PageComponent serverData={serverData} movePage={moveToList}> */}
            {/* movePage 속성값으로는 handleClickPage를 전달 */}
            <PageComponent serverData={serverData} movePage={handleClickPage}> 
            </PageComponent>
        </div>
    );
}

export default ListComponent;