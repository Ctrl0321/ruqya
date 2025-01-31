export const  getStreamAdminRole = (user: { role: string }) => {
    if (user.role === "admin") {
        return "host";
    } else if (user.role === "super-admin") {
        return "admin";
    } else {
        return "user";
    }
};
