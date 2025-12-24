import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const API = "https://loanmate-nine.vercel.app";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);
  const [suspendReason, setSuspendReason] = useState("");

  // Fetch users
  const { data: usersData = [], isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`${API}/users`);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Mutation to update user
  const updateUserMutation = useMutation({
    mutationFn: async (user) => {
      const { _id, role, status, suspendReason } = user;
      const res = await axios.patch(`${API}/users/${_id}`, {
        role,
        status,
        suspendReason,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries(["users"]);
      setSelectedUser(null);
      setSuspendReason("");
    },
    onError: (err) => {
      toast.error("Failed to update user");
      console.error(err.response?.data || err.message);
    },
  });

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p className="text-red-500">Error loading users</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            ) : (
              usersData.map((user) => (
                <tr key={user._id} className="text-center">
                  <td className="border p-2">{user.name || user.email}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update User Role</h2>
            <p>
              <strong>Name:</strong> {selectedUser.name || selectedUser.email}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>

            <div className="mt-2">
              <label className="block mb-1 font-medium">Role:</label>
              <select
                value={selectedUser.role}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, role: e.target.value })
                }
                className="w-full border px-2 py-1 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div className="mt-2">
              <label className="block mb-1 font-medium">Suspend Reason:</label>
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                className="w-full border px-2 py-1 rounded"
                placeholder="Why are you suspending this user?"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() =>
                  updateUserMutation.mutate({
                    _id: selectedUser._id,
                    role: selectedUser.role,
                    status: suspendReason ? "suspended" : selectedUser.status,
                    suspendReason: suspendReason || "",
                  })
                }
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setSuspendReason("");
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
