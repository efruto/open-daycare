import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen bg-[#FBF4EC] lg:grid-cols-[1.05fr_1fr]">
      <div className="relative hidden flex-col justify-between overflow-hidden p-14 text-white lg:flex"
        style={{ background: "linear-gradient(155deg, #F6A98E 0%, #F2937A 45%, #EC7E62 100%)" }}
      >
        <div className="absolute -right-30 -top-35 h-[420px] w-[420px] rounded-full bg-white/12" />
        <div className="absolute -bottom-28 -left-20 h-[300px] w-[300px] rounded-full bg-white/10" />

        <div className="relative flex items-center gap-3">
          <div className="flex size-[46px] items-center justify-center rounded-[14px] bg-white/22">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          </div>
          <span className="font-display text-[21px] font-semibold tracking-wide">OpenDayCare</span>
        </div>

        <div className="relative">
          <h1 className="mb-[18px] font-display text-[42px] font-semibold leading-[1.12]">
            El día de cada niño,<br />compartido con su familia.
          </h1>
          <p className="max-w-[430px] text-[17px] leading-relaxed text-white/92">
            Publicá momentos, gestioná las salas y mantené a las familias cerca, desde un solo lugar.
          </p>
        </div>

        <div className="relative text-sm text-white/90">🌿 Guardería Sala Soles</div>
      </div>

      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-[392px]">
          <h2 className="mb-1.5 font-display text-[30px] font-semibold text-texto">Iniciar sesión</h2>
          <p className="mb-7 text-[15px] text-texto-secundario">Ingresá para ver el día de hoy.</p>

          <div className="mb-2 text-xs font-bold tracking-[0.7px] text-texto-secundario">
            INGRESO COMO
          </div>

          <div className="mb-2 text-xs font-bold tracking-[0.7px] text-texto-secundario">
            EMAIL
          </div>
          <input
            type="email"
            defaultValue="caro@opendaycare.com"
            className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-3.5 text-[15px] text-texto placeholder:text-[#B6A99B]"
          />

          <div className="mb-2 text-xs font-bold tracking-[0.7px] text-texto-secundario">
            CONTRASEÑA
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="mb-2.5 w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-3.5 text-[15px] text-texto placeholder:text-[#B6A99B]"
          />
          <div className="mb-5 text-right">
            <span className="cursor-pointer text-[13.5px] font-bold text-coral-oscuro">
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          <button
            type="button"
            className="block w-full rounded-[15px] py-[15px] text-center font-extrabold text-base text-white"
            style={{
              background: "linear-gradient(180deg, #F4977E, #EE8164)",
              boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
            }}
          >
            Iniciar sesión
          </button>

          <p className="mt-6 text-center text-[14.5px] text-texto-secundario">
            ¿Te invitó la guardería?{" "}
            <Link href="/activar-cuenta" className="font-extrabold text-coral-oscuro">
              Activá tu cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
