import { notFound } from "next/navigation";
import { Suspense } from "react";
import KidProfileClient from "./KidProfileClient";
import { mockKids } from "@/lib/mocks";

export const instant = false;

type KidProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function KidProfilePage({ params }: KidProfilePageProps) {
  const { id } = await params;
  const kid = mockKids.find((k) => k.id === id);

  if (!kid) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <KidProfileClient kid={kid} />
    </Suspense>
  );
}
