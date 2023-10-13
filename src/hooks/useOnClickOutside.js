import { useEffect } from "react";

export default function useOnClickOutside(ref, handler){
  useEffect(()=>{
    const listener = e => {
      /* 클릭 시 모달 창 안이면 */
      if(!ref.current || ref.current.contains(e.target)) return

      handler()

    }
    document.addEventListener('mousedown',listener)
    document.addEventListener('touchstart',listener)

    return ()=>{
      document.removeEventListener('mousedown',listener)
      document.removeEventListener('touchstart',listener)
    }

  },[ref, handler])
}