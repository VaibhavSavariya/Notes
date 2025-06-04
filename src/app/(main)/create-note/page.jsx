"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateNote = () => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
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
    const note = {
      userId: session?.user?._id || "guest",
      id: Date.now(),
      title: title.trim(),
      content: description.trim(),
    };
    const existingNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    localStorage.setItem("notes", JSON.stringify([note, ...existingNotes]));
    setSuccess("Note created successfully!");
    setTitle("");
    setDescription("");
    router.push("/dashboard");
  };

  return (
    <div className=" mt-10 flex items-center justify-center  px-4">
      <form
        onSubmit={handleSubmit}
        className=" p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-5"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800 text-center flex-1">
            Create Note
          </h2>
          <button
            type="button"
            onClick={() => router.back()}
            className="ml-2 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            title="Back"
          >
            Back
          </button>
        </div>
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
          />
        </label>
        <button
          type="submit"
          className="py-3 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold text-base mt-2 transition-colors"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
