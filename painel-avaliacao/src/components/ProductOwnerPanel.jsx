import { SNSelect, ScoreSelect, ObsInput } from "./common/FormControls";
import { updateRow, sprintCellLabel } from "../utils/stateHelpers";

export default function ProductOwnerPanel({ data, setData }) {
    const rows = data.po;
    const set = (i, field, value) => updateRow(setData, "po", i, field, value);

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
                        <th>Reunião de<br />priorização ocorreu?</th>
                        <th>Nota (1-5)</th>
                        <th>Observações</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>
                            <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
                            <td>{r.empresa}</td>
                            <td>{r.time}</td>
                            <td><SNSelect value={r.requisitos} onChange={(v) => set(i, "requisitos", v)} /></td>
                            <td><SNSelect value={r.testes} onChange={(v) => set(i, "testes", v)} /></td>
                            <td><SNSelect value={r.reuniao} onChange={(v) => set(i, "reuniao", v)} /></td>
                            <td><ScoreSelect value={r.nota} onChange={(v) => set(i, "nota", v)} /></td>
                            <td><ObsInput value={r.obs} onChange={(v) => set(i, "obs", v)} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="note note-teal">
                Critério-guia: o PO é avaliado pela clareza dos requisitos e pelo acompanhamento ativo da produção — não
                pela qualidade técnica do avião em si.
            </div>
        </div>
    );
}
