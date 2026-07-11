export type RequestStatus = "draft" | "open" | "completed" | "archived";
export type ItemStatus = "pending" | "received" | "reviewed";

export type AccountingClient = {
  id: string;
  user_id: string;
  name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type DocumentRequest = {
  id: string;
  user_id: string;
  client_id: string;
  title: string;
  period: string;
  due_date: string | null;
  status: RequestStatus;
  public_token: string;
  created_at: string;
  updated_at: string;
};

export type DocumentRequestItem = {
  id: string;
  request_id: string;
  label: string;
  description: string | null;
  status: ItemStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type UploadedDocument = {
  id: string;
  request_id: string;
  item_id: string | null;
  storage_path: string;
  original_name: string;
  mime_type: string | null;
  size_bytes: number | null;
  uploader_name: string | null;
  uploader_email: string | null;
  created_at: string;
};
