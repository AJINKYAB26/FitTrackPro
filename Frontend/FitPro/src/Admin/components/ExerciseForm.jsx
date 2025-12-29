import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../components/UI/button";

export default function ExerciseForm({ close, refresh, editData }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    exerciseType: "",
    sets: "",
    reps: "",
    caloriesBurn: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories").then((res) => {
      setCategories(res.data);
    });

    axios.get("http://localhost:5000/api/exercise-types").then((res) => {
      setTypes(res.data);
    });
  }, []);

  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        category: editData.category?._id || "",
        exerciseType: editData.exerciseType?._id || "",
        sets: editData.sets || "",
        reps: editData.reps || "",
        caloriesBurn: editData.caloriesBurn || "",
        description: editData.description || "",
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category || !form.exerciseType) {
      alert("Category and Exercise Type are required");
      return;
    }

    const url = editData
      ? `http://localhost:5000/api/exercises/${editData._id}`
      : "http://localhost:5000/api/exercises";

    const method = editData ? "put" : "post";

    await axios[method](url, form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-xl w-full max-w-lg text-white"
      >
        <h2 className="text-2xl font-bold mb-4">
          {editData ? "Edit Exercise" : "Add Exercise"}
        </h2>

        <input
          className="w-full p-3 mb-3 rounded bg-zinc-800"
          placeholder="Exercise Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        {/* CATEGORY */}
        <select
          className="w-full p-3 mb-3 rounded bg-zinc-800"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* EXERCISE TYPE */}
        <select
          className="w-full p-3 mb-3 rounded bg-zinc-800"
          value={form.exerciseType}
          onChange={(e) => setForm({ ...form, exerciseType: e.target.value })}
          required
        >
          <option value="">Select Exercise Type</option>
          {types.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* DIFFICULTY */}
        {/* <select
          className="w-full p-3 mb-3 rounded bg-zinc-800"
          value={form.difficulty}
          onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select> */}

        {/* SETS & REPS */}
        <div className="flex gap-3 mb-3">
          <input
            className="w-full p-3 rounded bg-zinc-800"
            placeholder="Sets"
            type="number"
            value={form.sets}
            onChange={(e) => setForm({ ...form, sets: e.target.value })}
          />
          <input
            className="w-full p-3 rounded bg-zinc-800"
            placeholder="Reps (e.g. 8-12)"
            value={form.reps}
            onChange={(e) => setForm({ ...form, reps: e.target.value })}
          />
        </div>

        <input
          className="w-full p-3 mb-3 rounded bg-zinc-800"
          placeholder="Calories Burn"
          type="number"
          value={form.caloriesBurn}
          onChange={(e) => setForm({ ...form, caloriesBurn: e.target.value })}
        />

        <textarea
          className="w-full p-3 mb-4 rounded bg-zinc-800"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex justify-end gap-3">
          <Button variant="ghost" type="button" onClick={close}>
            Cancel
          </Button>
          <Button type="submit">
            {editData ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}
