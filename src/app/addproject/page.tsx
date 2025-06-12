"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
export default function AddProjectForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    kode: "",
    title: "",
    description: "",
    website: "",
    video: "",
    image: null as File | null,
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("kode", form.kode);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("website", form.website);
    formData.append("video", form.video);
    if (form.image) formData.append("image", form.image);

    const res = await fetch("/api/projects", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setSuccess(true);
      setForm({
        kode: "",
        title: "",
        description: "",
        website: "",
        video: "",
        image: null,
      });
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 p-4 bg-gray-900 text-white space-y-4 rounded-lg"
    >
      <h2 className="text-xl font-bold">Tambah Project</h2>

      {success && (
        <div className="text-green-400">✅ Project berhasil ditambahkan!</div>
      )}

      <input
        type="text"
        name="kode"
        value={form.kode}
        onChange={handleChange}
        required
        placeholder="kode"
        className="w-full p-2 bg-gray-800 rounded"
      />

      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        placeholder="Judul"
        className="w-full p-2 bg-gray-800 rounded"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        required
        placeholder="Deskripsi"
        className="w-full p-2 bg-gray-800 rounded"
      />

      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        required
        placeholder="Website"
        className="w-full p-2 bg-gray-800 rounded"
      />

      <input
        type="text"
        name="video"
        value={form.video}
        onChange={handleChange}
        placeholder="Link Video (Opsional)"
        className="w-full p-2 bg-gray-800 rounded"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        required
        className="text-white"
      />

      <button
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded w-full"
      >
        {loading ? "Menyimpan..." : "Simpan Project"}
      </button>
    </form>
  );
}
