import type { ItemStatus, RequestStatus } from "./types";

export function itemStatusLabel(status: ItemStatus) {
  const labels: Record<ItemStatus, string> = {
    pending: "Pendiente",
    received: "Recibido",
    reviewed: "Revisado",
  };
  return labels[status];
}

export function requestStatusLabel(status: RequestStatus) {
  const labels: Record<RequestStatus, string> = {
    draft: "Borrador",
    open: "Abierta",
    completed: "Completada",
    archived: "Archivada",
  };
  return labels[status];
}
