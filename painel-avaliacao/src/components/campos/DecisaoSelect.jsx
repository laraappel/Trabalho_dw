export default function DecisaoSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">â€”</option>
      <option value="A">Aceitou</option>
      <option value="I">Ignorou</option>
      <option value="D">Denunciou</option>
    </select>
  );
}
