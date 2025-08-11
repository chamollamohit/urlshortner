import { Router } from "express";
import { createShortUrl,getShortUrl, deleteUrl, redirectUrl } from "../controllers/url.api.controller.js";
import { registerUser,loginUser } from "../controllers/auth.api.controller.js";
import { verifyToken, isLoggedIn } from "../middlewares/verifyToken.middleware.js";
const router = Router()

// Rendering Routes

router.get('/login', isLoggedIn,(req, res) => res.render('loginRegister'))
router.get('/dashboard', verifyToken, (req, res) => res.render('dashboard', {user : req.userToken}))
router.get('/', verifyToken, (req, res) => res.redirect('/dashboard'));



// API-Route for Auth
router.route('/api/register').post(registerUser)
router.route('/api/login').post(loginUser)

router.post('/api/logout',(req,res) => {
    res.clearCookie("token").json("Loged Out")
})


// API-Route for URLs (Procted)
router.route('/api/url').post(verifyToken,createShortUrl).get(verifyToken, getShortUrl)
router.route('/api/url/:id').delete(verifyToken, deleteUrl)
router.route('/:id').get(redirectUrl)


export default router