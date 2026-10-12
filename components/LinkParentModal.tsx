"use client";

import { useState, useMemo } from "react";
import type { Parent } from "@/lib/mocks";

type LinkParentModalProps = {
  open: boolean;
  kidName: string;
  onClose: () => void;
  onLink: (parent: Parent, invitationCode: string) => void;
};

const AVATAR_COLORS = ["#A9D9E8", "#F4B8CC", "#B9DEC4", "#C9B6E8", "#F4DC8E", "#A9C7E8"];

function generarCodigoInvitacion(): string {
  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let codigo = "";
  for (let i = 0; i < 5; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

export default function LinkParentModal({ open, kidName, onClose, onLink }: LinkParentModalProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [parentesco, setParentesco] = useState<"Mamá" | "Papá" | "Tutor/a">("Mamá");
  const [errores, setErrores] = useState<{ nombre?: string; email?: string }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const codigoInvitacion = useMemo(() => {
    if (!open) return "";
    return generarCodigoInvitacion();
  }, [open]);

  function validarFormulario(): boolean {
    const nuevosErrores: { nombre?: string; email?: string } = {};
    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }
    if (!email.trim()) {
      nuevosErrores.email = "El email es obligatorio";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        nuevosErrores.email = "Formato de email inválido";
      }
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function resetForm() {
    setNombre("");
    setEmail("");
    setParentesco("Mamá");
    setErrores({});
    setFormSubmitted(false);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleEnviarInvitacion() {
    setFormSubmitted(true);
    if (!validarFormulario()) return;

    const avatarColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    const avatarLetter = nombre.trim().charAt(0).toUpperCase();

    const nuevoParent: Parent = {
      id: Date.now().toString(),
      name: nombre.trim(),
      relation: parentesco,
      status: "PENDIENTE",
      avatarColor,
      avatarLetter,
    };

    onLink(nuevoParent, codigoInvitacion);
    resetForm();
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-10 bg-black/40">
      <div
        className="w-full max-w-[480px] rounded-[24px] overflow-hidden shadow-2xl"
        style={{ background: "#FBF4EC", border: "1px solid #ECE0D0" }}
      >
        <div
          className="flex items-center justify-between px-[26px] py-5"
          style={{ borderBottom: "1px solid #ECE0D0" }}
        >
          <div>
            <div className="font-display font-semibold text-[18px]" style={{ color: "#3F362E" }}>
              Vincular padre
            </div>
            <div className="text-[13px]" style={{ color: "#A89A8B" }}>
              a {kidName}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center cursor-pointer"
            style={{ background: "#F0E6D8", color: "#94887B" }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-[26px] py-[22px]">
          <div
            className="flex gap-[11px] rounded-[14px] px-4 py-[13px] mb-5"
            style={{ background: "#E3ECFB" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4E72C8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-none mt-[1px]"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <span className="text-[13.5px] leading-[1.45]" style={{ color: "#3F5694" }}>
              Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de {kidName.split(" ")[0]}.
            </span>
          </div>

          <div className="text-[12px] font-extrabold tracking-[0.7px] mb-2" style={{ color: "#94887B" }}>
            NOMBRE DEL PADRE/MADRE
          </div>
          <input
            placeholder="Ej. Diego Fernández"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-[13px] rounded-[14px] text-[15px] mb-[18px]"
            style={{
              border: formSubmitted && errores.nombre ? "1.5px solid #D9583C" : "1.5px solid #EADFD0",
              background: "#fff",
              color: "#3F362E",
            }}
          />
          {formSubmitted && errores.nombre && (
            <div className="text-[12px] font-bold -mt-[14px] mb-[14px]" style={{ color: "#D9583C" }}>
              {errores.nombre}
            </div>
          )}

          <div className="text-[12px] font-extrabold tracking-[0.7px] mb-2" style={{ color: "#94887B" }}>
            EMAIL
          </div>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-[13px] rounded-[14px] text-[15px] mb-[18px]"
            style={{
              border: formSubmitted && errores.email ? "1.5px solid #D9583C" : "1.5px solid #EADFD0",
              background: "#fff",
              color: "#3F362E",
            }}
          />
          {formSubmitted && errores.email && (
            <div className="text-[12px] font-bold -mt-[14px] mb-[14px]" style={{ color: "#D9583C" }}>
              {errores.email}
            </div>
          )}

          <div className="text-[12px] font-extrabold tracking-[0.7px] mb-[10px]" style={{ color: "#94887B" }}>
            PARENTESCO
          </div>
          <div className="flex gap-[9px] mb-5">
            <button
              onClick={() => setParentesco("Mamá")}
              className="flex-1 py-[11px] rounded-full font-extrabold text-[14px] cursor-pointer"
              style={{
                border: parentesco === "Mamá" ? "1.5px solid #9FB8EC" : "1.5px solid #ECE0D0",
                background: parentesco === "Mamá" ? "#CCD8F4" : "#FFFDF9",
                color: parentesco === "Mamá" ? "#4E72C8" : "#6E6359",
              }}
            >
              Mamá
            </button>
            <button
              onClick={() => setParentesco("Papá")}
              className="flex-1 py-[11px] rounded-full font-extrabold text-[14px] cursor-pointer"
              style={{
                border: parentesco === "Papá" ? "1.5px solid #9FB8EC" : "1.5px solid #ECE0D0",
                background: parentesco === "Papá" ? "#CCD8F4" : "#FFFDF9",
                color: parentesco === "Papá" ? "#4E72C8" : "#6E6359",
              }}
            >
              Papá
            </button>
            <button
              onClick={() => setParentesco("Tutor/a")}
              className="flex-1 py-[11px] rounded-full font-extrabold text-[14px] cursor-pointer"
              style={{
                border: parentesco === "Tutor/a" ? "1.5px solid #9FB8EC" : "1.5px solid #ECE0D0",
                background: parentesco === "Tutor/a" ? "#CCD8F4" : "#FFFDF9",
                color: parentesco === "Tutor/a" ? "#4E72C8" : "#6E6359",
              }}
            >
              Tutor/a
            </button>
          </div>

          <div
            className="rounded-[16px] px-[18px] py-[22px] text-center mb-5"
            style={{ background: "#FBF1D6", border: "1.5px dashed #E6D08A" }}
          >
            <div className="text-[12px] font-extrabold tracking-[0.7px] mb-2" style={{ color: "#A88526" }}>
              CÓDIGO DE INVITACIÓN
            </div>
            <div
              className="font-display font-semibold text-[34px] tracking-[7px]"
              style={{ color: "#8A7234" }}
            >
              {codigoInvitacion}
            </div>
            <div className="text-[13px] mt-[6px]" style={{ color: "#A88526" }}>
              Vence en 7 días
            </div>
          </div>

          <button
            onClick={handleEnviarInvitacion}
            className="flex items-center justify-center gap-[9px] w-full py-[14px] rounded-[14px] font-extrabold text-[15.5px] text-white cursor-pointer"
            style={{
              background: "linear-gradient(180deg, #F4977E, #EE8164)",
              boxShadow: "0 10px 22px -8px rgba(238, 129, 100, 0.7)",
            }}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4z" />
              <path d="M22 2 11 13" />
            </svg>
            Enviar invitación
          </button>
        </div>
      </div>
    </div>
  );
}
