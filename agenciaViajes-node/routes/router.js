import express from 'express'
import {
  pageDetailTravel,
  pageHome,
  pageTestimonials,
  pageTravels,
  pageUs,
} from "../controllers/pagesController.js";
import { saveTestimonial } from '../controllers/testimonialController.js';
const router = express.Router()

router.get('/',pageHome)

router.get('/nosotros',pageUs)

router.get('/viajes',pageTravels)

router.get('/viajes/:id',pageDetailTravel)

router.get('/testimoniales',pageTestimonials)
router.post('/testimoniales',saveTestimonial)

export default router
