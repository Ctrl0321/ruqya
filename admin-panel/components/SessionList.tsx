import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Calendar, Clock, Video } from "lucide-react"

export const SessionList = ({ sessions }: { sessions: any[] }) => {
    return (
        <>
            {sessions.map((session) => (
                <Card key={session.id}>
                    <CardHeader>
                        <CardTitle>{session.title}</CardTitle>
                        <CardDescription>
                            {format(new Date(session.date), "MMM dd, yyyy")} - {session.rakiName}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Badge>{session.status}</Badge>
                                <Clock className="h-4 w-4" /> {session.duration} min
                            </div>
                            <img src={session.image || "/placeholder.svg"} alt={session.title} className="h-20 w-auto rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}

