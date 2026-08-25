export function SNSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      <option value="S">Sim</option>
      <option value="N">Não</option>
    </select>
  );
}

export function ScoreSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">—</option>
      {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
    </select>
  );
}

export function ObsInput({ value, onChange, placeholder }) {
  return (
    <input className="obs-input" type="text" value={value} placeholder={placeholder || ""}
      onChange={(e) => onChange(e.target.value)} />
  );
}
