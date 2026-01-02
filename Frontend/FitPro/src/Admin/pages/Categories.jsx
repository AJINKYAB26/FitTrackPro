import { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    const res = await axios.get("http://13.126.12.249:5000/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-yellow-300">
        Manage Categories
      </h1>

      <CategoryForm refresh={fetchCategories} />

      <CategoryTable
        categories={categories}
        refresh={fetchCategories}
      />
    </div>
  );
}
