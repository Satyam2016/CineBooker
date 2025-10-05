const express = require("express");
const router = express.Router();
const cinemaController = require("../controllers/cinemaController");

router.get("/", cinemaController.getCinemas);
router.get("/:id", cinemaController.getCinemaById);
router.post("/", cinemaController.addCinema);
router.put("/:id", cinemaController.updateCinema);
router.delete("/:id", cinemaController.deleteCinema);
router.get("/:cinemaId/movies", cinemaController.getMoviesByCinema);

module.exports = router;
