import { ScoreSelect, ObsInput } from "./common/FormControls";
import { updateRow, sprintCellLabel } from "../utils/stateHelpers";

export default function OwnerPanel({ data, setData }) {
    const rows = data.owner;
    const set = (i, field, value) => updateRow(setData, "owner", i, field, value);

    return (
        <div className="panel">
            <h2>Stakeholder / Owner</h2>
            <div className="desc">
                Avaliação de comunicação e negociação — independente dos pontos de corrupção, registrados na aba
                "Corrupção &amp; Sabotagem".
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
                            <td><ScoreSelect value={r.comunicacao} onChange={(v) => set(i, "comunicacao", v)} /></td>
                            <td><ScoreSelect value={r.negociacao} onChange={(v) => set(i, "negociacao", v)} /></td>
                            <td><ScoreSelect value={r.alinhamento} onChange={(v) => set(i, "alinhamento", v)} /></td>
                            <td><ScoreSelect value={r.notaGeral} onChange={(v) => set(i, "notaGeral", v)} /></td>
                            <td><ObsInput value={r.obs} onChange={(v) => set(i, "obs", v)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
