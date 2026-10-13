export type TipoPost = "comida" | "siesta" | "actividad" | "logro" | "animo" | "foto" | "anuncio";

export interface Comentario {
  id: string;
  autor: string;
  rol: string;
  avatarColor: string;
  avatarLetter: string;
  hora: string;
  texto: string;
}

export interface PostMock {
  id: string;
  tipo: TipoPost;
  autor: string;
  iniciales?: string;
  hora: string;
  destinatarios: string;
  texto: string;
  foto?: { etiqueta: string };
  meEncanta: number;
  comentarios: Comentario[];
}

export const usuarioActual = {
  nombre: "Caro Giménez",
  rol: "Maestra",
  sala: "Soles",
  iniciales: "C",
};

export const usuarioFamilia = {
  nombre: "Lucía Fernández",
  rol: "mamá",
  avatarColor: "#C9B6E8",
  avatarLetter: "L",
};

export const feedPosts: PostMock[] = [
  {
    id: "logro-orinal",
    tipo: "logro",
    autor: "Mateo",
    iniciales: "M",
    hora: "14:20",
    destinatarios: "familia de Mateo",
    texto: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    meEncanta: 3,
    comentarios: [],
  },
  {
    id: "actividad-temperas",
    tipo: "actividad",
    autor: "Mateo",
    iniciales: "M",
    hora: "09:40",
    destinatarios: "familia de Mateo",
    texto: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    foto: { etiqueta: "Foto · pintando con témperas" },
    meEncanta: 5,
    comentarios: [
      {
        id: "c1",
        autor: "Lucía Fernández",
        rol: "mamá",
        avatarColor: "#C9B6E8",
        avatarLetter: "L",
        hora: "10:02",
        texto: "¡Qué hermoso! En casa también le encanta el azul.",
      },
      {
        id: "c2",
        autor: "Maestra Caro",
        rol: "maestra",
        avatarColor: "#F2937A",
        avatarLetter: "C",
        hora: "10:15",
        texto: "¡Se nota mucho! Le guardamos la obra 🎨",
      },
    ],
  },
  {
    id: "anuncio-parque",
    tipo: "anuncio",
    autor: "Anuncio general",
    hora: "07:50",
    destinatarios: "toda la sala",
    texto: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    meEncanta: 8,
    comentarios: [],
  },
];
