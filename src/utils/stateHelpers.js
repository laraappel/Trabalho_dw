export function updateRow(setData, key, index, field, value) {
  setData(prev => ({
    ...prev,
    [key]: prev[key].map((row, i) => i === index ? { ...row, [field]: value } : row),
  }));
}

export function sprintCellLabel(rows, i, key = "sprint") {
  if (i === 0) return "Sprint " + rows[i].sprint;
  return rows[i][key] !== rows[i - 1][key] ? "Sprint " + rows[i].sprint : "";
}

export function avg(arr) {
  const nums = arr.map(v => parseFloat(v)).filter(v => !isNaN(v));
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}
