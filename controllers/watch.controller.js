const Watch = require("../models/watch.model");

class WatchController {
  // Get all watches
  getWatches(req, res) {
    Watch.find()
      .populate("comments brand")
      .then((watches) => res.json(watches))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Add new watch
  addWatch(req, res) {
    const {
      watchName,
      image,
      price,
      Automatic,
      watchDescription,
      comments,
      brand,
    } = req.body;
    const newWatch = new Watch({
      watchName,
      image,
      price,
      Automatic,
      watchDescription,
      comments,
      brand,
    });

    newWatch
      .save()
      .then(() => res.json("Watch added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Get watch by ID
  getWatchById(req, res) {
    Watch.findById(req.params.id)
      .populate("comments brand")
      .then((watch) => res.json(watch))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Update watch by ID
  updateWatch(req, res) {
    Watch.findById(req.params.id)
      .then((watch) => {
        watch.watchName = req.body.watchName;
        watch.image = req.body.image;
        watch.price = req.body.price;
        watch.Automatic = req.body.Automatic;
        watch.watchDescription = req.body.watchDescription;
        watch.comments = req.body.comments;
        watch.brand = req.body.brand;

        watch
          .save()
          .then(() => res.json("Watch updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Delete watch by ID
  deleteWatch(req, res) {
    Watch.findByIdAndDelete(req.params.id)
      .then(() => res.json("Watch deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  }
}

module.exports = new WatchController();
