const ProductModel = require('../models/product');
const multer = require('multer');
const fs = require("fs");

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: Storage,
});

const multipleUpload = upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }])


exports.postProduct = async (req, res) => {
    multipleUpload(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error uploading files');
        } else {
            const newRepo = new ProductModel({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                count: req.body.count,
                image1: req.files.image1 ? {
                    data: fs.readFileSync('uploads/' + req.files.image1[0].filename),
                    contentType: 'image/png',
                } : null,
                image2: req.files.image2 ? {
                    data: fs.readFileSync('uploads/' + req.files.image2[0].filename),
                    contentType: 'image/png',
                } : null,
                image3: req.files.image3 ? {
                    data: fs.readFileSync('uploads/' + req.files.image3[0].filename),
                    contentType: 'image/png',
                } : null,
            });

            newRepo.save()
                .then(() => res.send('Successfully uploaded product'))
                .catch((err) => {
                    console.log(err);
                    res.status(500).send('Error saving product');
                });
        }
    });
};
exports.getProduct = async (req, res) => {
    const blogs = await ProductModel.find();
    res.json(blogs);
};


exports.putProduct = async (req, res) => {
    multipleUpload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error uploading files');
        } else {
            try {
                const updateData = {
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    category: req.body.category,
                    count: req.body.count,
                };

                if (req.files.image1) {
                    updateData.image1 = {
                        data: fs.readFileSync('uploads/' + req.files.image1[0].filename),
                        contentType: 'image/png',
                    };
                }

                if (req.files.image2) {
                    updateData.image2 = {
                        data: fs.readFileSync('uploads/' + req.files.image2[0].filename),
                        contentType: 'image/png',
                    };
                }

                if (req.files.image3) {
                    updateData.image3 = {
                        data: fs.readFileSync('uploads/' + req.files.image3[0].filename),
                        contentType: 'image/png',
                    };
                }

                const updateRepo = await ProductModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
                res.json(updateRepo);
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        }
    });
};


exports.stockUpdate = async (req, res) => {

    try {
        const updatedPost = await ProductModel.findByIdAndUpdate(
            req.params.id,
            {
                count: req.body.count
            },
            { new: true }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.deleteProduct = async (req, res) => {

    try {
        const deletedPost = await ProductModel.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

