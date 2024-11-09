import { useContext } from "react"
import { isLoadingContext, loadingContextType } from "../Context"

export const useLoadingContext = () : loadingContextType => {
    const context = useContext(isLoadingContext);

    if(context === undefined) {
        throw new Error ("Context is not defined")
    }

    return context
}