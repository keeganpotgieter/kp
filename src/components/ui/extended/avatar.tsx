import { auth } from "@/server/auth";
import Image from "next/image";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user || !session.user.image) return null;

  return (
    <div>
      <Image src={session.user.image} alt="User Avatar" />
    </div>
  );
}
