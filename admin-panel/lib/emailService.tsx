import emailjs from "@emailjs/browser";
import { toast } from "@/components/ui/toast";

interface EmailParams {
    name?: string;
    email: string;
    rakiName?:string;
    otp?: string;
    message?: string;
    classDate?: string;
    reason?: string;
    heading:string;
}

export const sendEmail = async (
    templateID: string,
    params: EmailParams
): Promise<boolean> => {
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    try {
        // Convert EmailParams to Record<string, string>
        const formattedParams: Record<string, string> = Object.fromEntries(
            Object.entries(params)
                .filter(([_, value]) => value !== undefined)
                .map(([key, value]) => [key, String(value)])
        );

        const res = await emailjs.send(serviceID, templateID, formattedParams, userID);

        if (res.status === 200) {
            return true;
        }
    } catch (error) {
        toast({
            title: "Email failed",
            description: "Failed to send message. Please try again later.",
        });
        console.error("EmailJS Error:", error);
    }
    return false;
};



// Send OTP Email
export const sendOtpEmail = async (email: string, otp: string,heading:string) => {
    return sendEmail(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_OTP!, { email, otp,heading });
};

// Send Verification Email
export const sendVerificationEmail = async (email: string, name: string,heading:string) => {
    return sendEmail(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_VERIFICATION!, {
        email,
        name,
        message: `Dear ${name}, please verify your email to activate your account.`,
        heading
    });
};

export const sendMeetingEmail = async (
    email: string,
    classDate: string,
    message: string,
    heading:string,
    rakiName:string
) => {
    return sendEmail(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_MEETING!, {
        email,
        classDate,
        message,
        heading,
        rakiName
    });
};

// Send Class Cancellation Email
export const sendClassCancellationEmail = async (email: string, reason: string,heading:string) => {
    return sendEmail(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CANCEL!, {
        email,
        reason,
        message: `Your class has been canceled due to ${reason}.`,
        heading
    });
};
