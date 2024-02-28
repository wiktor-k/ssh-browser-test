export function dearmor(text: string) {
  const lines = text.trim().split("\n");
  const first = lines.shift();
  if (first !== "-----BEGIN SSH SIGNATURE-----") {
    throw new Error(
      "Bad header line, expected -----BEGIN SSH SIGNATURE----- got: " + first,
    );
  }
  const last = lines.pop();
  if (last !== "-----END SSH SIGNATURE-----") {
    throw new Error(
      "Bad trailer line, expected -----END SSH SIGNATURE----- got: " + last,
    );
  }
  return Uint8Array.from(
    atob(lines.join("")).split("").map((x) => x.charCodeAt(0)),
  );
}
