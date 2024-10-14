const RepoModel = require('../models/repository');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('repoImage');

exports.postRepo = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        try {
            const newRepo = new RepoModel({
                name: req.body.name,
                category: req.body.category,
                image: req.file.path // Store the file path
            });

            await newRepo.save();
            res.status(201).json({ message: 'Repository created successfully', repo: newRepo });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

exports.getRepo = async (req, res) => {
    try {
        const repos = await RepoModel.find();
        res.json(repos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.putRepo = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        try {
            const updateData = {
                name: req.body.name,
                category: req.body.category
            };

            if (req.file) {
                updateData.image = req.file.path;
            }

            const updatedRepo = await RepoModel.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );

            if (!updatedRepo) {
                return res.status(404).json({ message: 'Repository not found' });
            }

            res.json(updatedRepo);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

exports.deleteRepo = async (req, res) => {
    try {
        const deletedRepo = await RepoModel.findByIdAndDelete(req.params.id);
        if (!deletedRepo) {
            return res.status(404).json({ message: 'Repository not found' });
        }
        res.json({ message: 'Repository deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};