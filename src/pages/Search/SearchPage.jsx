import UserCard from "@/components/molecules/UserCard/UserCard";
import UserCardSkeleton from "@/components/molecules/UserCardSkeleton/userCardSkeleton";
import { useGetAllUser } from "@/Hooks/api/user/useGetAllUser";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "@/Hooks/useDebounce";

function SearchPage() {
  const currentUserId = useSelector((state) => state?.auth?.user?.id);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searched, setSearched] = useState(false);

  const { usersData } = useGetAllUser();
  const debouncedQuery = useDebounce(query, 500); // ✅ debounce query

  // Fake API call simulation
  async function fetchUsers(searchTerm) {
    setLoading(true);

    // simulate API filter
    const filtered = usersData?.data?.filter((user) =>
      user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setUsers(filtered || []);
    setLoading(false);
  }

  // Effect: runs only after debounce
  useEffect(() => {
    if (!debouncedQuery) {
      setUsers([]);
      setSearched(false);
      setLoading(false);
      return;
    }
    setSearched(true);
    fetchUsers(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center md:items-center md:justify-center py-2 gap-2">
      <div className="w-full max-w-md flex flex-col h-screen md:h-auto md:rounded-lg md:shadow-md bg-white border">
        {/* Search Bar */}
        <div className="p-3 border-b">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // ✅ no API call here, only updates query
            placeholder="Search users..."
            className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <>
              <UserCardSkeleton />
              <UserCardSkeleton />
              <UserCardSkeleton />
            </>
          ) : users.length > 0 ? (
            users.map((user) => (
              <UserCard
                key={user?._id}
                userId={user?._id}
                username={user?.username}
                profilePicture={user?.profilePicture}
                name={user?.name}
                position={"horizontal"}
              />
            ))
          ) : (
            searched &&
            debouncedQuery && (
              <div className="flex justify-center items-center h-full text-gray-500 text-sm">
                No user found
              </div>
            )
          )}
        </div>
      </div>

      <div className="md:w-[450px] w-full h-auto  flex flex-col gap-3 overflow-auto ">
        {usersData?.data
          ?.filter((user) => user?._id !== currentUserId)
          .map((user) => (
            <UserCard
              key={user?._1d}
              userId={user?._id}
              username={user?.username}
              profilePicture={user?.profilePicture}
              name={user?.name}
              position={"horizontal"}
            />
          ))}
      </div>
    </div>
  );
}

export default SearchPage;
