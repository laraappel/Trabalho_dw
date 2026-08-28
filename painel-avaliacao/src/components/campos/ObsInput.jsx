export default function ObsInput({ value, onChange, placeholder }) {
  return (
    <input
      className="obs-input"
      type="text"
      value={value}
      placeholder={placeholder || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
