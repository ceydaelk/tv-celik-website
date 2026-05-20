"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, X, Pencil, Trash2 } from "lucide-react";
import type { Project } from "@/types/content";
import { getProjectsAdmin, addProject, updateProject, deleteProject } from "@/lib/firestore/projects";
import ImageUploadField from "@/components/admin/ImageUploadField";

// ── Types ─────────────────────────────────────────────────────────────────────

type ProjectForm = {
  title: string; category: string; location: string;
  description: string; imageUrl: string; order: number;
};

type RowEdit = ProjectForm & { saving: boolean; err: string };

const EMPTY: ProjectForm = {
  title: "", category: "", location: "", description: "", imageUrl: "", order: 0,
};

function projectToForm(p: Project): ProjectForm {
  return {
    title:       p.title,
    category:    p.category,
    location:    p.location,
    description: p.description ?? "",
    imageUrl:    p.imageUrl ?? "",
    order:       p.order,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading]   = useState(true);
  const [errMsg, setErrMsg]     = useState("");

  // Inline row edit — keyed by project id
  const [rowEdit, setRowEdit] = useState<Record<string, RowEdit>>({});

  // Add modal
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState<ProjectForm>(EMPTY);
  const [addSaving, setAddSaving] = useState(false);
  const [addErr, setAddErr]   = useState("");

  // Delete confirmations
  const [delId, setDelId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProjectsAdmin();
      setProjects(data);
    } catch {
      setErrMsg("Projeler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Inline edit ────────────────────────────────────────────────────────────
  function openEdit(project: Project) {
    setRowEdit((prev) => ({
      ...prev,
      [project.id]: { ...projectToForm(project), saving: false, err: "" },
    }));
  }

  function closeEdit(id: string) {
    setRowEdit((prev) => { const next = { ...prev }; delete next[id]; return next; });
  }

  function updRow(id: string, patch: Partial<RowEdit>) {
    setRowEdit((prev) => ({ ...prev, [id]: { ...prev[id], ...patch, err: "" } }));
  }

  async function saveRow(id: string) {
    const rf = rowEdit[id];
    if (!rf.title.trim()) { updRow(id, { err: "Proje başlığı zorunludur." }); return; }
    updRow(id, { saving: true });
    try {
      await updateProject(id, {
        title:       rf.title,
        category:    rf.category,
        location:    rf.location,
        description: rf.description,
        imageUrl:    rf.imageUrl,
        order:       rf.order,
      });
      closeEdit(id);
      await load();
    } catch {
      updRow(id, { saving: false, err: "Kayıt başarısız." });
    }
  }

  // ── Add ────────────────────────────────────────────────────────────────────
  async function handleAdd() {
    if (!addForm.title.trim()) { setAddErr("Proje başlığı zorunludur."); return; }
    setAddSaving(true); setAddErr("");
    try {
      await addProject({
        ...addForm,
        order:     addForm.order || projects.length,
        createdAt: new Date().toISOString(),
      });
      setShowAdd(false);
      setAddForm(EMPTY);
      await load();
    } catch {
      setAddErr("Kayıt başarısız.");
    } finally {
      setAddSaving(false);
    }
  }

  // ── Delete ─────────────────────────────────────────────────────────────────
  async function confirmDel(id: string) {
    try { await deleteProject(id); setDelId(null); await load(); }
    catch { setErrMsg("Silme başarısız."); }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="p-8 flex items-center gap-2 text-sm text-[#8A8680]">
      <div className="w-4 h-4 border-2 border-[#9D7C64] border-t-transparent rounded-full animate-spin" />
      Yükleniyor...
    </div>
  );

  return (
    <div className="p-8 max-w-4xl">

      <div className="mb-8 pb-5 border-b border-[#DDDBD6] flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1C]">Projeler</h1>
          <p className="text-sm text-[#8A8680] mt-1">Referans projeleri ekleyin, düzenleyin veya silin.</p>
        </div>
        <button onClick={() => { setAddForm({ ...EMPTY, order: projects.length }); setAddErr(""); setShowAdd(true); }}
          className="flex items-center gap-2 bg-[#1C1C1C] hover:bg-[#333] text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
          <Plus size={14} /> Proje Ekle
        </button>
      </div>

      {errMsg && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{errMsg}</div>
      )}

      {projects.length === 0 ? (
        <div className="bg-[#F7F8FA] border border-[#DDDBD6] rounded-xl p-10 text-center">
          <p className="text-sm text-[#8A8680] mb-3">Henüz proje eklenmemiş.</p>
          <button onClick={() => { setAddForm(EMPTY); setShowAdd(true); }}
            className="text-sm text-[#9D7C64] hover:text-[#866A56] transition-colors">
            İlk projeyi ekle →
          </button>
        </div>
      ) : (
        <div className="bg-white border border-[#DDDBD6] rounded-xl overflow-hidden">
          <div className="divide-y divide-[#F3F2EF]">
            {projects.map((project) => {
              const isEditing = !!rowEdit[project.id];
              const rf = rowEdit[project.id];

              return (
                <div key={project.id}>
                  {/* ── Project row ── */}
                  <div className="flex items-center gap-3 px-5 py-3 hover:bg-[#FAFAF9]">
                    {project.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-[#DDDBD6]" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#1C1C1C]">{project.title}</p>
                      <p className="text-xs text-[#8A8680]">
                        {[project.category, project.location].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {delId === project.id ? (
                        <span className="flex items-center gap-1 text-xs">
                          <span className="text-red-600">Emin misiniz?</span>
                          <button onClick={() => confirmDel(project.id)} className="text-white bg-red-500 hover:bg-red-600 rounded px-2 py-0.5">Sil</button>
                          <button onClick={() => setDelId(null)} className="text-[#8A8680] border border-[#DDDBD6] rounded px-2 py-0.5">İptal</button>
                        </span>
                      ) : (
                        <>
                          <button onClick={() => isEditing ? closeEdit(project.id) : openEdit(project)}
                            className={`${ICON_BTN} ${isEditing ? "bg-[#F3F2EF] text-[#9D7C64]" : ""}`}
                            title="Düzenle">
                            <Pencil size={13} />
                          </button>
                          <button onClick={() => setDelId(project.id)}
                            className={`${ICON_BTN} hover:text-red-500 hover:bg-red-50`} title="Sil">
                            <Trash2 size={13} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* ── Inline edit panel ── */}
                  {isEditing && rf && (
                    <div className="bg-[#FAFAF9] border-t border-[#F3F2EF] px-5 py-4 space-y-4">
                      {rf.err && (
                        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1">{rf.err}</p>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FL label="Proje Başlığı" required>
                          <input type="text" value={rf.title} onChange={(e) => updRow(project.id, { title: e.target.value })} className={IN} />
                        </FL>
                        <FL label="Kategori" hint='Örnek: "Endüstriyel"'>
                          <input type="text" value={rf.category} onChange={(e) => updRow(project.id, { category: e.target.value })} className={IN} />
                        </FL>
                        <FL label="Konum" hint='Örnek: "İstanbul"'>
                          <input type="text" value={rf.location} onChange={(e) => updRow(project.id, { location: e.target.value })} className={IN} />
                        </FL>
                        <FL label="Sıra No">
                          <input type="number" value={rf.order} onChange={(e) => updRow(project.id, { order: +e.target.value })} className={IN} />
                        </FL>
                      </div>
                      <FL label="Açıklama">
                        <textarea rows={3} value={rf.description}
                          onChange={(e) => updRow(project.id, { description: e.target.value })}
                          className={`${IN} resize-none`} />
                      </FL>
                      <FL label="Proje Görseli">
                        <ImageUploadField value={rf.imageUrl}
                          onChange={(url) => updRow(project.id, { imageUrl: url })}
                          storagePath="projects" />
                      </FL>
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => saveRow(project.id)} disabled={rf.saving}
                          className="bg-[#1C1C1C] hover:bg-[#333] disabled:opacity-50 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors">
                          {rf.saving ? "Kaydediliyor..." : "Kaydet"}
                        </button>
                        <button onClick={() => closeEdit(project.id)}
                          className="text-xs text-[#8A8680] hover:text-[#1C1C1C] border border-[#DDDBD6] rounded-lg px-3 py-1.5 transition-colors">
                          İptal
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Add modal ──────────────────────────────────────────────────────── */}
      {showAdd && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">

            <div className="flex items-center justify-between px-6 py-4 border-b border-[#DDDBD6] flex-shrink-0">
              <h2 className="text-base font-bold text-[#1C1C1C]">Yeni Proje</h2>
              <button onClick={() => setShowAdd(false)} className="text-[#8A8680] hover:text-[#1C1C1C]"><X size={18} /></button>
            </div>

            <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
              {addErr && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{addErr}</div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FL label="Proje Başlığı" required>
                  <input type="text" value={addForm.title} onChange={(e) => setAddForm((p) => ({ ...p, title: e.target.value }))} className={IN} />
                </FL>
                <FL label="Kategori">
                  <input type="text" value={addForm.category} onChange={(e) => setAddForm((p) => ({ ...p, category: e.target.value }))} placeholder="Endüstriyel" className={IN} />
                </FL>
                <FL label="Konum">
                  <input type="text" value={addForm.location} onChange={(e) => setAddForm((p) => ({ ...p, location: e.target.value }))} placeholder="İstanbul" className={IN} />
                </FL>
                <FL label="Sıra No">
                  <input type="number" value={addForm.order} onChange={(e) => setAddForm((p) => ({ ...p, order: +e.target.value }))} className={IN} />
                </FL>
              </div>
              <FL label="Açıklama">
                <textarea rows={3} value={addForm.description}
                  onChange={(e) => setAddForm((p) => ({ ...p, description: e.target.value }))}
                  className={`${IN} resize-none`} />
              </FL>
              <FL label="Proje Görseli">
                <ImageUploadField value={addForm.imageUrl}
                  onChange={(url) => setAddForm((p) => ({ ...p, imageUrl: url }))}
                  storagePath="projects" />
              </FL>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-[#DDDBD6] flex-shrink-0">
              <button onClick={handleAdd} disabled={addSaving}
                className="bg-[#1C1C1C] hover:bg-[#333] disabled:opacity-50 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors">
                {addSaving ? "Kaydediliyor..." : "Ekle"}
              </button>
              <button onClick={() => setShowAdd(false)}
                className="text-sm text-[#8A8680] hover:text-[#1C1C1C] border border-[#DDDBD6] rounded-lg px-4 py-2 transition-colors">
                İptal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const IN = "w-full px-3 py-2 text-sm border border-[#DDDBD6] rounded-lg outline-none focus:border-[#9D7C64] focus:ring-2 focus:ring-[#9D7C64]/10 transition-colors";
const ICON_BTN = "p-1.5 text-[#8A8680] hover:text-[#9D7C64] hover:bg-[#F3F2EF] rounded transition-colors";

function FL({ label, hint, required, children }: {
  label: string; hint?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-normal text-[#1C1C1C] mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {hint && <span className="ml-1.5 text-xs text-[#8A8680]">({hint})</span>}
      </label>
      {children}
    </div>
  );
}
