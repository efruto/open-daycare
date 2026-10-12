"use client";

import { useState } from "react";
import type { Kid } from "@/lib/mocks";

type AddKidModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (kid: Kid) => void;
};

const AVATAR_COLORS = ["#A9D9E8", "#F4B8CC", "#B9DEC4", "#C9B6E8", "#F4DC8E"];

export default function AddKidModal({ open, onClose, onSave }: AddKidModalProps) {
  const [nombre, setNombre] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sala, setSala] = useState("Soles");
  const [alergias, setAlergias] = useState("");
  const [notasMedicas, setNotasMedicas] = useState("");
  const [errores, setErrores] = useState<{ nombre?: string; fecha?: string }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  function validarFecha(fecha: string): boolean {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(fecha)) return false;
    const [dia, mes, anio] = fecha.split("/").map(Number);
    const fechaDate = new Date(anio, mes - 1, dia);
    return (
      fechaDate.getFullYear() === anio &&
      fechaDate.getMonth() === mes - 1 &&
      fechaDate.getDate() === dia
    );
  }

  function validarFormulario(): boolean {
    const nuevosErrores: { nombre?: string; fecha?: string } = {};
    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }
    if (!fechaNacimiento.trim()) {
      nuevosErrores.fecha = "La fecha es obligatoria";
    } else if (!validarFecha(fechaNacimiento)) {
      nuevosErrores.fecha = "Formato inválido (dd/mm/aaaa)";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function calcularEdad(fecha: string): number {
    const [dia, mes, anio] = fecha.split("/").map(Number);
    const hoy = new Date();
    let edad = hoy.getFullYear() - anio;
    const mesDiff = hoy.getMonth() - (mes - 1);
    if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < dia)) {
      edad--;
    }
    return edad;
  }

  function resetForm() {
    setNombre("");
    setFechaNacimiento("");
    setSala("Soles");
    setAlergias("");
    setNotasMedicas("");
    setErrores({});
    setFormSubmitted(false);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleGuardar() {
    setFormSubmitted(true);
    if (!validarFormulario()) return;

    const [dia, mes, anio] = fechaNacimiento.split("/").map(Number);
    const birthDateFormatted = `${dia} ${["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"][mes - 1]} ${anio}`;
    const mesesCortos = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
    const hoy = new Date();
    const enrollmentDate = `${mesesCortos[hoy.getMonth()]} ${hoy.getFullYear()}`;

    const avatarColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    const avatarLetter = nombre.trim().charAt(0).toUpperCase();

    const nuevoKid: Kid = {
      id: Date.now().toString(),
      name: nombre.trim(),
      age: calcularEdad(fechaNacimiento),
      room: sala,
      birthDate: birthDateFormatted,
      enrollmentDate,
      parents: [],
      allergies: alergias.trim() || undefined,
      avatarColor,
      avatarLetter,
    };

    if (alergias.trim()) {
      const primeraAlergia = alergias.split(",")[0].trim().toUpperCase();
      if (primeraAlergia) {
        nuevoKid.badge = { text: primeraAlergia, color: "#FBD8CC" };
      }
    }

    onSave(nuevoKid);
    resetForm();
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-10 bg-black/40">
      <div
        className="w-full max-w-[520px] rounded-[24px] overflow-hidden shadow-2xl"
        style={{ background: "#FBF4EC", border: "1px solid #ECE0D0" }}
      >
        <div
          className="flex items-center justify-between px-[26px] py-5"
          style={{ borderBottom: "1px solid #ECE0D0" }}
        >
          <button
            onClick={handleClose}
            className="font-extrabold text-[15px] cursor-pointer"
            style={{ color: "#94887B" }}
          >
            Cancelar
          </button>
          <span className="font-display font-semibold text-[18px]" style={{ color: "#3F362E" }}>
            Agregar niño
          </span>
          <button
            onClick={handleGuardar}
            className="font-extrabold text-[15px] cursor-pointer"
            style={{ color: "#D9583C" }}
          >
            Guardar
          </button>
        </div>

        <div className="px-[26px] py-6">
          <div className="text-[12px] font-extrabold tracking-[0.7px] mb-2" style={{ color: "#94887B" }}>
            NOMBRE COMPLETO
          </div>
          <input
            placeholder="Ej. Martina López"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-[13px] rounded-[14px] text-[15px] mb-[4px]"
            style={{
              border: formSubmitted && errores.nombre ? "1.5px solid #D9583C" : "1.5px solid #EADFD0",
              background: "#fff",
              color: "#3F362E",
            }}
          />
          {formSubmitted && errores.nombre && (
            <div className="text-[12px] font-bold mb-[14px]" style={{ color: "#D9583C" }}>
              {errores.nombre}
            </div>
          )}
          {!(formSubmitted && errores.nombre) && <div className="mb-[18px]" />}

          <div className="flex gap-[14px] mb-[18px]">
            <div className="flex-1">
              <div className="text-[12px] font-extrabold tracking-[0.7px] mb-2" style={{ color: "#94887B" }}>
                FECHA DE NACIMIENTO
              </div>
              <input
                placeholder="dd/mm/aaaa"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className="w-full px-4 py-[13px] rounded-[14px] text-[15px]"
                style={{
                  border: formSubmitted && errores.fecha ? "1.5px solid #D9583C" : "1.5px solid #EADFD0",
                  background: "#fff",
                  color: "#3F362E",
                }}
              />
              {formSubmitted && errores.fecha && (
                <div className="text-[12px] font-bold mt-1" style={{ color: "#D9583C" }}>
                  {errores.fecha}
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="text-[12px] font-extrabold tracking-[0.7px] mb-2" style={{ color: "#94887B" }}>
                SALA
              </div>
              <div className="relative">
                <select
                  value={sala}
                  onChange={(e) => setSala(e.target.value)}
                  className="w-full px-4 py-[13px] rounded-[14px] text-[15px] font-bold appearance-none cursor-pointer"
                  style={{
                    border: "1.5px solid #EADFD0",
                    background: "#fff",
                    color: "#3F362E",
                  }}
                >
                  <option value="Soles">Soles</option>
                  <option value="Lunas">Lunas</option>
                  <option value="Estrellas">Estrellas</option>
                </select>
                <svg
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B0A290"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-[12px] font-extrabold tracking-[0.7px] mb-2" style={{ color: "#94887B" }}>
            ALERGIAS (ETIQUETAS)
          </div>
          <input
            placeholder="Ej. Maní, Lactosa"
            value={alergias}
            onChange={(e) => setAlergias(e.target.value)}
            className="w-full px-4 py-[13px] rounded-[14px] text-[15px] mb-[18px]"
            style={{
              border: "1.5px solid #EADFD0",
              background: "#fff",
              color: "#3F362E",
            }}
          />

          <div className="text-[12px] font-extrabold tracking-[0.7px] mb-2" style={{ color: "#94887B" }}>
            NOTAS MÉDICAS
          </div>
          <textarea
            placeholder="Indicaciones, medicación, contactos…"
            value={notasMedicas}
            onChange={(e) => setNotasMedicas(e.target.value)}
            className="w-full min-h-[90px] resize-y px-4 py-[13px] rounded-[14px] text-[15px] leading-relaxed"
            style={{
              border: "1.5px solid #EADFD0",
              background: "#fff",
              color: "#3F362E",
            }}
          />
        </div>
      </div>
    </div>
  );
}
