import { useEffect, useState } from "react";
import axios from "axios";
import ExerciseTypeForm from "../components/ExerciseTypeForm";
import ExerciseTypeTable from "../components/ExerciseTypeTable";

export default function ExerciseTypes() {
  const [types, setTypes] = useState([]);

  const fetchTypes = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/exercise-types"
    );
    setTypes(res.data);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-yellow-300">
        Manage Exercise Types
      </h1>

      <ExerciseTypeForm refresh={fetchTypes} />
      <ExerciseTypeTable types={types} refresh={fetchTypes} />
    </div>
  );
}
