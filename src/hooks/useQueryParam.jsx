// hooks/useQueryParam.js
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryParam() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getValue = (param) => {
    const value = searchParams.get(param);
    return value ? decodeURIComponent(value) : null;
  };

  const setValue = (param, value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    // handle adding multiple values
    if (Array.isArray(param)) {
      param.forEach((p, ind) => {
        const paramValue = value[ind];
        if (paramValue) {
          newParams.set(p, encodeURIComponent(paramValue));
        } else {
          newParams.delete(p);
        }
      });
    } else {
      // handle single value
      if (value) {
        newParams.set(param, encodeURIComponent(value));
      } else {
        newParams.delete(param);
      }
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return { getValue, setValue };
}
export default useQueryParam;
