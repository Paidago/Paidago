import { Router } from 'express'
import { captureOrder, completeOrder, createOrder } from '../controllers/payment.controller.js'

const router = new Router()

router.post("/create-order", createOrder)

router.post("/capture-order",  captureOrder)

router.put('/complete-order',  completeOrder)

export default router;