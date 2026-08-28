import { sprintCellLabel } from "../utils/sprintLabel";
import SimNaoSelect from "./campos/SimNaoSelect";
import ScoreSelect from "./campos/ScoreSelect";
import ObsInput from "./campos/ObsInput";

// Props: rows (STATE.po), onFieldChange(path, value)
export default function ProductOwnerPanel({ rows, onFieldChange }) {
  return (
    <div className="panel">
      <h2>Product Owner</h2>
      <div className="desc">Um Product Owner por time (2 times por empresa).</div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Empresa</th>
            <th>Time</th>
            <th>Requisitos<br />claros ao time?</th>
            <th>Acompanhou os<br />testes de perto?</th>
            <th>ReuniÃ£o de<br />priorizaÃ§Ã£o ocorreu?</th>
            <th>Nota (1-5)</th>
            <th>ObservaÃ§Ãµes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
              <td>{r.empresa}</td>
              <td>{r.time}</td>
              <td>
                <SimNaoSelect value={r.requisitos} onChange={v => onFieldChange(`po.${i}.requisitos`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.testes} onChange={v => onFieldChange(`po.${i}.testes`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.reuniao} onChange={v => onFieldChange(`po.${i}.reuniao`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.nota} onChange={v => onFieldChange(`po.${i}.nota`, v)} />
              </td>
              <td>
                <ObsInput value={r.obs} onChange={v => onFieldChange(`po.${i}.obs`, v)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-teal">
        CritÃ©rio-guia: o PO Ã© avaliado pela clareza dos requisitos e pelo acompanhamento ativo da
        produÃ§Ã£o â€” nÃ£o pela qualidade tÃ©cnica do aviÃ£o em si.
      </div>
    </div>
  );
}
