import { SNSelect, ScoreSelect, ObsInput } from "./common/FormControls";
import { updateRow, sprintCellLabel } from "../utils/stateHelpers";

export default function ScrumMasterPanel({ data, setData }) {
  const rows = data.sm;
  const set = (i, field, value) => updateRow(setData, "sm", i, field, value);

  return (
    <div className="panel">
      <h2>Scrum Master</h2>
      <div className="desc">Avaliação de processo — um Scrum Master por empresa, atendendo os dois times.</div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th><th>Empresa</th>
            <th>Conduziu os eventos<br />corretamente?</th>
            <th>Removeu<br />impedimentos?</th>
            <th>Ajudou o time a<br />melhorar entre Sprints?</th>
            <th>Nota (1-5)</th><th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
              <td>{r.empresa}</td>
              <td><SNSelect value={r.conduziu} onChange={(v) => set(i, "conduziu", v)} /></td>
              <td><SNSelect value={r.removeu} onChange={(v) => set(i, "removeu", v)} /></td>
              <td><SNSelect value={r.ajudou} onChange={(v) => set(i, "ajudou", v)} /></td>
              <td><ScoreSelect value={r.nota} onChange={(v) => set(i, "nota", v)} /></td>
              <td><ObsInput value={r.obs} onChange={(v) => set(i, "obs", v)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
