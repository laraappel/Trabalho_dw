const WEIGHT_LABELS = {
    sm: "Scrum Master",
    owner: "Owner",
    po: "Product Owner",
    dev: "Developers",
    buyer: "Avaliação dos Compradores",
};

export default function SetupPanel({ meta, teamNames, weights, onFieldChange, onRenameEmpresa }) {
    return (
        <div className="panel">
            <h2>Configuração</h2>
            <div className="desc">
                Identificação da turma e nomes das empresas/times. Alterar os nomes atualiza todas as abas automaticamente.
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
                    <label>Nome — Empresa A</label>
                    <input
                        type="text"
                        value={meta.empresaA}
                        onChange={e => onRenameEmpresa("A", e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Time Caça — Empresa A</label>
                    <input
                        type="text"
                        value={teamNames[meta.empresaA].Caça}
                        onChange={e => onFieldChange(`teamNames.${meta.empresaA}.Caça`, e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Time Transporte — Empresa A</label>
                    <input
                        type="text"
                        value={teamNames[meta.empresaA].Transporte}
                        onChange={e => onFieldChange(`teamNames.${meta.empresaA}.Transporte`, e.target.value)}
                    />
                </div>
            </div>

            <div className="fields-row">
                <div className="field">
                    <label>Nome — Empresa B</label>
                    <input
                        type="text"
                        value={meta.empresaB}
                        onChange={e => onRenameEmpresa("B", e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Time Caça — Empresa B</label>
                    <input
                        type="text"
                        value={teamNames[meta.empresaB].Caça}
                        onChange={e => onFieldChange(`teamNames.${meta.empresaB}.Caça`, e.target.value)}
                    />
                </div>
                <div className="field">
                    <label>Time Transporte — Empresa B</label>
                    <input
                        type="text"
                        value={teamNames[meta.empresaB].Transporte}
                        onChange={e => onFieldChange(`teamNames.${meta.empresaB}.Transporte`, e.target.value)}
                    />
                </div>
            </div>

            <div className="note note-dark">
                Dica: os nomes de empresa já vêm pré-preenchidos a partir das imagens que você enviou
                (Maverick Aviation e SkyForge Ind. Aeronáutica). Pode alterar se quiser.
            </div>

            <h2 style={{ marginTop: "1.6rem" }}>Pesos da Nota Final</h2>
            <div className="desc">
                Ajuste o peso de cada papel no cálculo da nota final da empresa (aba "Resultado Final").
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
