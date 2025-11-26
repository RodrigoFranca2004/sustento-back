import { prisma } from "../config/prisma.js";

export async function createLog({user_id, message, entity_type, entity_id, action }) {
    return await prisma.logs.create({
        data: {
            user_id,
            message,
            entity_type,
            entity_id,
            action,
        },
    });
}