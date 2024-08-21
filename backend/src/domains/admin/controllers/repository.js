const RepoModel = require('../models/repository');
const multer = require('multer');
const fs = require("fs");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('repoImage');

exports.postRepo = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Error uploading file" });
        }
        
        const newRepo = new RepoModel({
            name: req.body.name,
            category: req.body.category,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });

        try {
            await newRepo.save();
            res.status(200).json({ message: 'Successfully uploaded' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error saving to database" });
        }
    });
};

exports.getRepo = async (req, res) => {
    try {
        const repos = await RepoModel.find();
        const reposWithBase64 = repos.map(repo => ({
            _id: repo._id,
            name: repo.name,
            category: repo.category,
            image: repo.image.data ? `data:${repo.image.contentType};base64,${repo.image.data.toString('base64')}` : null
        }));
        res.json(reposWithBase64);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching from database" });
    }
};
exports.putRepo = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
        } else {
            try {
                const updateRepo = await RepoModel.findByIdAndUpdate(
                    req.params.id,
                    {
                        name: req.body.name,
                        category: req.body.category,
                        image: req.file.filename
                    },
                    { new: true }
                );
                res.json(updateRepo);
            } catch (err) {
                res.status(400).json({ message: err.message });
            }
        }
    });
};

exports.deleteRepo = async (req, res) => {
    try {
        const deletedRepo = await RepoModel.findByIdAndDelete(req.params.id);
        if (!deletedRepo) {
            return res.status(404).json({ message: 'Repo not found' });
        }
        res.json({ message: 'Repo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
