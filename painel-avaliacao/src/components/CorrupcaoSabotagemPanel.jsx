import { TIMES, BUYERS } from "../data/initialData";
import { computeCorrupcaoPontos, computeSabotagemPontos } from "../utils/scoring";

// Props: data (objeto completo, usa data.meta/corrupcao/sabotagem), onFieldChange(path, value)
export default function CorrupcaoSabotagemPanel({ data, onFieldChange }) {
  const c = data.corrupcao;
  const s = data.sabotagem;
  const cPts = computeCorrupcaoPontos(c);
  const sPts = computeSabotagemPontos(s);
  const empresas = [data.meta.empresaA, data.meta.empresaB];
  const compradoresSemMilitar = BUYERS.filter(b => b !== "Militar");

  return (
    <div className="panel">
      <h2>CorrupÃ§Ã£o &amp; Sabotagem</h2>
      <div className="desc">
        Estes dois mecanismos sÃ£o baseados em regras fixas â€” os pontos abaixo sÃ£o calculados automaticamente.
      </div>
      <div className="grid2">
        <div className="mini-card">
          <h3>ðŸ”’ Corruptor (Owner)</h3>

          <div className="mini-row">
            <label>Empresa do corruptor</label>
            <select
              value={c.empresaCorruptora}
              onChange={e => onFieldChange("corrupcao.empresaCorruptora", e.target.value)}
            >
              {empresas.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div className="checkbox-row" style={{ marginBottom: "0.6rem" }}>
            <input
              type="checkbox"
              id="cd1"
              checked={c.primeiraDescoberta}
              onChange={e => onFieldChange("corrupcao.primeiraDescoberta", e.target.checked)}
            />
            <label htmlFor="cd1">1Âª descoberta ocorreu</label>
          </div>

          {c.primeiraDescoberta && (
            <div className="mini-row">
              <label>Comprador que aceitou (1Âª vez)</label>
              <select
                value={c.primeiroComprador}
                onChange={e => onFieldChange("corrupcao.primeiroComprador", e.target.value)}
              >
                <option value="">â€”</option>
                {compradoresSemMilitar.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          )}

          <div className="checkbox-row" style={{ marginBottom: "0.6rem" }}>
            <input
              type="checkbox"
              id="cd2"
              checked={c.segundaDescoberta}
              disabled={!c.primeiraDescoberta}
              onChange={e => onFieldChange("corrupcao.segundaDescoberta", e.target.checked)}
            />
            <label htmlFor="cd2">2Âª descoberta ocorreu (mesmo assim)</label>
          </div>

          {c.segundaDescoberta && (
            <div className="mini-row">
              <label>Comprador que aceitou (2Âª vez)</label>
              <select
                value={c.segundoComprador}
                onChange={e => onFieldChange("corrupcao.segundoComprador", e.target.value)}
              >
                <option value="">â€”</option>
                {compradoresSemMilitar.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          )}

          <div className="mini-row" style={{ borderTop: "1px solid var(--line)", paddingTop: "0.6rem", marginTop: "0.4rem" }}>
            <label><strong>Pontos do corruptor</strong></label>
            <span className={"pts" + (cPts.corruptor < 0 ? " neg" : "")}>{cPts.corruptor.toFixed(1)}</span>
          </div>
          {Object.keys(cPts.compradores).map(b => (
            <div className="mini-row" key={b}>
              <label>Pontos â€” {b}</label>
              <span className={"pts" + (cPts.compradores[b] < 0 ? " neg" : "")}>{cPts.compradores[b].toFixed(1)}</span>
            </div>
          ))}

          <div className="note note-red" style={{ marginTop: "0.8rem" }}>
            O corruptor nunca troca de papel e continua negociando normalmente, mesmo apÃ³s ser descoberto.
          </div>
        </div>

        <div className="mini-card">
          <h3>ðŸ”’ Sabotador (Developer)</h3>

          <div className="mini-row">
            <label>Empresa do sabotador</label>
            <select
              value={s.empresaSabotador}
              onChange={e => onFieldChange("sabotagem.empresaSabotador", e.target.value)}
            >
              {empresas.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>

          <div className="mini-row">
            <label>Time do sabotador</label>
            <select
              value={s.timeSabotador}
              onChange={e => onFieldChange("sabotagem.timeSabotador", e.target.value)}
            >
              {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="mini-row">
            <label>Tipo de aÃ§Ã£o</label>
            <select
              value={s.tipoAcao}
              onChange={e => onFieldChange("sabotagem.tipoAcao", e.target.value)}
            >
              <option value="vazar">Vazar informaÃ§Ã£o</option>
              <option value="atrapalhar">Atrapalhar decisÃµes/produÃ§Ã£o</option>
            </select>
          </div>

          <div className="checkbox-row" style={{ marginBottom: "0.6rem" }}>
            <input
              type="checkbox"
              id="sd1"
              checked={s.descoberto}
              onChange={e => onFieldChange("sabotagem.descoberto", e.target.checked)}
            />
            <label htmlFor="sd1">Sabotador foi descoberto</label>
          </div>

          {s.descoberto && (
            <>
              <div className="mini-row">
                <label>DenÃºncias consecutivas recebidas</label>
                <select
                  value={s.denunciasConsecutivas}
                  onChange={e => onFieldChange("sabotagem.denunciasConsecutivas", Number(e.target.value))}
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>
              <div className="checkbox-row" style={{ marginBottom: "0.6rem" }}>
                <input
                  type="checkbox"
                  id="sd2"
                  checked={s.areaSoubeECalou}
                  onChange={e => onFieldChange("sabotagem.areaSoubeECalou", e.target.checked)}
                />
                <label htmlFor="sd2">PO/colegas da Ã¡rea sabiam e ficaram calados</label>
              </div>
            </>
          )}

          <div className="mini-row" style={{ borderTop: "1px solid var(--line)", paddingTop: "0.6rem", marginTop: "0.4rem" }}>
            <label><strong>Pontos do sabotador</strong></label>
            <span className={"pts" + (sPts.sabotador < 0 ? " neg" : "")}>{sPts.sabotador.toFixed(1)}</span>
          </div>
          <div className="mini-row">
            <label><strong>Pontos da Ã¡rea/time</strong></label>
            <span className={"pts" + (sPts.area < 0 ? " neg" : sPts.area > 0 ? " pos" : "")}>
              {sPts.area > 0 ? "+" : ""}{sPts.area.toFixed(1)}
            </span>
          </div>
          <div className="mini-row">
            <label><strong>Demitido?</strong></label>
            <span className="pts">{sPts.demitido ? "SIM â€” vai para o time RIVAL" : "NÃ£o"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
