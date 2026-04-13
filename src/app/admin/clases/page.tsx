"use client";

import { supabase } from "@/lib/supabase";
import { Clock, PlusCircle, Tag, Users, X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Instructor {
  id: string;
  name: string;
  title: string;
  image_data?: string;
}
interface Schedule {
  id: string;
  period: string;
  day_names: string;
  class_name: string;
  time: string;
}
interface Price {
  id: string;
  category: string;
  description: string;
  price: string;
  category_group: string;
}

export default function AdminClasesPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [instName, setInstName] = useState("");
  const [instTitle, setInstTitle] = useState("");
  const [instImage, setInstImage] = useState<string | null>(null);

  const [schPeriod, setSchPeriod] = useState("MAÑANA");
  const [schDays, setSchDays] = useState<string[]>([]);
  const [schClass, setSchClass] = useState("");
  const [schTime, setSchTime] = useState("");

  const [priceCat, setPriceCat] = useState("");
  const [priceDesc, setPriceDesc] = useState("");
  const [priceVal, setPriceVal] = useState("");
  const [priceGroup, setPriceGroup] = useState("");

  const formatPrice = (priceStr: string) => {
    const num = parseInt(priceStr.replace(/\D/g, ''), 10);
    if (!isNaN(num)) {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(num);
    }
    return priceStr;
  };

  const fetchData = async () => {
    setLoading(true);
    const resInst = await supabase
      .from("instructors")
      .select("*")
      .order("created_at", { ascending: true });
    if (resInst.data) setInstructors(resInst.data);

    const resSch = await supabase
      .from("general_schedules")
      .select("*")
      .order("period", { ascending: true });
    if (resSch.data) setSchedules(resSch.data);

    const resPrices = await supabase
      .from("class_prices")
      .select("*")
      .order("created_at", { ascending: true });
    if (resPrices.data) setPrices(resPrices.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if(!ctx) return;
        const size = 150; // Resize to 150x150 max to save database space
        canvas.width = size;
        canvas.height = size;
        
        // draw scaling taking the center (cover)
        const scale = Math.max(size / img.width, size / img.height);
        const x = (size / scale - img.width) / 2;
        const y = (size / scale - img.height) / 2;
        ctx.scale(scale, scale);
        ctx.drawImage(img, x, y);
        
        setInstImage(canvas.toDataURL("image/jpeg", 0.7)); // 0.7 quality saves bytes
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAddInst = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("instructors")
      .insert([{ name: instName, title: instTitle, image_data: instImage }]);
    if (!error) {
      setInstName("");
      setInstTitle("");
      setInstImage(null);
      fetchData();
    } else alert("Error al subir: Puede que falte crear la columna image_data en Supabase.");
  };
  const handleDeleteInst = async (id: string) => {
    if (!confirm("¿Seguro quieres borrar este instructor?")) return;
    const { error } = await supabase.from("instructors").delete().eq("id", id);
    if (!error) fetchData();
  };

  const handleAddSch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (schDays.length === 0) {
      alert("Debes seleccionar al menos un día.");
      return;
    }

    // Format the days properly: "Lun y Mié" or "Lun, Mar y Mié"
    let formattedDays = "";
    if (schDays.length === 1) {
      formattedDays = schDays[0];
    } else if (schDays.length === 2) {
      formattedDays = schDays.join(" y ");
    } else {
      formattedDays =
        schDays.slice(0, -1).join(", ") + " y " + schDays[schDays.length - 1];
    }

    const { error } = await supabase.from("general_schedules").insert([
      {
        period: schPeriod,
        day_names: formattedDays,
        class_name: schClass,
        time: schTime,
      },
    ]);
    if (!error) {
      setSchDays([]);
      setSchClass("");
      setSchTime("");
      fetchData();
    } else alert("Error: " + error.message);
  };
  const handleDeleteSch = async (id: string) => {
    if (!confirm("¿Seguro quieres borrar este horario?")) return;
    const { error } = await supabase
      .from("general_schedules")
      .delete()
      .eq("id", id);
    if (!error) fetchData();
  };

  const handleAddPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("class_prices").insert([
      {
        category: priceCat,
        description: priceDesc,
        price: priceVal,
        category_group: priceGroup,
      },
    ]);
    if (!error) {
      setPriceCat("");
      setPriceDesc("");
      setPriceVal("");
      setPriceGroup("");
      fetchData();
    } else alert("Error: " + error.message);
  };
  const handleDeletePrice = async (id: string) => {
    if (!confirm("¿Seguro quieres borrar este precio?")) return;
    const { error } = await supabase.from("class_prices").delete().eq("id", id);
    if (!error) fetchData();
  };

  if (loading)
    return (
      <div className="text-[#8B5E3C] font-bold p-10">
        Cargando Configuración...
      </div>
    );

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-3xl font-bold text-[#4A3B32]">
        Configuración Base de Clases
      </h1>
      <p className="text-[#6B5A4E]">
        Gestiona los Instructores, Horarios Fijos en tabla y Precios que se
        muestran en el sitio web público. (Nota: Esto no abre cupos en la agenda
        dinámica, solo modifica la info textual principal).
      </p>

      {/* SECCIÓN INSTRUCTORES */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EACCA4]/30">
        <h2 className="text-xl font-bold text-[#4A3B32] mb-4 flex items-center gap-2">
          <Users className="text-[#8B5E3C]" /> Instructores
        </h2>
        <form
          onSubmit={handleAddInst}
          className="flex flex-col md:flex-row gap-4 mb-6 items-center"
        >
          <label className="flex flex-col items-center justify-center w-12 h-12 rounded-full border border-dashed border-[#EACCA4] overflow-hidden bg-[#FAEDDF] cursor-pointer shrink-0 hover:border-[#8B5E3C] transition-colors">
            {instImage ? (
                <img src={instImage} alt="InstImage" className="w-full h-full object-cover" />
            ) : (
                <span className="text-[#8B5E3C] text-[10px] text-center font-bold px-1">FOTO</span>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          <input
            required
            placeholder="Nombre (Ej: Sofía)"
            value={instName}
            onChange={(e) => setInstName(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-[#EACCA4]"
          />
          <input
            required
            placeholder="Título (Ej: Sofía Yoga)"
            value={instTitle}
            onChange={(e) => setInstTitle(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-[#EACCA4]"
          />
          <button
            type="submit"
            className="bg-[#8B5E3C] text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2"
          >
            <PlusCircle size={18} /> Agregar
          </button>
        </form>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instructors.map((i) => (
            <div
              key={i.id}
              className="p-4 bg-[#FDFCF8] rounded-xl border relative group flex flex-col items-center text-center"
            >
              <button
                onClick={() => handleDeleteInst(i.id)}
                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"
              >
                <X size={16} />
              </button>
              {i.image_data ? (
                 <img src={i.image_data} alt={i.name} className="w-12 h-12 rounded-full object-cover mb-2 border border-[#EACCA4]" />
              ) : (
                 <div className="w-12 h-12 rounded-full border border-[#EACCA4] mb-2 flex items-center justify-center bg-[#FAEDDF] text-[#8B5E3C]">
                   <Users size={20} />
                 </div>
              )}
              <p className="font-bold">{i.name}</p>
              <p className="text-sm text-[#8B5E3C]">{i.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN HORARIOS */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EACCA4]/30">
        <h2 className="text-xl font-bold text-[#4A3B32] mb-4 flex items-center gap-2">
          <Clock className="text-[#8B5E3C]" /> Horarios Generales
        </h2>
        <form onSubmit={handleAddSch} className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <select
              value={schPeriod}
              onChange={(e) => setSchPeriod(e.target.value)}
              className="p-3 rounded-lg border border-[#EACCA4] w-full md:w-auto"
            >
              <option value="MAÑANA">Mañana</option>
              <option value="TARDE">Tarde</option>
            </select>
            <div className="flex flex-wrap gap-3 items-center border border-[#EACCA4] p-3 rounded-lg bg-[#FDFCF8] flex-1">
              <span className="text-sm text-[#8B5E3C] font-semibold mr-2">
                Días:
              </span>
              {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
                <label
                  key={d}
                  className="flex items-center gap-1.5 text-sm font-medium text-[#4A3B32] cursor-pointer hover:text-[#8B5E3C]"
                >
                  <input
                    type="checkbox"
                    checked={schDays.includes(d)}
                    onChange={() =>
                      setSchDays((prev) =>
                        prev.includes(d)
                          ? prev.filter((x) => x !== d)
                          : [...prev, d],
                      )
                    }
                    className="w-4 h-4 accent-[#8B5E3C] cursor-pointer"
                  />
                  {d}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              required
              placeholder="Clase (Ej: Yoga Wale)"
              value={schClass}
              onChange={(e) => setSchClass(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-[#EACCA4]"
            />
            <input
              required
              placeholder="Hora (Ej: 09:00)"
              value={schTime}
              onChange={(e) => setSchTime(e.target.value)}
              className="w-full md:w-32 p-3 rounded-lg border border-[#EACCA4]"
            />
            <button
              type="submit"
              className="bg-[#8B5E3C] text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-full md:w-auto"
            >
              <PlusCircle size={18} /> Agregar
            </button>
          </div>
        </form>
        <div className="grid md:grid-cols-2 gap-4">
          {schedules.map((s) => (
            <div
              key={s.id}
              className="p-3 bg-[#FDFCF8] rounded-xl border flex justify-between items-center group"
            >
              <div>
                <span className="font-bold text-[#8B5E3C]">{s.period}</span> -{" "}
                {s.day_names}: {s.class_name} <b>{s.time}</b>
              </div>
              <button
                onClick={() => handleDeleteSch(s.id)}
                className="text-red-500 opacity-0 group-hover:opacity-100"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN PRECIOS */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#EACCA4]/30">
        <h2 className="text-xl font-bold text-[#4A3B32] mb-4 flex items-center gap-2">
          <Tag className="text-[#8B5E3C]" /> Planes y Precios
        </h2>
        <form
          onSubmit={handleAddPrice}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <input
            required
            placeholder="Categoría (Ej: 🧘‍♀️ Yoga)"
            value={priceCat}
            onChange={(e) => setPriceCat(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-[#EACCA4]"
          />
          <input
            required
            placeholder="Descripción (Ej: 4 clases)"
            value={priceDesc}
            onChange={(e) => setPriceDesc(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-[#EACCA4]"
          />
          <input
            required
            placeholder="Precio (Ej: $40.000)"
            value={priceVal}
            onChange={(e) => setPriceVal(e.target.value)}
            className="w-32 p-3 rounded-lg border border-[#EACCA4]"
          />
          <input
            placeholder="Grupo (Ej: Yoga) opcional"
            value={priceGroup}
            onChange={(e) => setPriceGroup(e.target.value)}
            className="p-3 rounded-lg border border-[#EACCA4]"
          />
          <button
            type="submit"
            className="bg-[#8B5E3C] text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <PlusCircle size={18} /> Agregar
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prices.map((p) => (
            <div
              key={p.id}
              className="p-3 bg-[#FDFCF8] rounded-xl border flex justify-between items-center group"
            >
              <div>
                <b className="text-[#8B5E3C]">{p.category}</b> | {p.description}{" "}
                <b className="ml-2">{formatPrice(p.price)}</b>{" "}
                <span className="text-xs text-gray-400">
                  [{p.category_group}]
                </span>
              </div>
              <button
                onClick={() => handleDeletePrice(p.id)}
                className="text-red-500 opacity-0 group-hover:opacity-100"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
