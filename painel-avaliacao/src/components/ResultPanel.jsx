import React from "react";

import { computeEmpresaScore } from "../utils/scoring";

export default function ResultPanel({ data }) {
  const empresas = [
    data.meta.empresaA,
    data.meta.empresaB,
  ];

  const scores = empresas.map((empresa) => ({
    empresa,
    ...computeEmpresaScore(data, empresa),
  }));

  return (
    <div className="panel">
      <h2>Resultado Final</h2>

      <div className="desc">
        Cálculo automático a partir das médias lançadas em cada aba,
        ajustado pelos pontos de corrupção/sabotagem. Use como referência —
        a decisão final da nota é sempre sua.
      </div>

      <div className="grid2">
        {scores.map((score) => (
          <div className="dash-card" key={score.empresa}>
            <h3>{score.empresa}</h3>

            <div className="big">
              {score.final !== null
                ? score.final.toFixed(2)
                : "—"}
            </div>

            <div className="breakdown">
              {score.parts.map((part) => (
                <div key={part.key}>
                  <span>{part.key}</span>

                  <span>
                    {part.val !== null
                      ? part.val.toFixed(2)
                      : "—"}
                  </span>
                </div>
              ))}

              <div className="ajuste">
                <span>
                  Ajuste (corrupção/sabotagem)
                </span>

                <span>
                  {score.ajuste >= 0 ? "+" : ""}
                  {score.ajuste.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="note note-orange">
        a nota final é uma média das notas médias por papel
        (pesos configuráveis em "Configuração"), somada com os pontos fixos
        de corrupção/sabotagem, ela não substitui seu julgamento.
      </div>
    </div>
  );
}