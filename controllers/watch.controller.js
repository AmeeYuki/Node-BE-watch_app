const Brand = require("../models/brand.model");
const Watch = require("../models/watch.model");

class WatchController {
  // Create a new watch
  async createWatch(req, res) {
    const { watchName, image, price, automatic, watchDescription, brand } =
      req.body;

    // Check for missing fields
    if (!watchName || !image || !price || !watchDescription || !brand) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    try {
      // Check if the brand exists
      const existingBrand = await Brand.findById(brand);
      if (!existingBrand) {
        return res.status(400).json({ msg: "Brand not found" });
      }
      // Check if the watch name already exists
      const existingWatch = await Watch.findOne({ watchName });
      if (existingWatch) {
        return res.status(400).json({ msg: "Watch name already exists" });
      }

      const newWatch = new Watch({
        watchName,
        image,
        price,
        automatic,
        watchDescription,
        brand,
      });
      await newWatch.save();
      res.status(201).json(newWatch);
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to create watch", error: err.message });
    }
  }

  // Get all watches
  async getWatches(req, res) {
    try {
      const watches = await Watch.find()
        .populate({
          path: "brand",
          select: "_id brandName",
        })
        .populate("comments");
      res.status(200).json(watches);
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to get watches", error: err.message });
    }
  }

  // Get watch by ID
  async getWatchById(req, res) {
    const { id } = req.params;

    try {
      const watch = await Watch.findById(id)
        .populate({
          path: "brand",
          select: "_id brandName",
        })
        .populate("comments");
      if (!watch) {
        return res.status(404).json({ msg: "Watch not found" });
      }
      res.status(200).json(watch);
    } catch (err) {
      res.status(400).json({ msg: "Failed to get watch", error: err.message });
    }
  }

  // Update a watch
  async updateWatch(req, res) {
    const { id } = req.params;
    const { watchName, image, price, automatic, watchDescription, brand } =
      req.body;

    // Kiểm tra nếu các trường không được bỏ trống
    if (!watchName || !image || !price || !watchDescription || !brand) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    try {
      // Kiểm tra xem watch có tồn tại không
      const existingWatch = await Watch.findById(id);
      if (!existingWatch) {
        return res.status(404).json({ msg: "Watch not found" });
      }

      // Kiểm tra xem brand có tồn tại không
      const existingBrand = await Brand.findById(brand);
      if (!existingBrand) {
        return res.status(404).json({ msg: "Brand not found" });
      }

      // Kiểm tra xem tên watchName có bị trùng không
      const watchWithSameName = await Watch.findOne({ watchName });
      if (watchWithSameName && watchWithSameName._id.toString() !== id) {
        return res.status(400).json({ msg: "Watch name already exists" });
      }

      const updatedWatch = await Watch.findByIdAndUpdate(
        id,
        { watchName, image, price, automatic, watchDescription, brand },
        { new: true }
      )
        .populate("brand", "_id brandName")
        .populate("comments");

      res.status(200).json(updatedWatch);
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to update watch", error: err.message });
    }
  }

  // Delete a watch
  async deleteWatch(req, res) {
    const { id } = req.params;

    try {
      const watch = await Watch.findById(id).populate("comments");

      if (!watch) {
        return res.status(404).json({ msg: "Watch not found" });
      }

      await Watch.findByIdAndDelete(id);
      res.status(200).json({ msg: "Watch deleted successfully" });
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to delete watch", error: err.message });
    }
  }
}

module.exports = new WatchController();
