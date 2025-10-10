export interface LoginFormProps{
    onSubmit:(user:string,pswd:string)=>Promise<void>|void;
}