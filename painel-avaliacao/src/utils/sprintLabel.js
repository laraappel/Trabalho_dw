// Mostra o nÃºmero da sprint sÃ³ na primeira linha de cada grupo,
// pra nÃ£o repetir "Sprint 1" em toda linha da tabela.
export function sprintCellLabel(rows, i, key) {
  if (i === 0) return "Sprint " + rows[i].sprint;
  return rows[i][key] !== rows[i - 1][key] ? "Sprint " + rows[i].sprint : "";
}
