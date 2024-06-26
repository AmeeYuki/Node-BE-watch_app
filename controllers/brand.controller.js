const Brand = require("../models/brand.model");
const Watch = require("../models/watch.model");

class BrandController {
  // Tạo brand mới
  async createBrand(req, res) {
    const { brandName } = req.body;

    try {
      // Kiểm tra xem brandName đã tồn tại trong database chưa
      const existingBrand = await Brand.findOne({ brandName });
      if (existingBrand) {
        return res.status(400).json({ msg: "Brand name already exists" });
      }

      // Nếu chưa tồn tại thì tạo mới brand
      const newBrand = new Brand({ brandName });
      await newBrand.save();
      res.status(201).json(newBrand);
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to create brand", error: err.message });
    }
  }
  // Cập nhật brand
  async updateBrand(req, res) {
    const { brandName } = req.body;
    const { id } = req.params;

    try {
      // Tìm brand hiện tại theo id
      const currentBrand = await Brand.findById(id);
      if (!currentBrand) {
        return res.status(404).json({ msg: "Brand not found" });
      }

      // Nếu brandName mới bằng với brandName hiện tại, không cần cập nhật
      if (brandName === currentBrand.brandName) {
        return res.status(400).json({ msg: "Brand name is the same" });
      }

      // Kiểm tra xem brandName mới đã tồn tại trong database chưa
      const existingBrand = await Brand.findOne({ brandName });
      if (existingBrand) {
        return res.status(400).json({ msg: "Brand name already exists" });
      }

      // Nếu không có lỗi, cập nhật brand và trả về brand đã cập nhật
      const updatedBrand = await Brand.findByIdAndUpdate(
        id,
        { brandName },
        { new: true }
      );
      res.json(updatedBrand);
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to update brand", error: err.message });
    }
  }

  // Xóa brand (có điều kiện nếu có sản phẩm liên kết thì không xóa)
  async deleteBrand(req, res) {
    const { id } = req.params;

    try {
      // Kiểm tra xem có đồng hồ nào liên kết đến brand không
      const watchesWithBrand = await Watch.find({ brand: id });

      if (watchesWithBrand.length > 0) {
        return res
          .status(400)
          .json({ msg: "Cannot delete brand with associated watches" });
      }

      // Nếu không có đồng hồ liên kết, tiến hành xóa brand
      const brand = await Brand.findById(id);
      if (!brand) {
        return res.status(404).json({ msg: "Brand not found" });
      }

      await Brand.findByIdAndDelete(id);
      res.json({ msg: "Brand deleted successfully" });
    } catch (err) {
      res
        .status(400)
        .json({ msg: "Failed to delete brand", error: err.message });
    }
  }

  // Lấy danh sách tất cả các brand
  async getAllBrands(req, res) {
    try {
      const brands = await Brand.find();
      res.json(brands);
    } catch (err) {
      res.status(400).json({ msg: "Failed to get brands", error: err.message });
    }
  }
}

module.exports = new BrandController();
