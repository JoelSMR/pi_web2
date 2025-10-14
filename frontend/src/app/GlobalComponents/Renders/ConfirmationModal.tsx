import React from 'react'

interface ConfirmationModalProps{
    isOpen:boolean;
    onAccept:(id:number)=>void|Promise<void>;
    onClose:()=>void|Promise<void>;
};

const ConfirmationModal:React.FC<ConfirmationModalProps> = ({isOpen, onAccept, onClose}) => {
    if (!isOpen) return null;
    return (
    <React.Fragment>
       <div  
      className="fixed inset-0 z-50 flex items-center justify-center p-4"  
      role="dialog"  
      aria-modal="true"  
    >  
      {/* Overlay */}  
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-0" />  
  
      {/* Contenedor del modal (por encima del overlay) */}  
      <div  
        className={
          'relative z-10 w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl ring-1 ring-black/5 dark:bg-neutral-900 dark:ring-white/10'
        }  
      >  
        <div className="mb-6 text-sm text-gray-700 dark:text-gray-200">  

        <h1>¿Seguro de querer continuar?</h1>


        </div>  
  
        <div className="flex justify-end">  
          <button  
            type="button"  
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"  
          >  
            Rechazar 
          </button>
          
          <button  
            type="button"  
            onClick={()=>onAccept}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"  
          >  
            Aceptar 
          </button>  
        </div>  
      </div>  
    </div>

    </React.Fragment>
  )
}

export default ConfirmationModal