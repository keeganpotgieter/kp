import { Button } from "../button";
import GitHubIcon from "@/components/icons/github";
import { auth, signIn, signOut } from "@/server/auth";
import { MoveRightIcon } from "lucide-react";

export async function UserAuthButton() {
  const session = await auth();

  return (
    <form
      action={async () => {
        "use server";
        if (session) {
          await signOut();
        } else {
          await signIn("github");
        }
      }}
    >
      {!session ? (
        <Button variant={"shadow"} type="submit" className="gap-2">
          <GitHubIcon width={20} height={20} className="fill-primary" />
          <span>Sign in with GitHub</span>
          <MoveRightIcon className="h-4 w-4 transition group-hover:-rotate-45" />
        </Button>
      ) : (
        <Button
          variant={"shadow"}
          type="submit"
          className="flex items-center gap-2"
        >
          <span>Sign out</span>
          <MoveRightIcon className="h-4 w-4 transition group-hover:-rotate-45" />
        </Button>
      )}
    </form>
  );
}
