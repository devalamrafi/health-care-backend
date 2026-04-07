import { userController } from './user.controller'

const router = require('express').Router()

router.post('/create-patient', userController.createPatient)

export const userRoutes = {
    router
} 
