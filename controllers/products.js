const Product = require("../models/product");
const oas = require("../openai.json");
// const getAllProducts = async (req, res) => {
//     const { company } = req.query;
//     const myData = await Product.find({});
//     res.status(200).json({ myData });
// };

// this will get all products available
// const getAllProducts = async (req, res) => {
// 	const limit = Number(req.query.limit) || 0;
// 	const sort = req.query.sort == 'desc' ? -1 : 1;

// 	Product.find()
// 		.select(['-_id'])
// 		.limit(limit)
// 		.sort({ id: sort })
// 		.then((products) => {
// 			res.json(products);
// 		})
// 		.catch((err) => console.log(err));
// };

// http://localhost:7777/api/products/?page=2&limit=10
const getAllProducts = async (req, res) => {
    // const page = Number(req.query.page) || 1;
    // const limit = Number(req.query.limit) || 20;
    // const skip = (page - 1) * limit;

    Product.find()
        .select(['-_id'])
        // .skip(skip)
        // .limit(limit)
        .then((products) => {
            res.json({
                products,
                // pagination: {
                //     page,
                //     limit
                // },
            });
        })
        .catch((err) => console.log(err));
};

// http://localhost:7777/api/products/sort?sort=ProductName&order=desc
// http://localhost:7777/api/products/sort
const sortProducts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
	const sortCategory = req.query.sort || 'Price (INR)';
    const sortOrder = req.query.order || 'asc'; 
    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sortCategory] = sortOrder === 'asc' ? 1 : -1;
    Product.find()
        .select(['-_id'])
        .skip(skip)
        .limit(limit)
        .sort(sortOptions)
        .then((products) => {
            res.json({
                products,
                pagination: {
                    page,
                    limit
                },
            });
        })
        .catch((err) => console.log(err));
};

//will get in a particular category
// localhost:7777/api/products/search?ProductBrand=DKNY
const getSpecific = async (req, res) => {
    const myData = await Product.find(req.query);
    res.status(200).json({ myData });
};

// this will get all brands
// http://localhost:7777/api/products/brands
const getProductBrands = async (req, res) => {
	Product.distinct('ProductBrand')
		.then((categories) => {
			res.json(categories);
		})
		.catch((err) => console.log(err));
};

const getProductsInCategory = async (req, res) => {
    try {
        const category = req.query.category;
        const value = req.query.value;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        const skip = (page - 1) * limit;
        const dynamicQuery = {};
        dynamicQuery[category] = value;

        const products = await Product.find(dynamicQuery)
            .select('-_id')
            .skip(skip)
            .limit(limit);

        res.json({
            products,
            pagination: {
                page,
                limit,
            },
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOAS = async (req, res) => {
    res.json(oas);
};

module.exports = { getAllProducts, getSpecific, getProductBrands, getProductsInCategory, sortProducts, getOAS };

// http://localhost:7777/api/products/?sort=ProductBrand

// const getProductsInCategory = (req, res) => {
// 	const ProductBrand = req.params.ProductBrand;
// 	const limit = Number(req.query.limit) || 0;
// 	const sort = req.query.sort == 'desc' ? -1 : 1;

// 	Product.find({
// 		ProductBrand,
// 	})
// 		.select(['-_id'])
// 		.limit(limit)
// 		.sort({ id: sort })
// 		.then((products) => {
// 			res.json(products);
// 		})
// 		.catch((err) => console.log(err));
// };