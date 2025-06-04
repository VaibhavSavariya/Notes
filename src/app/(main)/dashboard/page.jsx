"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useSession } from "next-auth/react";

const NOTES_PER_PAGE = 4;

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const { data: session, status } = useSession();
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    if (session?.user?._id) {
      setNotes(storedNotes.filter((note) => note.userId === session.user._id));
    } else {
      setNotes([]);
    }
  }, [session]);

  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);

    const allNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const filteredAllNotes = allNotes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(filteredAllNotes));

    if ((page - 1) * NOTES_PER_PAGE >= updatedNotes.length && page > 1) {
      setPage(page - 1);
    }
  };

  const totalPages = Math.ceil(notes.length / NOTES_PER_PAGE);
  const paginatedNotes = notes.slice(
    (page - 1) * NOTES_PER_PAGE,
    page * NOTES_PER_PAGE
  );

  return (
    <div className="px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Your Notes</h2>
          <Link
            href="/create-note"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
            title="Create Note"
          >
            <FiPlus className="text-xl" />
            <span className="hidden sm:inline">Create</span>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {paginatedNotes.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500">
              No notes yet. Click the <span className="font-semibold">+</span>{" "}
              to create one!
            </div>
          ) : (
            paginatedNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-lg shadow p-5 hover:shadow-md transition flex flex-col"
              >
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 break-words line-clamp-4 overflow-hidden">
                    {note.content}
                  </p>
                </div>
                <div className="flex gap-2 mt-4 justify-end">
                  <Link
                    href={`/edit-note/${note.id}`}
                    className="inline-flex items-center px-3 py-1.5 text-sm bg-yellow-400 text-gray-800 rounded hover:bg-yellow-500 transition"
                    title="Edit"
                  >
                    <FiEdit2 className="mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="inline-flex items-center px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                    title="Delete"
                  >
                    <FiTrash2 className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } transition`}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 rounded ${
                  page === idx + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded ${
                page === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } transition`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
