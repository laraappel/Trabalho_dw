import { TEAM_IMAGES, ROLE_COLORS, TIMES } from "../data/initialData";

function papelBadgeColor(papel) {
  return ROLE_COLORS[papel] || "#6E6E6E";
}

// Props: empresa (nome), data (objeto completo, usa data.alunos/teamNames)
export default function CompanyBlock({ empresa, data }) {
  const imgs = TEAM_IMAGES[empresa] || {};
  const sm = data.alunos.find(a => a.papel === "Scrum Master" && a.empresa === empresa);
  const owner = data.alunos.find(a => a.papel === "Owner/Stakeholder" && a.empresa === empresa);
  const teamRoster = time =>
    data.alunos.filter(a => a.empresa === empresa && a.time === time && (a.papel === "Product Owner" || a.papel === "Developer"));

  return (
    <div className="company-block">
      <div className="company-header">
        <img src={imgs.logo || ""} alt={empresa} />
        <div>
          <h2>{empresa}</h2>
          <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
            Scrum Master: {sm ? sm.nome : <span className="tag-unassigned">nÃ£o atribuÃ­do</span>} Â·
            {" "}Owner: {owner ? owner.nome : <span className="tag-unassigned">nÃ£o atribuÃ­do</span>}
          </div>
        </div>
      </div>
      <div className="teams-grid">
        {TIMES.map(t => {
          const roster = teamRoster(t).sort((a, b) => (a.papel === "Product Owner" ? -1 : 1));
          return (
            <div className="team-card" key={t}>
              <img className="team-img" src={imgs[t] || ""} alt={data.teamNames[empresa][t]} />
              <div className="team-body">
                <h3>{data.teamNames[empresa][t]}</h3>
                <ul className="role-list">
                  {roster.length === 0 ? (
                    <li><span className="tag-unassigned">ninguÃ©m atribuÃ­do ainda</span></li>
                  ) : (
                    roster.map(a => (
                      <li key={a.id}>
                        <span>{a.nome}</span>
                        <span className="role-badge" style={{ background: papelBadgeColor(a.papel) }}>
                          {a.papel === "Product Owner" ? "PO" : "Dev"}
                        </span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
