import { Router } from "express";
import { userController } from "../controllers/user.controller";
const router: Router = Router();
router.post('/register', userController.registerUser);
router.post('/login',userController.login)
router.get('/:id',userController.getUserById)
router.put('/updateUserById',userController.updateUserById)
router.delete('/:id',userController.deleteUserById)


export default router;