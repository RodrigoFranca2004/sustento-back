import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { transporter } from "../config/mailer.js";
import { createLog } from "./log.service.js";

export async function register(data) {
    const { name, email, password} = data;

    const existing = await prisma.users.findUnique({
        where: {email}
    });
    if (existing) throw new Error("Email already in use")

    const hash = await bcrypt.hash(password, 10);

    return await prisma.users.create({
        data: {
            name,
            email,
            hash_password: hash,
        },
        select: {
            user_id: true,
            name: true,
            email: true,
            created_at: true,
        }
    });

}

export async function login(email, password) {
    const user = await prisma.users.findUnique({ where: {email}});
    if (!user) throw new Error("Invalid email or password");

    const valid = await bcrypt.compare(password, user.hash_password);
    if (!valid) throw new Error("Invalid email or password");

    const token = jwt.sign(
        { userId: user.user_id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: "1h"}
    );

    await createLog({
        message: "USER HAS SUCCESSFULLY LOGGED IN",
        user_id: user.user_id
      });

    return {token, id: user.user_id};
}

export async function requestPasswordReset(email) {
    const user = await prisma.users.findUnique({where: {email}});
    if (!user) throw new Error("Email not found");

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15);

    await prisma.passwordResets.create({
        data: { user_id: user.user_id, token, expiresAt}
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

    await transporter.sendMail({
        from: `"Suporte" <$process.env.SMTP_USER>`,
        to: email,
        subject: "Reset de senha",
        text: `Clique no link para alterar sua senha: ${resetLink}`,
        html: `<p>Clique no link para alterar sua senha:</p>
        <a href="${resetLink}">${resetLink}</a>`
    });

    await createLog({
        message: "A PASSWORD RESET EMAIL WAS SENT TO THE USER",
        user_id: user.user_id
      });
    
    return {message: "Reset link sent to email"};
}

export async function resetPassword(token, newPassword) {
    const reset = await prisma.passwordResets.findUnique({where: {token}});
    if (!reset) throw new Error("Invalid token");
    if (reset.expiresAt < new Date()) throw new Error("Expired token");

    const hash = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
        where: {user_id: reset.user_id},
        data: { hash_password: hash}
    });

    await createLog({
        message: "THE USER PASSWORD WAS SUCCESSFULLY UPTATED",
        user_id: reset.user_id
      });

    return await prisma.passwordResets.delete({where: {id: reset.id}});
}




