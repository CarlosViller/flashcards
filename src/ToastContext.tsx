import { createContext } from "react";
import { Id, toast } from 'react-toastify';

type ToastContextProps = {
  notifyError: (message: string) => Id,
  notifySuccess: (message: string) => Id
}

const ToastContext = createContext<ToastContextProps>({
  notifyError: (message) => message,
  notifySuccess: (message) => message
})

function ToastProvider({children}: {children: React.ReactNode}){

  const notifyError = (message: string) => toast.error(message)
  const notifySuccess = (message: string) => toast.success(message)

  return (
    <ToastContext.Provider value={{notifyError, notifySuccess}}>
      {children}
    </ToastContext.Provider>
  )
}

export {ToastContext, ToastProvider}