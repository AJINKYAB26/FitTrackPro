import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;

    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name, icon });

    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      { name, icon },
      { new: true }
    );

    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
