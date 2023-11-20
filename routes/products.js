const express = require("express");
const oas = require("../openai.json");
const router = express.Router();
const app = express();
const products = require("../controllers/products");
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        openapi : '3.0.3',
        info : {
            title: 'Myntra Store API',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:7777/'
            }
        ]
    },
    apis: ['./routes/products.js']
}

const swaggerSpec = swaggerJSDoc(options)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /api/products/:
 *  get:
 *      summary: This API is used to fetch all the products available
 *      description: This API is used to fetch all the products available
 *      responses:
 *          200:
 *              description: Fetch all available products
 */
router.route("/").get(products.getAllProducts);
/**
 * @swagger
 * /api/products/{brands}:
 *  get:
 *      summary: This API is used to fetch all the brands available
 *      description: This API is used to fetch all the brands available
 *      responses:
 *          200:
 *              description: Fetch all available brands
 */
router.route("/brands").get(products.getProductBrands);
router.route("/testing").get(products.getSpecific);
app.get("/openai.json", (req, res) => {
    res.json(oas);
});
/**
 * @swagger
 * /api/products/search?{category}={value}:
 *  get:
 *      summary: This API is used to fetch all the products available in a particular category; filter in a brand/colour/gender etc
 *      description: This API is used to fetch all the products available in a particular category
 *      responses:
 *          200:
 *              description: Fetch all available products in a category
 */
router.route("/search").get(products.getSpecific);
/**
 * @swagger
 * /api/products/sort?{category}={value}:
 *  get:
 *      summary: This API is used to sort all the products available in a particular category; sort by price etc
 *      description: This API is used to sort all the products available in a particular category
 *      responses:
 *          200:
 *              description: Sort all available products in a category
 */
router.route("/sort").get(products.sortProducts);
router.route("/filter/:category/:value").get(products.getProductsInCategory);

module.exports = router;

// const express = require("express");
// const router = express .Router();
// const products = require("../controllers/products")

// router.get("/", products.getAllProducts);
// router.get("/brands", products.getProductBrands);
// router.get("/filterby", products.getSpecific);

// module.exports = router;
