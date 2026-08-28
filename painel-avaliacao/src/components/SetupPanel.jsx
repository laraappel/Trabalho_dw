// Props esperadas (fornecidas pelo App.jsx â€” Parte 1):
// - meta: { turma, data, empresaA, empresaB, fontScale }
// - teamNames: { [nomeEmpresa]: { CaÃ§a, Transporte } }
// - weights: { sm, owner, po, dev, buyer }
// - onFieldChange(path, value): atualiza um campo qualquer pelo "caminho"
//     (mesmo princÃ­pio do setByPath original, ex: "meta.turma", "weights.sm")
// - onRenameEmpresa(which, novoNome): which = "A" ou "B" â€” renomear empresa
//     precisa de tratamento especial porque o nome Ã© tambÃ©m a chave de
//     teamNames, entÃ£o nÃ£o dÃ¡ pra usar onFieldChange genÃ©rico aqui.
//     Combinar com quem fizer o App.jsx/hooks de estado.

const WEIGHT_LABELS = {
  sm: "Scrum Master",
  owner: "Owner",
  po: "Product Owner",
  dev: "Developers",
  buyer: "AvaliaÃ§Ã£o dos Compradores",
};

export default function SetupPanel({ meta, teamNames, weights, onFieldChange, onRenameEmpresa }) {
  return (
    <div className="panel">
      <h2>ConfiguraÃ§Ã£o</h2>
      <div className="desc">
        IdentificaÃ§Ã£o da turma e nomes das empresas/times. Alterar os nomes atualiza todas as abas automaticamente.
      </div>

      <div className="fields-row">
        <div className="field">
          <label>Turma</label>
          <input
            type="text"
            value={meta.turma}
            onChange={e => onFieldChange("meta.turma", e.target.value)}
          />
        </div>
        <div className="field">
          <label>Data</label>
          <input
            type="text"
            value={meta.data}
            onChange={e => onFieldChange("meta.data", e.target.value)}
          />
        </div>
      </div>

      <div className="fields-row">
        <div className="field">
          <label>Nome â€” Empresa A</label>
          <input
            type="text"
            value={meta.empresaA}
            onChange={e => onRenameEmpresa("A", e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time CaÃ§a â€” Empresa A</label>
          <input
            type="text"
            value={teamNames[meta.empresaA].CaÃ§a}
            onChange={e => onFieldChange(`teamNames.${meta.empresaA}.CaÃ§a`, e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Transporte â€” Empresa A</label>
          <input
            type="text"
            value={teamNames[meta.empresaA].Transporte}
            onChange={e => onFieldChange(`teamNames.${meta.empresaA}.Transporte`, e.target.value)}
          />
        </div>
      </div>

      <div className="fields-row">
        <div className="field">
          <label>Nome â€” Empresa B</label>
          <input
            type="text"
            value={meta.empresaB}
            onChange={e => onRenameEmpresa("B", e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time CaÃ§a â€” Empresa B</label>
          <input
            type="text"
            value={teamNames[meta.empresaB].CaÃ§a}
            onChange={e => onFieldChange(`teamNames.${meta.empresaB}.CaÃ§a`, e.target.value)}
          />
        </div>
        <div className="field">
          <label>Time Transporte â€” Empresa B</label>
          <input
            type="text"
            value={teamNames[meta.empresaB].Transporte}
            onChange={e => onFieldChange(`teamNames.${meta.empresaB}.Transporte`, e.target.value)}
          />
        </div>
      </div>

      <div className="note note-dark">
        Dica: os nomes de empresa jÃ¡ vÃªm prÃ©-preenchidos a partir das imagens que vocÃª enviou
        (Maverick Aviation e SkyForge Ind. AeronÃ¡utica). Pode alterar se quiser.
      </div>

      <h2 style={{ marginTop: "1.6rem" }}>Pesos da Nota Final</h2>
      <div className="desc">
        Ajuste o peso de cada papel no cÃ¡lculo da nota final da empresa (aba "Resultado Final").
      </div>
      <div className="weights-panel">
        {Object.keys(weights).map(k => (
          <div className="weight-field" key={k}>
            <label>{WEIGHT_LABELS[k]}</label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={weights[k]}
              onChange={e => onFieldChange(`weights.${k}`, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
