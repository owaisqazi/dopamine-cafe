import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode[]|ReactNode;
  maxWidth?: string;
}
export default function Modal({ isOpen, onClose, children, maxWidth = "max-w-5xl" }: ModalProps) {
  // ... useEffect wala code ...

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
       <div className={`bg-white w-full ${maxWidth} rounded-xl shadow-2xl overflow-hidden relative`} 
            onClick={(e) => e.stopPropagation()}>
         {children}
       </div>
    </div>
  );

  // Yeh modal ko 'body' ke andar bhej dega taake stacking context ka masla khatam ho jaye
  return createPortal(modalContent, document.body);
}