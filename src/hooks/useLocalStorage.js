import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue){
    // 1. Inicialización: Leemos el valor guardado
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // Si existe, lo parseamos, si no, usamos el valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]); // Dependencias: key (por si cambia) y el valor del estado.

  // Devolvemos el estado y su setter (igual que useState)
  return [storedValue, setStoredValue];
}