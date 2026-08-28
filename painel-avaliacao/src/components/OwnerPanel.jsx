import { sprintCellLabel } from "../utils/sprintLabel";
import ScoreSelect from "./campos/ScoreSelect";
import ObsInput from "./campos/ObsInput";

// Props: rows (STATE.owner), onFieldChange(path, value)
export default function OwnerPanel({ rows, onFieldChange }) {
  return (
    <div className="panel">
      <h2>Stakeholder / Owner</h2>
      <div className="desc">
        AvaliaÃ§Ã£o de comunicaÃ§Ã£o e negociaÃ§Ã£o â€” independente dos pontos de corrupÃ§Ã£o,
        registrados na aba "CorrupÃ§Ã£o &amp; Sabotagem".
      </div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Empresa</th>
            <th>ComunicaÃ§Ã£o com<br />a equipe (1-5)</th>
            <th>NegociaÃ§Ã£o com<br />compradores (1-5)</th>
            <th>Alinhamento com<br />SM/PO sobre qualidade (1-5)</th>
            <th>Nota Geral (1-5)</th>
            <th>ObservaÃ§Ãµes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
              <td>{r.empresa}</td>
              <td>
                <ScoreSelect value={r.comunicacao} onChange={v => onFieldChange(`owner.${i}.comunicacao`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.negociacao} onChange={v => onFieldChange(`owner.${i}.negociacao`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.alinhamento} onChange={v => onFieldChange(`owner.${i}.alinhamento`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.notaGeral} onChange={v => onFieldChange(`owner.${i}.notaGeral`, v)} />
              </td>
              <td>
                <ObsInput value={r.obs} onChange={v => onFieldChange(`owner.${i}.obs`, v)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-blue">
        Esta nota avalia o desempenho no papel â€” nÃ£o confunda com os pontos ganhos/perdidos no
        mecanismo de corrupÃ§Ã£o, calculados automaticamente na aba prÃ³pria.
      </div>
    </div>
  );
}
