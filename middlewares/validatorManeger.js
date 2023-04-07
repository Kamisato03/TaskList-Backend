import axios from "axios";
import { validationResult, body, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const paramLinkValidator = [
  param("id", "Formato no valido (expressValidator").trim().notEmpty().escape(),
  validationResultExpress,
];

export const paramTaskIdValidator = [
  param("id", "Formato no valido (expressValidator").trim().notEmpty().escape(),
  validationResultExpress,
];

export const bodyLinkValidator = [
  body("longLink", "formato link incorrecto")
    .trim()
    .notEmpty()
    .custom(async (value) => {
      try {
        if (!value.startsWith("https://")) {
          value = "https://" + value;
        }
        await axios.get(value);
        return value;
      } catch (error) {
        throw new Error("Not found longLink: 404");
      }
    }),
  validationResultExpress,
];

export const bodyRegisterValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Formato de password incorrecto")
    .trim()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("No coinciden las contraseñas");
      }
      return value;
    }),
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Formato de password incorrecto")
    .trim()
    .isLength({ min: 6 }),
  validationResultExpress,
];

export const bodyTaskValidator = [
  body("tittle")
    .trim()
    .isLength({ max: 15 })
    .withMessage("El titulo debe tener máximo 15 caracteres"),
  body("description")
    .trim()
    .isLength({ max: 500 })
    .withMessage("La descripción debe tener al máximo 500 caracteres"),
  body("priority")
    .optional()
    .custom((value, { req }) => {
      if (value) {
        req.body.priority = value.toLowerCase();
      }
      return true;
    })
    .isIn(["alta", "media", "baja"])
    .withMessage("La prioridad debe ser alta, media o baja"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("El valor completado debe ser un booleano"),
  validationResultExpress,
];
