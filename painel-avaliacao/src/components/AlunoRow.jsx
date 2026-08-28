import { PAPEIS, TIMES } from "../data/initialData";

// Props: aluno, index, empresas (array com as 2 empresas), onFieldChange(path, value)
export default function AlunoRow({ aluno: a, index: i, empresas, onFieldChange }) {
  const needsEmpresa =
    a.papel === "Scrum Master" || a.papel === "Owner/Stakeholder" ||
    a.papel === "Product Owner" || a.papel === "Developer";
  const needsTime = a.papel === "Product Owner" || a.papel === "Developer";

  return (
    <tr>
      <td>{a.id}</td>
      <td style={{ textAlign: "left" }}>{a.nome}</td>
      <td>
        <select value={a.papel} onChange={e => onFieldChange(`alunos.${i}.papel`, e.target.value)}>
          {PAPEIS.map(p => (
            <option key={p} value={p}>{p === "" ? "â€” nÃ£o atribuÃ­do â€”" : p}</option>
          ))}
        </select>
      </td>
      <td>
        {needsEmpresa && (
          <select value={a.empresa} onChange={e => onFieldChange(`alunos.${i}.empresa`, e.target.value)}>
            <option value="">â€”</option>
            {empresas.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        )}
      </td>
      <td>
        {needsTime && (
          <select value={a.time} onChange={e => onFieldChange(`alunos.${i}.time`, e.target.value)}>
            <option value="">â€”</option>
            {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        )}
      </td>
    </tr>
  );
}
