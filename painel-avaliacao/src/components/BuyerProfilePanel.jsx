import React from "react";

export default function BuyerProfilePanel({ data, setData }) {
  function atualizarCampo(index, campo, valor) {
    setData((atual) => ({
      ...atual,
      buyerProf: atual.buyerProf.map((item, i) =>
        i === index
          ? { ...item, [campo]: valor }
          : item
      ),
    }));
  }

  return (
    <div className="panel">
      <h2>Compradores — Desempenho no Papel</h2>

      <div className="desc">
        Avaliação do professor sobre como cada comprador exerceu seu papel.
      </div>

      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Comprador</th>
            <th>
              Aplicou o checklist
              <br />
              de verificação?
            </th>
            <th>
              Decisões coerentes
              <br />
              com o papel?
            </th>
            <th>
              Feedback construtivo
              <br />
              nas Reviews?
            </th>
            <th>Nota (1-5)</th>
            <th>Observações</th>
          </tr>
        </thead>

        <tbody>
          {data.buyerProf.map((item, index) => {
            const mostrarSprint =
              index === 0 ||
              item.sprint !== data.buyerProf[index - 1].sprint;

            return (
              <tr key={index}>
                <td className="sprint-label">
                  {mostrarSprint ? `Sprint ${item.sprint}` : ""}
                </td>

                <td>{item.comprador}</td>

                <td>
                  <select
                    value={item.checklist}
                    onChange={(e) =>
                      atualizarCampo(
                        index,
                        "checklist",
                        e.target.value
                      )
                    }
                  >
                    <option value="">—</option>
                    <option value="S">Sim</option>
                    <option value="N">Não</option>
                  </select>
                </td>

                <td>
                  <select
                    value={item.decisoes}
                    onChange={(e) =>
                      atualizarCampo(
                        index,
                        "decisoes",
                        e.target.value
                      )
                    }
                  >
                    <option value="">—</option>
                    <option value="S">Sim</option>
                    <option value="N">Não</option>
                  </select>
                </td>

                <td>
                  <select
                    value={item.feedback}
                    onChange={(e) =>
                      atualizarCampo(
                        index,
                        "feedback",
                        e.target.value
                      )
                    }
                  >
                    <option value="">—</option>
                    <option value="S">Sim</option>
                    <option value="N">Não</option>
                  </select>
                </td>

                <td>
                  <select
                    value={item.nota}
                    onChange={(e) =>
                      atualizarCampo(
                        index,
                        "nota",
                        e.target.value
                      )
                    }
                  >
                    <option value="">—</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </td>

                <td>
                  <input
                    className="obs-input"
                    type="text"
                    value={item.obs}
                    placeholder=""
                    onChange={(e) =>
                      atualizarCampo(
                        index,
                        "obs",
                        e.target.value
                      )
                    }
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="note note-orange">
        Critério-guia: avalie se o comprador aplicou o checklist a cada
        Sprint, se as decisões foram coerentes com o papel, e se o
        feedback nas Reviews foi útil.
      </div>
    </div>
  );
}