import { useState } from "react";
import axios from "axios";

export default function ExerciseTypeForm({ refresh }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:5000/api/exercise-types",
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
          placeholder="Exercise type (Chest, Legs...)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-black border border-zinc-700 p-3 rounded-lg"
          required
        />

        <input
          placeholder="Icon (emoji optional)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className="bg-black border border-zinc-700 p-3 rounded-lg"
        />

        <button className="bg-yellow-300 text-black font-bold rounded-lg hover:bg-yellow-400">
          Add Type
        </button>
      </div>
    </form>
  );
}
