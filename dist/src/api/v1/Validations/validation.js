import { z } from "zod";
export const valUserCreate = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string(),
    name: z.string(),
});
export const valUserEdit = z.object({
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    username: z.string().optional(),
    name: z.string().optional(),
});
export const valUserLogin = z
    .object({
    email: z.string().email().optional(),
    username: z.string().optional(),
})
    .refine((data) => {
    // Se email è presente, username deve essere assente
    if (data.email && data.username) {
        return false;
    }
    // Se email non è presente, username deve essere presente
    if (!data.email && !data.username) {
        return false;
    }
    return true;
}, {
    message: "Either email or username is required, but not both",
    path: ["email", "username"],
});
export const valUserRemove = z.object({
    _id: z.string(),
});
export const valTaskCreate = z.object({
    title: z.string(),
    description: z.string(),
    dateDo: z.date().optional(),
    CreatedAt: z.date().optional(),
    _id: z.string(),
    check: z.boolean().optional(),
    pepole: z.string().array().optional(),
});
//# sourceMappingURL=validation.js.map