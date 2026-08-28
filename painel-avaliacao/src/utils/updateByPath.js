// Atualiza um valor dentro de um objeto/array aninhado, de forma imutÃ¡vel,
// a partir de um caminho tipo "sm.3.nota" ou "weights.dev" ou "meta.turma".
// Equivalente ao setByPath do app.js original, mas sem mutar o estado direto.
function setByPath(obj, keys, value) {
  if (keys.length === 0) return value;
  const [key, ...rest] = keys;
  const idx = /^\d+$/.test(key) ? Number(key) : key;

  if (Array.isArray(obj)) {
    const arr = [...obj];
    arr[idx] = setByPath(arr[idx], rest, value);
    return arr;
  }
  return { ...obj, [idx]: setByPath(obj[idx], rest, value) };
}

export function updateByPath(setData, path, value) {
  setData((prev) => setByPath(prev, path.split("."), value));
}
