import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if(router.pathname !== "/search") {
      setQuery("")
    }
  }, [router.pathname])

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push(`/search?q=${query}`);
    }
  }

  return (
    <section className="bg-white rounded-lg px-4 flex items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleSearch}
        type="text"
        placeholder="Search boxes"
        className="text-xs py-[4px] lg:w-[350px]"
      />
      <Link href={`/search?q=${query}`}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-primary w-[18px]" />
      </Link>
    </section>
  );
}
