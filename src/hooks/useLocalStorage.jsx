"use client";
import { useEffect, useState } from "react";

function getSavedValue(key, initialValue) {
  let savedValue = initialValue;
  if (localStorage.getItem(key)) {
    savedValue = JSON.parse(localStorage.getItem(key) || "");
  }

  return savedValue;
}
function useLocalStorage(key = "", initialValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;
