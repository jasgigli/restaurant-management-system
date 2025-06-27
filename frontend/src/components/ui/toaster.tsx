import React, { createContext, useCallback, useState } from "react";

interface Toast {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
}

export const ToastContext = createContext<{
  toast: (message: string, type?: Toast["type"]) => void;
} | null>(null);

export const ToasterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toast = useCallback((message: string, type?: Toast["type"]) => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
    setTimeout(() => setToasts((prev) => prev.slice(1)), 3500);
  }, []);
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded shadow text-white font-medium transition-all
              ${
                t.type === "success"
                  ? "bg-green-600"
                  : t.type === "error"
                  ? "bg-red-600"
                  : "bg-gray-800"
              }
            `}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
