import { Router } from 'express';
import ForgotPasswordController from '../controller/ForgotPasswordController';
import ResetPasswordController from '../controller/ResetPasswordController';

const passwordRoute = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoute.post('/forgot', forgotPasswordController.create);
passwordRoute.post('/reset', resetPasswordController.create);

export default passwordRoute;
