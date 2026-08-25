import { SNSelect, ScoreSelect, ObsInput } from "./common/FormControls";
import { updateRow, sprintCellLabel } from "../utils/stateHelpers";

export default function DevPanel({ data, setData }) {
    const rows = data.dev;
    const set = (i, field, value) => updateRow(setData, "dev", i, field, value);

    return (
        <div className="panel">
            <h2>Developers</h2>
            <div className="desc">
                Avaliação por time — com muitos alunos em produção, a qualidade do produto é o principal indicador de
                entendimento do processo pelo grupo.
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Sprint</th>
                        <th>Empresa</th>
                        <th>Time</th>
                        <th>Qualidade do<br />produto (1-5)</th>
                        <th>Seguiu o<br />processo?</th>
                        <th>Colaboração<br />do time (1-5)</th>
                        <th>Nota Time (1-5)</th>
                        <th>Destaque individual (opcional)</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>
                            <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
                            <td>{r.empresa}</td>
                            <td>{r.time}</td>
                            <td><ScoreSelect value={r.qualidade} onChange={(v) => set(i, "qualidade", v)} /></td>
                            <td><SNSelect value={r.processo} onChange={(v) => set(i, "processo", v)} /></td>
                            <td><ScoreSelect value={r.colaboracao} onChange={(v) => set(i, "colaboracao", v)} /></td>
                            <td><ScoreSelect value={r.notaTime} onChange={(v) => set(i, "notaTime", v)} /></td>
                            <td><ObsInput value={r.destaque} onChange={(v) => set(i, "destaque", v)} placeholder="nome (se houver)" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
