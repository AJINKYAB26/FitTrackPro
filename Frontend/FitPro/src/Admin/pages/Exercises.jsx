import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../../components/UI/button";
import ExerciseForm from "../../Admin/components/ExerciseForm";

export default function Exercises() {
  const [exercises, setExercises] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchExercises = async () => {
    try {
      const res = await axios.get("https://fittrackpro.onrender.com/api/exercises", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setExercises(res.data);
    } catch (err) {
      console.error("Failed to load exercises", err);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const deleteExercise = async (id) => {
    if (!window.confirm("Delete this exercise?")) return;

    await axios.delete(`https://fittrackpro.onrender.com/api/exercises/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchExercises();
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-300">Exercises</h1>
        <Button onClick={() => setShowForm(true)}>+ Add Exercise</Button>
      </div>

      <div className="bg-zinc-900 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-800 text-gray-300">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Type</th>
              <th className="p-4">Sets</th>
              <th className="p-4">Reps</th>
              <th className="p-4">Calories</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {exercises.map((ex) => (
              <tr key={ex._id} className="border-t border-zinc-800">
                <td className="p-4 font-medium">{ex.name}</td>
                <td className="p-4">{ex.category?.name || "-"}</td>
                <td className="p-4">{ex.exerciseType?.name || "-"}</td>
                <td className="p-4">{ex.sets || "-"}</td>
                <td className="p-4">{ex.reps || "-"}</td>
                <td className="p-4">{ex.caloriesBurn || "-"}</td>
                <td className="p-4 max-w-xs truncate">
                  {ex.description || "-"}
                </td>
                <td className="p-4 flex gap-3">
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditData(ex);
                      setShowForm(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteExercise(ex._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ExerciseForm
          close={() => {
            setShowForm(false);
            setEditData(null);
          }}
          refresh={fetchExercises}
          editData={editData}
        />
      )}
    </div>
  );
}
