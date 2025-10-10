import React from 'react'
import { LoginFormProps } from '../Models/LogInFormModels'

const LogInHeader:React.FC<LoginFormProps> = ({onSubmit}) => {
  const [username,setUsername] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  return (
    <div>LogInHeader</div>
  )
}

export default LogInHeader