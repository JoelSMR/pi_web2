'use client'
import dynamic from 'next/dynamic'
import React,{useState} from 'react'
import useLoader from '@/Global/GlobalComponents/UI/Loader/useLoader'
import BarcodeScanner  from 'react-qr-barcode-scanner'


const BarcodeReader: React.FC = () => {
    const [readedData,setReadedData] = useState<string | null>("INGO");
    const [error,setError] = useState<string|DOMException>('');
    //const [RenderLoader,showLoader,hideLoader,loading] = useLoader();

    const handleError=(err:string|DOMException)=>{
      console.log(err)
      if(err=="NotFoundError"|| err instanceof DOMException){
        setError(err)
      }
    }

    /**  The BarcodeScanner have the prop `onUpdate` that receives 2 parameters:
     - `err`: Error wich occurs during the scan (if occurs)
     - `result`: Scan Result, could be null or object with property `text` (string)
    The onUpdate function gets continusly called while the camera is active.
    */ 
      
    
  return (
    <>
    <h1>Scanner</h1>
      {error?(
          <>
          <p>NO camara aquí</p>
          </>
        ):<BarcodeScanner
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setReadedData(result.getText());
          else setReadedData("Not Found");
          console.log(err)
        }}
        onError={(error)=>{handleError(error)}}
        facingMode='user'
      />}
      <p>Jope manin</p>
      <p>{readedData}</p>
    </>
  );
}

export default BarcodeReader
