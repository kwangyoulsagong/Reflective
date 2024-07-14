import { ReactNode } from "react";
type Props ={children:ReactNode}
export default  function Layout({children}:Props){
    return(
        // unaccess 레이아웃
        <div className="absolute flex  flex-col inset-0 justify-center items-center">
            {children}
        </div>
    )
}