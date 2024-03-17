import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErorrs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address must be string"),
  body("city").isString().notEmpty().withMessage("City must be string"),
  body("country").isString().notEmpty().withMessage("Country must be string"),
  handleValidationErorrs,
];

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("country is required"),
  body("deliveryPrice")
    .notEmpty()
    .withMessage("deliveryPrice must be postive number"),
  body("deliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a postive integer"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be array")
    .not()
    .isEmpty()
    .withMessage("Cuisins array cannot be empty"),
  body("menuItems").isArray().withMessage("Menu items must be array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and must be a positive number"),
  handleValidationErorrs,
];
