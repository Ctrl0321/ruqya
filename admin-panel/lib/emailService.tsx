import emailjs from '@emailjs/browser';

interface EmailParams {
    name: string;
    email: string;
    message: string;
}

export const sendEmail = async ({ name, email, message }: EmailParams): Promise<boolean> => {
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    try {
        const emailParams = { name, email, message };
        const res = await emailjs.send(serviceID, templateID, emailParams, userID);

        if (res.status === 200) {
            return true;
        }
    } catch (error) {
        toast.error("Failed to send message. Please try again later.");
        console.error("EmailJS Error:", error); // Log error for debugging
    }
    return false;
};
