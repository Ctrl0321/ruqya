import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Calendar, Clock, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown";
import className = ReactMarkdown.propTypes.className;

export const SessionList = ({ sessions }: { sessions: any[] }) => {
    return (
        <>
            {sessions.map((session) => (
                // <Card key={session.id}>
                //     <CardHeader>
                //         <CardTitle>{session.title}</CardTitle>
                //         <CardDescription>
                //             {format(new Date(session.date), "MMM dd, yyyy")} - {session.rakiName}
                //         </CardDescription>
                //     </CardHeader>
                //     <CardContent>
                //         <div className="flex items-center justify-between">
                //             <div className="flex items-center gap-2">
                //                 <Badge>{session.status}</Badge>
                //                 <Clock className="h-4 w-4" /> {session.duration} min
                //             </div>
                //             <img src={session.image || "/placeholder.svg"} alt={session.title} className="h-20 w-auto rounded-md" />
                //         </div>
                //     </CardContent>
                // </Card>
                <Card
                    className={cn(
                        "flex h-full w-full min-w-80 max-w-[25rem] cursor-pointer select-none flex-col space-y-2 overflow-hidden rounded-3xl p-4 transition-colors duration-300 ease-in-out hover:border-primary-100 hover:bg-primary-50/60 active:border-primary-300 lg:space-y-3.5",
                        className,
                    )}
                >
                    <img
                        alt="cover"
                        src={
                        "/images/course-card.jpeg"
                        }
                        className={cn("h-44 w-full rounded-2xl object-cover")}
                    />

                    <div
                        className={cn("flex items-center gap-2.5 text-sm font-semibold")}
                    >
        <span
            className={cn("flex items-center gap-2")}
        >
          <img
              alt="trophy"
              src="/icons/filled/trophy.svg"
              className={cn("size-5 object-cover")}
          />
            {/*{session ? sessions?.name : 5} CME Points*/}
        </span>

                        {/* TODO: Temporarily disabled review score */}
                        {/* <span>•</span>

        <span
          className={cn("flex items-center gap-2", {
            "gap-1": size === "sm",
          })}
        >
          <StarFilledIcon className="size-4 text-status-yellow" />
          {course ? course?.averageReviewScore : "4.8"}
          <span className="text-xs font-light text-dark-300">
            ({formatReviewCount(course ? course?.totalReviewCount : "4000")}{" "}
            reviews)
          </span>
        </span> */}
                    </div>

                    <div
                        className={cn("space-y-1")}
                    >
                        <CardTitle
                            className={cn("line-clamp-2 text-base leading-tight lg:text-lg")}
                        >
                            {session
                                ? session?.title
                                : "Vivamus ex augue tempus id diam at, dictum cursus metus"}
                        </CardTitle>

                        <CardDescription
                            className={cn("line-clamp-1 font-normal")}
                        >
                            {session?.name || "N/A"}
                        </CardDescription>
                    </div>

                    <CardDescription
                        className={cn("line-clamp-3")}
                    >
                        {session
                            ? session?.tagline
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
        </>
    )
}

