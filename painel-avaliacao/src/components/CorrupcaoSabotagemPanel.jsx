import React from "react";

import {
  computeCorrupcaoPontos,
  computeSabotagemPontos,
} from "../utils/scoring";

import { BUYERS, TIMES } from "../data/initialData";

export default function CorrupcaoSabotagemPanel({ data, setData }) {
  const c = data.corrupcao;
  const s = data.sabotagem;

  const cPts = computeCorrupcaoPontos(c);
  const sPts = computeSabotagemPontos(s);

  const empresas = [data.meta.empresaA, data.meta.empresaB];

  function atualizarCorrupcao(campo, valor) {
    setData((atual) => ({
      ...atual,
      corrupcao: {
        ...atual.corrupcao,
        [campo]: valor,
      },
    }));
  }

  function atualizarSabotagem(campo, valor) {
    setData((atual) => ({
      ...atual,
      sabotagem: {
        ...atual.sabotagem,
        [campo]: valor,
      },
    }));
  }

  return (
    <div className="panel">
      <h2>Corrupção &amp; Sabotagem</h2>

      <div className="desc">
        Estes dois mecanismos são baseados em regras fixas — os pontos abaixo
        são calculados automaticamente.
      </div>

      <div className="grid2">
        {/* CORRUPÇÃO */}
        <div className="mini-card">
          <h3>🔒 Corruptor (Owner)</h3>

          <div className="mini-row">
            <label>Empresa do corruptor</label>

            <select
              value={c.empresaCorruptora}
              onChange={(e) =>
                atualizarCorrupcao(
                  "empresaCorruptora",
                  e.target.value
                )
              }
            >
              {empresas.map((empresa) => (
                <option key={empresa} value={empresa}>
                  {empresa}
                </option>
              ))}
            </select>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="cd1"
              checked={c.primeiraDescoberta}
              onChange={(e) =>
                atualizarCorrupcao(
                  "primeiraDescoberta",
                  e.target.checked
                )
              }
            />

            <label htmlFor="cd1">
              1ª descoberta ocorreu
            </label>
          </div>

          {c.primeiraDescoberta && (
            <div className="mini-row">
              <label>Comprador que aceitou (1ª vez)</label>

              <select
                value={c.primeiroComprador}
                onChange={(e) =>
                  atualizarCorrupcao(
                    "primeiroComprador",
                    e.target.value
                  )
                }
              >
                <option value="">—</option>

                {BUYERS.filter(
                  (comprador) => comprador !== "Militar"
                ).map((comprador) => (
                  <option key={comprador} value={comprador}>
                    {comprador}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="cd2"
              checked={c.segundaDescoberta}
              disabled={!c.primeiraDescoberta}
              onChange={(e) =>
                atualizarCorrupcao(
                  "segundaDescoberta",
                  e.target.checked
                )
              }
            />

            <label htmlFor="cd2">
              2ª descoberta ocorreu (mesmo assim)
            </label>
          </div>

          {c.segundaDescoberta && (
            <div className="mini-row">
              <label>Comprador que aceitou (2ª vez)</label>

              <select
                value={c.segundoComprador}
                onChange={(e) =>
                  atualizarCorrupcao(
                    "segundoComprador",
                    e.target.value
                  )
                }
              >
                <option value="">—</option>

                {BUYERS.filter(
                  (comprador) => comprador !== "Militar"
                ).map((comprador) => (
                  <option key={comprador} value={comprador}>
                    {comprador}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mini-row">
            <label>
              <strong>Pontos do corruptor</strong>
            </label>

            <span className="pts">
              {cPts.corruptor.toFixed(1)}
            </span>
          </div>

          {Object.keys(cPts.compradores).map((comprador) => (
            <div className="mini-row" key={comprador}>
              <label>
                Pontos — {comprador}
              </label>

              <span className="pts">
                {cPts.compradores[comprador].toFixed(1)}
              </span>
            </div>
          ))}

          <div className="note note-red">
            O corruptor nunca troca de papel e continua negociando
            normalmente, mesmo após ser descoberto.
          </div>
        </div>

        {/* SABOTAGEM */}
        <div className="mini-card">
          <h3>🔒 Sabotador (Developer)</h3>

          <div className="mini-row">
            <label>Empresa do sabotador</label>

            <select
              value={s.empresaSabotador}
              onChange={(e) =>
                atualizarSabotagem(
                  "empresaSabotador",
                  e.target.value
                )
              }
            >
              {empresas.map((empresa) => (
                <option key={empresa} value={empresa}>
                  {empresa}
                </option>
              ))}
            </select>
          </div>

          <div className="mini-row">
            <label>Time do sabotador</label>

            <select
              value={s.timeSabotador}
              onChange={(e) =>
                atualizarSabotagem(
                  "timeSabotador",
                  e.target.value
                )
              }
            >
              {TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className="mini-row">
            <label>Tipo de ação</label>

            <select
              value={s.tipoAcao}
              onChange={(e) =>
                atualizarSabotagem(
                  "tipoAcao",
                  e.target.value
                )
              }
            >
              <option value="vazar">
                Vazar informação
              </option>

              <option value="atrapalhar">
                Atrapalhar decisões/produção
              </option>
            </select>
          </div>

          <div className="checkbox-row">
            <input
              type="checkbox"
              id="sd1"
              checked={s.descoberto}
              onChange={(e) =>
                atualizarSabotagem(
                  "descoberto",
                  e.target.checked
                )
              }
            />

            <label htmlFor="sd1">
              Sabotador foi descoberto
            </label>
          </div>

          {s.descoberto && (
            <>
              <div className="mini-row">
                <label>Denúncias consecutivas recebidas</label>

                <select
                  value={s.denunciasConsecutivas}
                  onChange={(e) =>
                    atualizarSabotagem(
                      "denunciasConsecutivas",
                      Number(e.target.value)
                    )
                  }
                >
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>

              <div className="checkbox-row">
                <input
                  type="checkbox"
                  id="sd2"
                  checked={s.areaSoubeECalou}
                  onChange={(e) =>
                    atualizarSabotagem(
                      "areaSoubeECalou",
                      e.target.checked
                    )
                  }
                />

                <label htmlFor="sd2">
                  PO/colegas da área sabiam e ficaram calados
                </label>
              </div>
            </>
          )}

          <div className="mini-row">
            <label>
              <strong>Pontos do sabotador</strong>
            </label>

            <span className="pts">
              {sPts.sabotador.toFixed(1)}
            </span>
          </div>

          <div className="mini-row">
            <label>
              <strong>Pontos da área/time</strong>
            </label>

            <span className="pts">
              {sPts.area > 0 ? "+" : ""}
              {sPts.area.toFixed(1)}
            </span>
          </div>

          <div className="mini-row">
            <label>
              <strong>Demitido?</strong>
            </label>

            <span className="pts">
              {sPts.demitido
                ? "SIM — vai para o time RIVAL"
                : "Não"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}