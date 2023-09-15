import { useCallback, useContext, useEffect, useState } from "react";
import ProfilePic from "./shared/ProfilePic";
import Loading from "./shared/Loading";
import GridSection from "./shared/GridSection";
import { CardBoxWithCards, SessionUser } from "@/types";
import { ToastContext } from "@/ToastContext";
import MiniBox from "./MiniBox";
import { signOut } from "next-auth/react";

interface Props extends SessionUser {
  id: string;
}

export default function Profile({ user, id }: Props) {
  const { notifyError } = useContext(ToastContext);
  const [loading, setLoading] = useState(true);
  const [boxes, setBoxes] = useState<CardBoxWithCards[]>([]);

  const fetchBoxes = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/user/${id}/cardBoxes`);

    if (!res.ok) {
      notifyError("Unexpected Error");
    } else {
      const data = await res.json();
      setBoxes(data);
    }

    setLoading(false);
    return;
  }, [notifyError]);

  useEffect(() => {
    fetchBoxes();
  }, [fetchBoxes]);

  return (
    <div>
      <div className="flex flex-col items-center pt-10 text-center gap-4 container mx-auto">
        <ProfilePic size={100} image={user.image} />
        <div>
          <h1 className="text-2xl">{user.name}</h1>
          <button
            onClick={() => signOut()}
            className="w-max mx-auto mt-1 text-red-600 border-red-600 border-2 rounded px-2 flex items-center"
          >
            Logout
          </button>
        </div>
        <div className="flex justify-between gap-10">
          <div className="flex flex-col">
            {loading ? (
              <Loading />
            ) : (
              <>
                <h2 className="text-xl font-medium">Boxes</h2>
                <h4 className="text-lg">{boxes.length}</h4>
                <GridSection>
                  {boxes.map((box) => (
                    <MiniBox key={box.id} box={box} />
                  ))}
                </GridSection>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
