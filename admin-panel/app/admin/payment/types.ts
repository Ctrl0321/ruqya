export interface Meeting {
    id: number
    date: string
    topic: string
    duration: number
    employeeId: number
    employeeName: string
    paymentStatus: "paid" | "unpaid" | "requested"
}

