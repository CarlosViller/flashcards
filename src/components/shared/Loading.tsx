import Spinner from "./Spinner";

export default function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}
