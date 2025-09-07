import React, { createContext, useContext, useState } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

const ToastContext = createContext()

export const useToast = () => {
  return useContext(ToastContext)
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'success') => {
    const id = Date.now()
    const toast = { id, message, type }

    setToasts(prev => [...prev, toast])

    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id)
    }, 3000)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 p-4 rounded-lg shadow-lg min-w-80 ${toast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <XCircle size={20} />
            )}
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="hover:opacity-70 transition"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}