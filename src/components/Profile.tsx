import { useCallback, useContext, useEffect, useState } from "react";
import Header from "./shared/Header";
import ProfilePic from "./shared/ProfilePic";
import Loading from "./shared/Loading";
import GridSection from "./shared/GridSection";
import { CardBoxWithCards, SessionUser } from "@/types";
import { ToastContext } from "@/ToastContext";
import MiniBox from "./MiniBox";

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
      const data = await res.json()
      console.log(data)
      setBoxes(data);
    }

    setLoading(false);
    return;
  }, [notifyError]);

  useEffect(() => {
    fetchBoxes();
  }, [fetchBoxes]);

  if (!user) {
    return (
      <>
        <Header />
        <h1>User not found</h1>
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center pt-10 text-center gap-4 container mx-auto">
        <ProfilePic size={100} image={user.image} />
        <div>
          <h1 className="text-2xl">{user.name}</h1>
        </div>
        <div className="flex justify-between gap-10">
          <div className="flex flex-col">
            {loading ? (
              <Loading />
            ) : (
              <>
                <h2 className="text-xl font-medium">Boxes</h2>
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
