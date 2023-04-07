import { Link } from "../models/Link.js";

export const redirectLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    const link = await Link.findOne({ nanoLink });

    if (!link) return res.status(404).json({ error: "No existe el link" });

    return res.redirect(link.longLink);
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      res.status(403).json({ error: "Formato de id incorrecto" });
    }
    res.status(500).json({ error: "Error del servidor" });
  }
};
