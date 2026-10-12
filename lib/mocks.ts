export type Parent = {
  id: string;
  name: string;
  relation: string;
  status: "ACTIVA" | "PENDIENTE" | "VINCULAR";
  avatarColor: string;
  avatarLetter: string;
};

export type Kid = {
  id: string;
  name: string;
  age: number;
  room: string;
  birthDate: string;
  enrollmentDate: string;
  parents: Parent[];
  allergies?: string;
  avatarColor: string;
  avatarLetter: string;
  badge?: { text: string; color: string };
};

export const mockKids: Kid[] = [
  {
    id: "1",
    name: "Mateo Fernández",
    age: 3,
    room: "Soles",
    birthDate: "12 mar 2022",
    enrollmentDate: "feb 2025",
    parents: [
      { id: "p1", name: "Lucía Fernández", relation: "Mamá", status: "ACTIVA", avatarColor: "#C9B6E8", avatarLetter: "L" },
      { id: "p2", name: "Diego Fernández", relation: "Papá", status: "PENDIENTE", avatarColor: "#A9C7E8", avatarLetter: "D" },
    ],
    allergies: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    avatarColor: "#A9D9E8",
    avatarLetter: "M",
    badge: { text: "MANÍ", color: "#FBD8CC" },
  },
  {
    id: "2",
    name: "Sofía Méndez",
    age: 2,
    room: "Soles",
    birthDate: "15 jun 2023",
    enrollmentDate: "mar 2025",
    parents: [
      { id: "p3", name: "Ana Méndez", relation: "Mamá", status: "ACTIVA", avatarColor: "#F4B8CC", avatarLetter: "A" },
    ],
    avatarColor: "#F4B8CC",
    avatarLetter: "S",
  },
  {
    id: "3",
    name: "Benjamín Ruiz",
    age: 3,
    room: "Soles",
    birthDate: "8 ene 2022",
    enrollmentDate: "feb 2025",
    parents: [
      { id: "p4", name: "María Ruiz", relation: "Mamá", status: "ACTIVA", avatarColor: "#B9DEC4", avatarLetter: "M" },
      { id: "p5", name: "Carlos Ruiz", relation: "Papá", status: "PENDIENTE", avatarColor: "#C9B6E8", avatarLetter: "C" },
    ],
    avatarColor: "#B9DEC4",
    avatarLetter: "B",
  },
  {
    id: "4",
    name: "Valentina Soto",
    age: 2,
    room: "Soles",
    birthDate: "22 sep 2023",
    enrollmentDate: "abr 2025",
    parents: [],
    avatarColor: "#F4DC8E",
    avatarLetter: "V",
  },
  {
    id: "5",
    name: "Tomás Díaz",
    age: 3,
    room: "Soles",
    birthDate: "5 dic 2021",
    enrollmentDate: "ene 2025",
    parents: [
      { id: "p6", name: "Laura Díaz", relation: "Mamá", status: "ACTIVA", avatarColor: "#A9C7E8", avatarLetter: "L" },
    ],
    allergies: "Intolerancia a la lactosa. Evitar lácteos.",
    avatarColor: "#C9B6E8",
    avatarLetter: "T",
    badge: { text: "LACTOSA", color: "#FBD8CC" },
  },
  {
    id: "6",
    name: "Emma Castro",
    age: 2,
    room: "Soles",
    birthDate: "18 jul 2023",
    enrollmentDate: "mar 2025",
    parents: [
      { id: "p7", name: "Paula Castro", relation: "Mamá", status: "ACTIVA", avatarColor: "#F4B8CC", avatarLetter: "P" },
    ],
    avatarColor: "#F4B8CC",
    avatarLetter: "E",
  },
  {
    id: "7",
    name: "Lucas Romero",
    age: 3,
    room: "Soles",
    birthDate: "30 oct 2021",
    enrollmentDate: "feb 2025",
    parents: [
      { id: "p8", name: "Jorge Romero", relation: "Papá", status: "ACTIVA", avatarColor: "#A9D9E8", avatarLetter: "J" },
    ],
    avatarColor: "#A9D9E8",
    avatarLetter: "L",
  },
  {
    id: "8",
    name: "Olivia Vega",
    age: 2,
    room: "Soles",
    birthDate: "14 may 2023",
    enrollmentDate: "abr 2025",
    parents: [
      { id: "p9", name: "Carmen Vega", relation: "Mamá", status: "ACTIVA", avatarColor: "#B9DEC4", avatarLetter: "C" },
    ],
    avatarColor: "#B9DEC4",
    avatarLetter: "O",
  },
];
