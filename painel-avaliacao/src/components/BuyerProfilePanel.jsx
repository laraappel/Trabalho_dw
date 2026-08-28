import { sprintCellLabel } from "../utils/sprintLabel";
import SimNaoSelect from "./campos/SimNaoSelect";
import ScoreSelect from "./campos/ScoreSelect";
import ObsInput from "./campos/ObsInput";

// Props: rows (data.buyerProf), onFieldChange(path, value)
export default function BuyerProfilePanel({ rows, onFieldChange }) {
  return (
    <div className="panel">
      <h2>Compradores â€” Desempenho no Papel</h2>
      <div className="desc">AvaliaÃ§Ã£o do professor sobre como cada comprador exerceu seu papel.</div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Comprador</th>
            <th>Aplicou o checklist<br />de verificaÃ§Ã£o?</th>
            <th>DecisÃµes coerentes<br />com o papel?</th>
            <th>Feedback construtivo<br />nas Reviews?</th>
            <th>Nota (1-5)</th>
            <th>ObservaÃ§Ãµes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
              <td>{r.comprador}</td>
              <td>
                <SimNaoSelect value={r.checklist} onChange={v => onFieldChange(`buyerProf.${i}.checklist`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.decisoes} onChange={v => onFieldChange(`buyerProf.${i}.decisoes`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.feedback} onChange={v => onFieldChange(`buyerProf.${i}.feedback`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.nota} onChange={v => onFieldChange(`buyerProf.${i}.nota`, v)} />
              </td>
              <td>
                <ObsInput value={r.obs} onChange={v => onFieldChange(`buyerProf.${i}.obs`, v)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-orange">
        CritÃ©rio-guia: avalie se o comprador aplicou o checklist a cada Sprint, se as decisÃµes
        foram coerentes com o papel, e se o feedback nas Reviews foi Ãºtil.
      </div>
    </div>
  );
}
