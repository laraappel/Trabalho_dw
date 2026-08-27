import React from "react";

export default function BuyerProductPanel({ data, setData }) {
  function atualizarCampo(index, campo, valor) {
    setData((atual) => ({
      ...atual,
      buyerProduct: atual.buyerProduct.map((item, i) =>
        i === index
          ? { ...item, [campo]: valor }
          : item
      ),
    }));
  }

  return (
    <div className="panel">
      <h2>Ficha do Comprador — Avaliação do Produto</h2>

      <div className="desc">
        Transcreva aqui os dados que cada comprador preencheu na ficha em
        papel, ao final de cada Sprint.
      </div>

      <table>
        <thead>
          <tr>
            <th>Sprint</th>
            <th>Comprador</th>
            <th>Empresa</th>
            <th>Produto</th>
            <th>
              Padrão
              <br />
              Técnico
            </th>
            <th>
              Padrão
              <br />
              Visual
            </th>
            <th>Prazo</th>
            <th>
              Com.
              <br />
              Owner (1-5)
            </th>
            <th>Sinal</th>
            <th>Decisão</th>
            <th>Nota (1-5)</th>
          </tr>
        </thead>

        <tbody>
          {data.buyerProduct.map((item, index) => {
            const mostrarSprint =
              index === 0 ||
              item.sprint !== data.buyerProduct[index - 1].sprint;

            return (
              <tr key={index}>
                <td className="sprint-label">
                  {mostrarSprint ? `Sprint ${item.sprint}` : ""}
                </td>

                <td>{item.comprador}</td>

                <td>{item.empresa}</td>

                <td>{item.produto}</td>

                <td>
                  <select
                    value={item.pt}
                    onChange={(e) =>
                      atualizarCampo(index, "pt", e.target.value)
                    }
                  >
                    <option value="">—</option>
                    <option value="S">Sim</option>
                    <option value="N">Não</option>
                  </select>
                </td>

                <td>
                  <select
                    value={item.pv}
                    onChange={(e) =>
                      atualizarCampo(index, "pv", e.target.value)
                    }
                  >
                    <option value="">—</option>
                    <option value="S">Sim</option>
                    <option value="N">Não</option>
                  </select>
                </td>

                <td>
                  <select
                    value={item.prazo}
                    onChange={(e) =>
                      atualizarCampo(index, "prazo", e.target.value)
                    }
                  >
                    <option value="">—</option>
                    <option value="S">Sim</option>
                    <option value="N">Não</option>
                  </select>
                </td>

                <td>
                  <select
                    value={item.comOwner}
                    onChange={(e) =>
                      atualizarCampo(
                        index,
                        "comOwner",
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
                  <select
                    value={item.sinal}
                    onChange={(e) =>
                      atualizarCampo(index, "sinal", e.target.value)
                    }
                  >
                    <option value="">—</option>
                    <option value="S">Sim</option>
                    <option value="N">Não</option>
                  </select>
                </td>

                <td>
                  <select
                    value={item.decisao}
                    onChange={(e) =>
                      atualizarCampo(
                        index,
                        "decisao",
                        e.target.value
                      )
                    }
                  >
                    <option value="">—</option>
                    <option value="A">Aceitou</option>
                    <option value="I">Ignorou</option>
                    <option value="D">Denunciou</option>
                  </select>
                </td>

                <td>
                  <select
                    value={item.nota}
                    onChange={(e) =>
                      atualizarCampo(index, "nota", e.target.value)
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
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="note note-orange">
        Militar só avalia Caça; Setor Privado só avalia Transporte; Governo
        avalia os dois. Linhas fora do papel do comprador podem ficar em
        branco.
      </div>
    </div>
  );
}