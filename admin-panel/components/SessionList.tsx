import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface IMeeting {
  id: string;
  meetingId: string;
  topic: string;
  date: Date;
  rakiId: string;
  userId: string;
  notificationSend: boolean;
  status: string;
  note: string;
}

export const SessionList = ({ sessions }: { sessions: IMeeting[] }) => {
  return (
      <div className={cn(
          "grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3"
      )} >
      {sessions.map((session) => (
        <Card
          key={session.id}
          className={cn(
              "flex m-3 flex-col h-full w-full min-w-[18rem] max-w-[22rem] cursor-pointer select-none space-y-2 overflow-hidden rounded-3xl p-4 transition-colors duration-300 ease-in-out hover:border-primary-200 hover:bg-primary-50/60 active:border-primary-300 "
          )}
        >
          <img
            alt="cover"
            src={"/images/makka.png"}
            className={cn("h-44 w-full rounded-2xl object-cover")}
          />

          <div
            className={cn("flex items-center gap-2.5 text-sm font-semibold")}
          >
            <span className={cn("flex items-center gap-2")}>
              <img
                alt="trophy"
                src="/icons/filled/trophy.svg"
                className={cn("size-5 object-cover")}
              />
              {/*{session ? sessions?.name : 5} CME Points*/}
            </span>
          </div>

          <div className={cn("space-y-1")}>
            <CardTitle
              className={cn("line-clamp-2 text-base leading-tight lg:text-lg")}
            >
              {session
                ? session?.topic
                : "Vivamus ex augue tempus id diam at, dictum cursus metus"}
            </CardTitle>

            <CardDescription className={cn("line-clamp-1 font-normal")}>
              {session?.topic || "N/A"}
            </CardDescription>
          </div>

          <CardDescription className={cn("line-clamp-3")}>
            {session
              ? session?.topic
              : "Praesent non orci eu augue egestas lobortis. Fusce dapibus, urna non dignissim ultrices, libero dolor porta tellus, eget tincidunt mi."}
          </CardDescription>

          <CardDescription
            className={cn("!mt-auto flex items-center gap-2 pt-3")}
          >
            {/*<span>*/}
            {/*  {formatDurationFromSeconds(course ? course?.duration : 278)} total*/}
            {/*  time*/}
            {/*</span>*/}

            {/*<StudentCountLabel count={Number(course?.enrollmentCount)} />*/}
          </CardDescription>
        </Card>
      ))}
    </div>
  );
};
