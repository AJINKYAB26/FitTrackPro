import { useState } from "react";
import axios from "axios";
import api from "../../lib/api";


export default function CategoryForm({ refresh }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();

    await api.post(
      "/categories",
      { name, icon },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setName("");
    setIcon("");
    refresh();
  };

  return (
    <form
      onSubmit={submit}
      className="bg-zinc-900 p-6 rounded-xl border border-yellow-300/20 mb-6"
    >
      <div className="grid grid-cols-3 gap-4">
        <input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-black border border-zinc-700 p-3 rounded-lg text-white"
          required
        />

        <input
          placeholder="Icon (emoji)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="bg-black border border-zinc-700 p-3 rounded-lg text-white"
        />

        <button className="bg-yellow-300 text-black font-bold rounded-lg hover:bg-yellow-400">
          Add Category
        </button>
      </div>
    </form>
  );
}
