// import { ThemeToggle } from "@/components/ui/extended/theme-toggle";
// import { UserAuthButton } from "@/components/ui/extended/user-auth";
// import NoUserPinDialogue from "@/components/wall/no-user/no-user-pin-dialogue";
// import UserPinDialogue, {
//   type Pin,
// } from "@/components/wall/user-pin/user-pin-dialogue";
// import { cn } from "@/lib/utils";
// import { auth } from "@/server/auth";
// import { api } from "@/trpc/server";
// import React from "react";

// const TitleComponent: React.FC<{ title: string; avatar: string }> = ({
//   title,
//   avatar,
// }) => {
//   return (
//     <div
//       className={cn(
//         "flex min-h-fit w-fit min-w-fit flex-col items-center justify-center gap-2 rounded-md border border-border",
//       )}
//     >
//       <img src={avatar} alt={title} className="h-10 w-10 object-cover" />
//       <span className="text-sm text-muted-foreground">{title}</span>
//     </div>
//   );
// };

// const WallButton: React.FC<{ pin: Pin; index: number }> = ({ pin, index }) => {
//   return <UserPinDialogue pin={pin} index={index} />;
// };

// const EmptyWallButton: React.FC<{ index: number }> = ({ index }) => {
//   return <NoUserPinDialogue index={index} />;
// };

// const data: (Pin | null)[] = Array(100).fill(null) as (Pin | null)[];

// const WallPage = async () => {
//   const session = await auth();
//   const pinsData = await api.post.getPins();

//   pinsData.forEach((pin) => (data[pin.index] = pin));

//   return (
//     <div className="_bg-black _text-white h-full w-full bg-background p-4">
//       <div className="flex flex-col items-center justify-center gap-2 pb-10">
//         <h1 className="text-center text-4xl">The Wall</h1>
//         {!session ? (
//           <p className="text-center">
//             Sign in with you GitHub account to pin your account to the wall.
//           </p>
//         ) : (
//           <div>
//             Hi there <span className="gradient-text">{session.user.name}</span>.
//             TODO: go to your pin, or show instructions
//           </div>
//         )}

//         <div>
//           <UserAuthButton />
//           <ThemeToggle />
//         </div>
//       </div>

//       <div className="flex flex-wrap justify-evenly gap-4">
//         {data.map((pin, idx) => {
//           if (!pin) {
//             return <EmptyWallButton key={`empty-${idx}`} index={idx} />;
//           }
//           return (
//             <WallButton key={`pin-${pin.index}`} index={pin.index} pin={pin} />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default WallPage;
