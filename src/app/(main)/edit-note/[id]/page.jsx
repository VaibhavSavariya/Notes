"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const EditNote = () => {
  const router = useRouter();
  const params = useParams();
  const noteId = params?.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!noteId) return;
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    const note = notes.find((n) => String(n.id) === String(noteId));
    if (note) {
      setTitle(note.title);
      setDescription(note.content);
    } else {
      setError("Note not found.");
    }
  }, [noteId]);

  const validate = () => {
    if (!title.trim() || !description.trim()) {
      return "Both fields are required.";
    }
    if (title.trim().length < 3) {
      return "Title must be at least 3 characters.";
    }
    if (title.trim().length > 20) {
      return "Title must be less than 20 characters.";
    }
    if (description.trim().length < 10) {
      return "Description must be at least 10 characters.";
    }
    if (description.trim().length > 500) {
      return "Description must be less than 500 characters.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    const updatedNotes = notes.map((n) =>
      String(n.id) === String(noteId)
        ? { ...n, title: title.trim(), content: description.trim() }
        : n
    );
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setSuccess("Note updated successfully!");
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Edit Note
        </h2>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-sm text-center">{success}</div>
        )}
        <label className="flex flex-col gap-1 text-gray-700">
          Title
          <input
            type="text"
            className="p-2 rounded border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            maxLength={50}
          />
        </label>
        <label className="flex flex-col gap-1 text-gray-700">
          Description
          <textarea
            className="p-2 rounded border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter note description"
            rows={5}
            maxLength={500}
          />
        </label>
        <button
          type="submit"
          className="py-3 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold text-base mt-2 transition-colors"
        >
          Update Note
        </button>
      </form>
    </div>
  );
};

export default EditNote;
