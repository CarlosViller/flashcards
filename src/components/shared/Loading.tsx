import Header from "./Header";
import Spinner from "./Spinner";

export default function Loading() {
  return (
    <>
      <div className="h-screen w-full grid place-items-center">
        <Spinner />
      </div>
    </>
  );
}
