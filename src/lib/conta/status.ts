import type { ItemStatus, RequestStatus } from "./types";

export function itemStatusLabel(status: ItemStatus) {
  const labels: Record<ItemStatus, string> = {
    pending: "Pending",
    received: "Received",
    reviewed: "Reviewed",
  };
  return labels[status];
}

export function requestStatusLabel(status: RequestStatus) {
  const labels: Record<RequestStatus, string> = {
    draft: "Draft",
    open: "Open",
    completed: "Completed",
    archived: "Archived",
  };
  return labels[status];
}
