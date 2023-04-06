import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    //alternativa de validacion por email
    let user = await User.findOne({ email });

    if (user) throw { code: 11000 };

    user = new User({ email, password });
    await user.save();

    //jwt token
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(201).json({ token, expiresIn});
  } catch (error) {
    console.log(error);
    //alternativa por defecto mongoose
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Ya existe este correo de usuario" });
    }
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ error: "No existe el usuario con ese correo" });

    const resPassword = await user.comparePassword(password);
    if (!resPassword)
      return res.status(403).json({ error: "password incorrecta" });

    //generar jwt token
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email, uid: user.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor"});
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
