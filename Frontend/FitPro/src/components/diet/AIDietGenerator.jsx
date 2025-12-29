import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Mail } from "lucide-react";

const AIDietGenerator = () => {
  const [level, setLevel] = useState("intermediate");
  const [goal, setGoal] = useState("bulking");
  const [dietType, setDietType] = useState("veg");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);

  // Generate diet plan
  const generateDiet = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const payload = { level, goal, dietType };

      const res = await fetch("http://localhost:5000/api/diet/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Request failed");

      setResult(data);
      setShowModal(true); // show pop-up after generating
    } catch (err) {
      console.error("Diet generation failed:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Send diet plan to user's email from token
  const sendEmail = async () => {
    try {
      setSending(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/emaildiet/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dietPlan: result }), // backend gets email from token
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send email");

      alert("Diet plan sent to your email successfully!");
      setShowModal(false);
    } catch (err) {
      console.error("Send email failed:", err);
      alert(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-2xl bg-zinc-900 p-6 border border-yellow-300/20 space-y-4">
      <h3 className="text-xl font-bold flex items-center gap-2">
        <Sparkles className="text-yellow-300" />
        AI Diet Generator
      </h3>

      {/* Fitness Level */}
      <select
        className="w-full p-3 rounded-xl bg-zinc-800"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      {/* Goal */}
      <select
        className="w-full p-3 rounded-xl bg-zinc-800"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      >
        <option value="bulking">Bulking</option>
        <option value="cutting">Cutting</option>
        <option value="weight loss">Weight Loss</option>
        <option value="maintenance">Maintenance</option>
      </select>

      {/* Diet Type */}
      <select
        className="w-full p-3 rounded-xl bg-zinc-800"
        value={dietType}
        onChange={(e) => setDietType(e.target.value)}
      >
        <option value="veg">Vegetarian</option>
        <option value="non-veg">Non Vegetarian</option>
      </select>

      <Button
        onClick={generateDiet}
        disabled={loading}
        className="w-full bg-yellow-400 text-black hover:bg-yellow-300"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Generate Diet Plan"}
      </Button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-zinc-900 p-6 rounded-2xl w-[400px] space-y-4 border border-yellow-300/20">
            <h4 className="text-lg font-bold flex items-center gap-2">
              <Mail className="text-yellow-300" />
              Your Diet Plan
            </h4>

            <div className="max-h-60 overflow-auto bg-zinc-800 p-3 rounded-xl text-sm text-gray-300 whitespace-pre-wrap">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={sendEmail}
                disabled={sending}
                className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black"
              >
                {sending ? <Loader2 className="animate-spin" /> : "Send to My Email"}
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDietGenerator;
