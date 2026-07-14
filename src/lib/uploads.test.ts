import assert from "node:assert/strict";
import test from "node:test";
import { validateUploadContent, validateUploadMetadata } from "./uploads.ts";

test("accepts supported files within the size limit", () => {
  const file = new File([new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d])], "statement.pdf", { type: "application/pdf" });
  assert.equal(validateUploadMetadata(file), null);
});

test("rejects unsupported extensions", () => {
  const file = new File(["content"], "payload.exe", { type: "application/octet-stream" });
  assert.match(validateUploadMetadata(file) ?? "", /Unsupported file type/);
});

test("rejects an empty file", () => {
  const file = new File([], "empty.pdf", { type: "application/pdf" });
  assert.equal(validateUploadMetadata(file), "The file is empty.");
});

test("recognizes a PDF signature", () => {
  const validPdf = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]).buffer;
  assert.equal(validateUploadContent("statement.pdf", validPdf), null);
  assert.match(validateUploadContent("statement.pdf", new TextEncoder().encode("not a pdf").buffer) ?? "", /valid PDF/);
});

test("recognizes modern Office container signatures", () => {
  const officeContainer = new Uint8Array([0x50, 0x4b, 0x03, 0x04]).buffer;
  assert.equal(validateUploadContent("report.xlsx", officeContainer), null);
  assert.equal(validateUploadContent("notes.docx", officeContainer), null);
});

test("rejects binary content presented as CSV", () => {
  const binary = new Uint8Array([0x61, 0x2c, 0x62, 0x00, 0xff]).buffer;
  assert.match(validateUploadContent("report.csv", binary) ?? "", /valid CSV/);
});
