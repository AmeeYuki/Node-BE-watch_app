const Brand = require("../models/brand.model");

class brandController {
  // Get all brands
  getBrands(req, res) {
    Brand.find()
      .then((brands) => res.json(brands))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Add new brand
  addBrand(req, res) {
    const brandName = req.body.brandName;
    const newBrand = new Brand({ brandName });

    newBrand
      .save()
      .then(() => res.json("Brand added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Get brand by ID
  getBrandById(req, res) {
    Brand.findById(req.params.id)
      .then((brand) => res.json(brand))
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Update brand by ID
  updateBrand(req, res) {
    Brand.findById(req.params.id)
      .then((brand) => {
        brand.brandName = req.body.brandName;

        brand
          .save()
          .then(() => res.json("Brand updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  }

  // Delete brand by ID
  deleteBrand(req, res) {
    Brand.findByIdAndDelete(req.params.id)
      .then(() => res.json("Brand deleted."))
      .catch((err) => res.status(400).json("Error: " + err));
  }
}

module.exports = new brandController();
