export interface LoaderContextValue{
    isLoading: boolean;
    setIsLoading:()=>Promise<void>;
    ToggleLoaderOn:()=>void;
    ToggleLoaderOff:()=>void;
    setLoading:(newValue : boolean)=>void

}