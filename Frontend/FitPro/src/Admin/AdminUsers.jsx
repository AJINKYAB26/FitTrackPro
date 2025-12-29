import React, { useEffect, useState } from "react";
import api from "../lib/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch users
  const fetchUsers = async () => {
    try {
      const res = await api.get("/users"); // your getUsers API
      setUsers(res.data);
    } catch (error) {
      console.error("Fetch users error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Ban user
  const banUser = async (id) => {
    if (!window.confirm("Are you sure you want to ban this user?")) return;

    try {
      await api.put(`/users/${id}/ban`);
      fetchUsers();
    } catch (error) {
      console.error("Ban error:", error);
    }
  };

  // 🔹 Activate user
  const activateUser = async (id) => {
    try {
      await api.put(`/users/${id}/activate`);
      fetchUsers();
    } catch (error) {
      console.error("Activate error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

 if (loading) {
    return (
      <div className="bg-zinc-900 p-6 rounded-xl border border-yellow-300/20">
        Loading users...
      </div>
    );
  }
 return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-yellow-300/20">
      <h1 className="text-2xl font-bold mb-6 text-yellow-300">
        👑 Admin – Users
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-zinc-700 rounded-lg overflow-hidden">
          <thead className="bg-black text-yellow-300">
            <tr>
              <th className="p-3 border border-zinc-700 text-left">Name</th>
              <th className="p-3 border border-zinc-700 text-left">Email</th>
              <th className="p-3 border border-zinc-700">Role</th>
              <th className="p-3 border border-zinc-700">Status</th>
              <th className="p-3 border border-zinc-700">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-zinc-800 transition"
              >
                <td className="p-3 border border-zinc-700">
                  {user.name}
                </td>
                <td className="p-3 border border-zinc-700">
                  {user.email}
                </td>
                <td className="p-3 border border-zinc-700 text-center">
                  <span className="px-2 py-1 rounded bg-zinc-800 text-yellow-300 text-sm">
                    {user.role}
                  </span>
                </td>

                <td className="p-3 border border-zinc-700 text-center">
                  {user.isActive ? (
                    <span className="text-green-400 font-semibold">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-400 font-semibold">
                      Banned
                    </span>
                  )}
                </td>

                <td className="p-3 border border-zinc-700 text-center">
                  {user.isActive ? (
                    <button
                      onClick={() => banUser(user._id)}
                      className="px-4 py-1 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                    >
                      Ban
                    </button>
                  ) : (
                    <button
                      onClick={() => activateUser(user._id)}
                      className="px-4 py-1 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-zinc-400 py-6">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;