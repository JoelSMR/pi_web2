export interface LoaderContextValue{
    isLoading: boolean;
    ToggleLoaderOn:(mensaje:string)=>void;
    ToggleLoaderOff:()=>void;
    setLoading:(newValue : boolean)=>void|Promise<void>

}