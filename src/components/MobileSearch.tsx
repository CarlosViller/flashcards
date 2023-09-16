import { MobileSearchContext } from "@/MobileSearchContext";
import React, { useContext, useEffect } from "react";
import SearchBar from "./shared/SearchBar";

export default function MobileSearch() {
  const { mobileSearch, toggleMobileSearch } = useContext(MobileSearchContext);

  if(!mobileSearch) return null

  return (
    <dialog className="bg-transparent absolute z-50 w-full h-screen backdrop-blur flex flex-col items-center justify-center gap-4">
      <SearchBar />
      <button onClick={toggleMobileSearch} className="text-primary font-semibold text-lg">Close</button>
    </dialog>
  );
}
