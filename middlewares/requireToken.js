import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token)
      throw new Error("No existe un token de autorización usa Beaver");

    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    const tokenVerificationErrors = {
      "invalid signature": "La firma del jwt no es valida",
      "jwt expired": "JWT expirado",
      "invalid token": "Token no valido",
      "No Beaver": "Utiliza formato Beaver",
      "jwt malformed": "JWT formato no valido",
      "Unauthorized": "acceso no autorizado"
    };
    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};
