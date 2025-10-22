/**
 * @property isLoading:boolean
 * @property  ToogleLoaderOn : ( mensaje : string ) => void
 * @property  ToogleLoaderOff : (  ) => void
 * @property  setLoading : ( newValue : boolean ) => void | Promise<void>
 */
export interface LoaderContextValue{
    isLoading: boolean;
    ToggleLoaderOn:(mensaje:string)=>void;
    ToggleLoaderOff:()=>void;
    setLoading:(newValue : boolean)=>void|Promise<void>

}