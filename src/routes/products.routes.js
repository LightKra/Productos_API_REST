import {Router} from 'express';
import * as productsCtrl from '../controllers/products.controller'
const router = Router();
import {authJwt} from '../middlewares/index';
router.post('/',[authJwt.verifyToken, authJwt.isModerator],productsCtrl.createProduct);
router.get('/',productsCtrl.getProduct);
router.get('/:productId',productsCtrl.getProductById);
router.put('/:productId',[authJwt.verifyToken, authJwt.isAdmin],productsCtrl.updateProductById);
router.delete('/:productId',[authJwt.verifyToken, authJwt.isAdmin],productsCtrl.deleteProductId);
export default router