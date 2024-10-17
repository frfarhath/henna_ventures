const confirmAppoinmentIndividual = require("../../admin/models/confirmAppoinmentIndividual");
const confirmAppoinmentPackage = require("../../admin/models/confirmAppoinmentPackage");

// Get user appointments (both individual and package)
exports.getUserAppointments = async (req, res) => {
    try {
        if (!req.currentUser || !req.currentUser.email) {
            return res.status(401).json({
                success: false,
                message: 'User email not found in request'
            });
        }

        // Fetch both types of appointments
        const [individualAppointments, packageAppointments] = await Promise.all([
            confirmAppoinmentIndividual.find({ email: req.currentUser.email }),
            confirmAppoinmentPackage.find({ email: req.currentUser.email })
        ]);
        // Combine and sort appointments by wedding date (newest first)
        const allAppointments = [...individualAppointments, ...packageAppointments]
            .sort((a, b) => new Date(b.wedding) - new Date(a.wedding));

        res.status(200).json({
            success: true,
            appointments: allAppointments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching appointments',
            error: error.message
        });
    }
};