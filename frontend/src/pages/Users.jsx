import { useEffect, useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  // ✅ Decode userId from JWT (SOURCE OF TRUTH)
  const userId = useMemo(() => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.userId;
    } catch {
      return null;
    }
  }, [token]);

  /*
    Fetch users whenever filter changes
  */
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await api.get(`/user/bulk?filter=${filter}`);
        setUsers(res.data.users);
      } catch (err) {
        console.error("Failed to fetch users");
      }
    }

    fetchUsers();
  }, [filter]);

  /*
    Remove logged-in user + rank remaining users
  */
  const rankedUsers = useMemo(() => {
    const query = filter.toLowerCase().trim();

    const filteredUsers = users.filter(
      (user) => user._id !== userId   // ✅ NOW THIS WORKS
    );

    if (!query) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

      const aStarts = nameA.startsWith(query);
      const bStarts = nameB.startsWith(query);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      const aIncludes = nameA.includes(query);
      const bIncludes = nameB.includes(query);

      if (aIncludes && !bIncludes) return -1;
      if (!aIncludes && bIncludes) return 1;

      return nameA.localeCompare(nameB);
    });
  }, [users, filter, userId]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1220] via-[#0F172A] to-[#020617] px-4 py-10">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-white mb-1">
          Send Money
        </h1>
        <p className="text-blue-200 mb-8">
          Search and select a user to transfer money
        </p>

        {/* SEARCH */}
        <div className="mb-8">
          <input
  placeholder="Search by name..."
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  className="w-full p-4 rounded-xl text-lg text-white
  border border-white
  focus:outline-none focus:ring-2 focus:ring-white"
/>
        </div>

        {/* USERS LIST */}
        <div className="space-y-4">
          {rankedUsers.length === 0 ? (
            <div className="text-center text-blue-200">
              No users found
            </div>
          ) : (
            rankedUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between
                bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full
                    bg-teal-700 text-white flex items-center justify-center
                    font-semibold uppercase">
                    {user.firstName[0]}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/send/${user._id}`)}
                  className="px-5 py-2 rounded-lg
                  bg-teal-700 text-white font-medium
                  hover:bg-blue-800 transition"
                >
                  Send
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Users;
