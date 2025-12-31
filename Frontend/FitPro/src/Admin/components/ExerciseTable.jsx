import { Trash2, Pencil } from "lucide-react";
import axios from "axios";
import api from "../../lib/api";

export default function ExerciseTable({ exercises, refresh, onEdit }) {
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this exercise?")) return;

        await api.delete(`/exercises/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        refresh();
    };

    return (
        <div className="bg-zinc-900 rounded-xl overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-zinc-800 text-gray-300">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Sets</th>
                        <th className="p-4">Reps</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Calories</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {exercises.map((ex) => (
                        <tr key={ex._id} className="border-b border-zinc-800">
                            <td className="p-4 font-medium">{ex.name}</td>
                            <td className="p-4">{ex.exerciseType?.name}</td>
                            <td className="p-4">{ex.sets || "-"}</td>
                            <td className="p-4">{ex.reps || "-"}</td>
                            <td className="p-4 max-w-xs truncate">
                                {ex.description || "-"}
                            </td>
                            <td className="p-4">{ex.caloriesBurn}</td>
                            <td className="p-4 flex gap-3">
                                <button
                                    onClick={() => onEdit(ex)}
                                    className="text-yellow-300 hover:text-yellow-400"
                                >
                                    <Pencil size={18} />
                                </button>

                                <button
                                    onClick={() => handleDelete(ex._id)}
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
