"use client";

import { useState } from "react";
import Link from "next/link";

export default function ActivarCuentaPage() {
  const [autorizado, setAutorizado] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBF4EC] p-10">
      <div className="w-full max-w-[440px]">
        <div className="mb-[22px] flex size-[58px] items-center justify-center rounded-[18px] shadow-boton-coral"
          style={{ background: "linear-gradient(155deg, #F8C3A8, #F2937A)" }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </div>

        <h1 className="mb-2 font-display text-[32px] font-semibold leading-tight text-texto">
          Bienvenida a OpenDayCare
        </h1>
        <p className="mb-[26px] text-[15.5px] leading-relaxed text-texto-secundario">
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar la cuenta.
        </p>

        <div className="mb-[22px] flex items-center gap-[14px] rounded-[16px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[14px]">
          <div className="flex size-11 items-center justify-center rounded-full bg-avatar-celeste font-display text-[19px] font-semibold text-avatar-celeste-texto">
            M
          </div>
          <div>
            <div className="text-[13px] text-texto-secundario">Te invitaron a seguir a</div>
            <div className="font-display text-[17px] font-semibold text-texto">Mateo · Sala Soles</div>
          </div>
        </div>

        <div className="mb-2 text-xs font-bold tracking-[0.7px] text-texto-secundario">
          CÓDIGO DE INVITACIÓN
        </div>
        <input
          type="text"
          defaultValue="7K4P9"
          className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-3.5 font-display text-[18px] font-bold tracking-[3px] text-texto"
        />

        <div className="mb-2 text-xs font-bold tracking-[0.7px] text-texto-secundario">
          EMAIL
        </div>
        <input
          type="email"
          defaultValue="lucia.fernandez@gmail.com"
          className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-3.5 text-[15px] text-texto"
        />

        <div className="mb-2 text-xs font-bold tracking-[0.7px] text-texto-secundario">
          CREAR CONTRASEÑA
        </div>
        <input
          type="password"
          defaultValue="contraseña"
          className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#F2A78E] bg-white px-4 py-3.5 text-[15px] text-texto"
        />

        <label className="mb-6 flex cursor-pointer items-start gap-3 rounded-[14px] bg-[#FBF1D6] p-4">
          <input
            type="checkbox"
            checked={autorizado}
            onChange={(e) => setAutorizado(e.target.checked)}
            className="sr-only"
          />
          <span className={`mt-px flex size-6 shrink-0 items-center justify-center rounded-[8px] ${autorizado ? "bg-[#5FB97E]" : "bg-[#E0D5C0]"}`}>
            {autorizado && (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </span>
          <span className="text-[14px] leading-relaxed text-[#8A7234]">
            Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app.
          </span>
        </label>

        <button
          type="button"
          className="block w-full rounded-[15px] py-[15px] text-center font-extrabold text-base text-white"
          style={{
            background: "linear-gradient(180deg, #F4977E, #EE8164)",
            boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
          }}
        >
          Activar mi cuenta
        </button>

        <p className="mt-[22px] text-center text-[14.5px] text-texto-secundario">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="font-extrabold text-coral-oscuro">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
