import BasicMenu from "../../components/menus/BasicMenu";

const HelloPage = () => {

    return(
        <div className='fixed top-0 left-0 z-[1055] flex flex-col h-full w-full'>

            <BasicMenu />

            <div className="flex flex-wrap w-full h-full justify-center items-center border-2">
                <h1>SSR 테스트</h1>
            </div>
        </div>
    );
}

export default HelloPage;