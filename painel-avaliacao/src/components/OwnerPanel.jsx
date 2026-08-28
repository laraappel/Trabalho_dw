import { sprintCellLabel } from "../utils/sprintLabel";
import ScoreSelect from "./campos/ScoreSelect";
import ObsInput from "./campos/ObsInput";

export default function OwnerPanel({ rows, onFieldChange }) {
    return (
        <div className="panel">
            <h2>Stakeholder / Owner</h2>
            <div className="desc">
                Avaliação de comunicação e negociação — independente dos pontos de corrupção,
                registrados na aba "Corrupção &amp; Sabotagem".
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Sprint</th>
                        <th>Empresa</th>
                        <th>Comunicação com<br />a equipe (1-5)</th>
                        <th>Negociação com<br />compradores (1-5)</th>
                        <th>Alinhamento com<br />SM/PO sobre qualidade (1-5)</th>
                        <th>Nota Geral (1-5)</th>
                        <th>Observações</th>
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
                Esta nota avalia o desempenho no papel — não confunda com os pontos ganhos/perdidos no
                mecanismo de corrupção, calculados automaticamente na aba própria.
            </div>
        </div>
    );
}
