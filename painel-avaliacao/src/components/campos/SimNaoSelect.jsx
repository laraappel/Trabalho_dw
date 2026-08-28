export default function SimNaoSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">â€”</option>
      <option value="S">Sim</option>
      <option value="N">NÃ£o</option>
    </select>
  );
}
