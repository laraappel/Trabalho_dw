import React from "react";

export default function AlunoRow({ aluno, index, data, setData }) {
  const empresas = [
    data.meta.empresaA,
    data.meta.empresaB,
  ];

  const times = ["", "Caça", "Transporte"];

  const papeis = [
    "",
    "Scrum Master",
    "Product Owner",
    "Owner/Stakeholder",
    "Developer",
    "Comprador - Governo",
    "Comprador - Militar",
    "Comprador - Setor Privado",
  ];

  function atualizarAluno(campo, valor) {
    setData((atual) => ({
      ...atual,
      alunos: atual.alunos.map((item, i) =>
        i === index
          ? { ...item, [campo]: valor }
          : item
      ),
    }));
  }

  return (
    <tr>
      <td>{aluno.nome}</td>

      <td>
        <select
          value={aluno.empresa}
          onChange={(e) =>
            atualizarAluno("empresa", e.target.value)
          }
        >
          <option value="">—</option>

          {empresas.map((empresa) => (
            <option key={empresa} value={empresa}>
              {empresa}
            </option>
          ))}
        </select>
      </td>

      <td>
        <select
          value={aluno.time}
          onChange={(e) =>
            atualizarAluno("time", e.target.value)
          }
        >
          {times.map((time) => (
            <option key={time} value={time}>
              {time || "—"}
            </option>
          ))}
        </select>
      </td>

      <td>
        <select
          value={aluno.papel}
          onChange={(e) =>
            atualizarAluno("papel", e.target.value)
          }
        >
          {papeis.map((papel) => (
            <option key={papel} value={papel}>
              {papel || "—"}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}