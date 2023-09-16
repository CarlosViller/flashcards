import { createContext, useState } from "react";

const initialValue = {
  mobileSearch: false,
  toggleMobileSearch: () => {},
};

export const MobileSearchContext = createContext(initialValue);

type Props = {
  children: React.ReactNode;
};
export function MobileSearchProvider({ children }: Props) {
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <MobileSearchContext.Provider
      value={{
        mobileSearch,
        toggleMobileSearch: () => setMobileSearch(!mobileSearch),
      }}
    >
      {children}
    </MobileSearchContext.Provider>
  );
}
