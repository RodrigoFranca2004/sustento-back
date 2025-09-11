import * as authService from "../services/auth.service.js";

export async function register(req, res) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;
    const { resetToken } = await authService.requestPasswordReset(email);
    return res.json({ message: "Reset link sent", resetToken });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    return res.json({ message: "Password reset successful" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
