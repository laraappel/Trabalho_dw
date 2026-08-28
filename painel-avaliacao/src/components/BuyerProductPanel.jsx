import { sprintCellLabel } from "../utils/sprintLabel";
import SimNaoSelect from "./campos/SimNaoSelect";
import ScoreSelect from "./campos/ScoreSelect";
import DecisaoSelect from "./campos/DecisaoSelect";

// Props: rows (data.buyerProduct), onFieldChange(path, value)
export default function BuyerProductPanel({ rows, onFieldChange }) {
  return (
    <div className="panel">
      <h2>Ficha do Comprador â€” AvaliaÃ§Ã£o do Produto</h2>
      <div className="desc">
        Transcreva aqui os dados que cada comprador preencheu na ficha em papel, ao final de cada Sprint.
      </div>
      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Comprador</th>
            <th>Empresa</th>
            <th>Produto</th>
            <th>PadrÃ£o<br />TÃ©cnico</th>
            <th>PadrÃ£o<br />Visual</th>
            <th>Prazo</th>
            <th>Com.<br />Owner (1-5)</th>
            <th>Sinal</th>
            <th>DecisÃ£o</th>
            <th>Nota (1-5)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="sprint-label">{sprintCellLabel(rows, i, "sprint")}</td>
              <td>{r.comprador}</td>
              <td>{r.empresa}</td>
              <td>{r.produto}</td>
              <td>
                <SimNaoSelect value={r.pt} onChange={v => onFieldChange(`buyerProduct.${i}.pt`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.pv} onChange={v => onFieldChange(`buyerProduct.${i}.pv`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.prazo} onChange={v => onFieldChange(`buyerProduct.${i}.prazo`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.comOwner} onChange={v => onFieldChange(`buyerProduct.${i}.comOwner`, v)} />
              </td>
              <td>
                <SimNaoSelect value={r.sinal} onChange={v => onFieldChange(`buyerProduct.${i}.sinal`, v)} />
              </td>
              <td>
                <DecisaoSelect value={r.decisao} onChange={v => onFieldChange(`buyerProduct.${i}.decisao`, v)} />
              </td>
              <td>
                <ScoreSelect value={r.nota} onChange={v => onFieldChange(`buyerProduct.${i}.nota`, v)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="note note-orange">
        Militar sÃ³ avalia CaÃ§a; Setor Privado sÃ³ avalia Transporte; Governo avalia os dois. Linhas
        fora do papel do comprador podem ficar em branco.
      </div>
    </div>
  );
}
