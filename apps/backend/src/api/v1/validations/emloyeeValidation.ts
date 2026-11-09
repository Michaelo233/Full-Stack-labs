import type { RequestHandler } from "express";
import Joi from "joi";

const addEmployeeSchema = Joi.object({
  employeeFirstName: Joi.string().trim().min(3).required().messages({
    "string.empty": "First Name is required",
    "string.min": "First Name must be at least 3 characters long",
    "any.required": "First Name is required",
  }),
  employeeLastName: Joi.string().trim().min(3).required().messages({
    "string.empty": "Last Name is required",
    "string.min": "Last Name must be at least 3 characters long",
    "any.required": "Last Name is required",
  }),
  department: Joi.string().trim().required().messages({
    "string.empty": "Department is required",
    "any.required": "Department is required",
  }),
}).unknown(true);

const addRoleSchema = Joi.object({
  firstName: Joi.string().trim().min(3).required().messages({
    "string.empty": "First Name is required",
    "string.min": "First Name must be at least 3 characters long",
    "any.required": "First Name is required",
  }),
  lastName: Joi.string().trim().min(3).required().messages({
    "string.empty": "Last Name is required",
    "string.min": "Last Name must be at least 3 characters long",
    "any.required": "Last Name is required",
  }),
  role: Joi.string().trim().required().messages({
    "string.empty": "Role is required",
    "any.required": "Role is required",
  }),
}).unknown(true);

export const validateAddRole: RequestHandler = (req, res, next) => {
  const { error, value } = addRoleSchema.validate(req.body, { stripUnknown: false });

  if (error) {
    return res.status(400).json({
      error: "Invalid role data",
      details: error.details.map((detail) => detail.message),
    });
  }

  req.body = value;
  next();
};

export const validateAddEmployee: RequestHandler = (req, res, next) => {
  const { error, value } = addEmployeeSchema.validate(req.body, { stripUnknown: false });

  if (error) {
    return res.status(400).json({
      error: "Invalid employee data",
      details: error.details.map((detail) => detail.message),
    });
  }

  req.body = value;
  next();
};