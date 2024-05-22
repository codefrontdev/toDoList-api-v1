import { check, validationResult } from "express-validator";
import validatorMiddleware from "../../middleware/validatorMiddleware";
import ApiError from "../ApiError";



export const getUserValidation = [check("id").custom((req) => {
    if (isNaN(req.params.id)) {
        return new ApiError('id must be a number', 400, 'id must be a number')
    }
    return true
    
}), validatorMiddleware];