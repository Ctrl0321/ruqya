import emailjs from "@emailjs/browser";

export const sendEmail = async (templateID, params) => {
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

    if (!serviceID || !userID) {
        console.error("EmailJS service ID or user ID is missing.");
        return false;
    }

    try {
        // Convert EmailParams to Record<string, string>
        const formattedParams = Object.fromEntries(
            Object.entries(params)
                .filter(([_, value]) => value !== undefined) // Remove undefined values
                .map(([key, value]) => [key, String(value)]) // Convert values to strings
        );

        const res = await emailjs.send(serviceID, templateID, formattedParams, userID);

        if (res.status === 200) {
            return true;
        }
    } catch (error) {
        console.error("EmailJS Error:", error);
    }
    return false;
};

export const sendMeetingEmail = async (
    user_email,
    raki_email,
    name,
    raki_name,
    date,
    message,
    heading
) => {
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_MEETING;

    if (!templateID) {
        console.error("Email template ID is missing.");
        return false;
    }

    return sendEmail(templateID, {
        user_email,
        raki_email,
        name,
        raki_name,
        date,
        message,
        heading
    });
};
