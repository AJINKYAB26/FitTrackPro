import axios from "axios";
import { Trash2 } from "lucide-react";
import api from "../../lib/api";

export default function ExerciseTypeTable({ types, refresh }) {
  const token = localStorage.getItem("token");

  const remove = async (id) => {
    await api.delete(
      `/exercise-types/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    refresh();
  };

  return (
    <div className="bg-zinc-900 rounded-xl border border-yellow-300/20">
      <table className="w-full text-left">
        <thead className="border-b border-yellow-300/20">
          <tr>
            <th className="p-4">Icon</th>
            <th className="p-4">Name</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {types.map((type) => (
            <tr key={type._id} className="border-b border-zinc-800">
              <td className="p-4 text-2xl">{type.icon}</td>
              <td className="p-4">{type.name}</td>
              <td className="p-4">
                <button
                  onClick={() => remove(type._id)}
                  className="text-red-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
