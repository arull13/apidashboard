"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

type Project = {
  kode: string;
  title: string;
  description: string;
  website: string;
  link: string;
  video?: string;
  imageUrl?: string;
};

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Ganti URL ini ke API lokalmu nanti
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">
      <aside className="w-64 bg-[#1a1a1a] min-h-screen fixed top-0 left-0 p-6 border-r border-gray-800">
        <h1 className="text-2xl font-bold text-purple-500 mb-10">
          MyPortfolio
        </h1>
        <nav className="flex flex-col gap-4">
          <a
            href="#"
            className="text-gray-300 hover:text-purple-400 transition"
          >
            🏠 Dashboard
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">
            📁 Projects
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-purple-400 transition"
          >
            📸 Media
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">
            ⚙️ Settings
          </a>
        </nav>
      </aside>

      <main className="ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-white">Dashboard</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            <Link href="/addproject">+ Tambah Project</Link>
          </button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#1f1f1f] p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-purple-400">
              Total Projects
            </h3>
            <p className="text-3xl mt-2 font-bold text-white">
              {projects.length}
            </p>
          </div>
          <div className="bg-[#1f1f1f] p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-blue-400">Media Files</h3>
            <p className="text-3xl mt-2 font-bold text-white">34</p>
          </div>
          <div className="bg-[#1f1f1f] p-6 rounded-xl shadow hover:shadow-xl transition">
            <h3 className="text-xl font-bold text-purple-400">Website Views</h3>
            <p className="text-3xl mt-2 font-bold text-white">1,024</p>
          </div>
        </section>

        <section className="mt-10">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Recent Projects
          </h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.kode}
                className="bg-[#1a1a1a] p-4 rounded-lg flex justify-between items-center hover:bg-[#2a2a2a] transition"
              >
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {project.title}
                  </h4>
                  <p className="text-sm text-gray-400">{project.description}</p>
                </div>
                <a
                  href={project.link}
                  className="text-blue-400 hover:underline text-sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  View →
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
