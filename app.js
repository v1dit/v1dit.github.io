const experience = [
  {
    company: "PhrasIQ",
    title: "Software Engineering Intern",
    date: "Jul 2026 – Present",
  },
  {
    company: "Circuit Launch",
    title: "Full-Stack Engineering Intern",
    date: "Jun 2026 – Sep 2026",
  },
  {
    company: "Unicage",
    title: "Blockchain Developer",
    date: "Jun 2025 – May 2026",
  },
  {
    company: "Santa Clara University",
    title: "Lead Lab Researcher",
    date: "Jan 2025 – Jun 2026",
  },
  {
    company: "Elytra Robotics",
    title: "Software Engineer Intern",
  },
  {
    company: "Berkeley Lab",
    title: "Data Analyst Intern",
    date: "Jun 2022 – Aug 2023",
  },
  {
    company: "San Jose State University",
    title: "Graduate Research Assistant",
  },
];

const awards = [
  {
    title: "Anthropic × AWS Hackathon Winner",
    project: "Ido",
    date: "Jun 2026",
    url: "https://github.com/v1dit/ido",
  },
  {
    title: "ML Empowerment Foundation Build Challenge Winner",
    project: "ML Labs",
    date: "Jun 2026",
    url: "https://github.com/v1dit/ml-labs",
  },
  {
    title: "YC × Nozomio Hackathon Track Winner",
    project: "Kiro",
    date: "May 2026",
    url: "https://github.com/kgarg2468/kiro-nozomio-hack",
  },
  {
    title: "2nd Place · AWS Building the Next YC Unicorn",
    project: "Erevna",
    date: "Apr 2026",
    url: "https://github.com/v1dit/erevna",
  },
  {
    title: "OceanHacks Winner",
    project: "BlueDocs",
    date: "Feb 2026",
    url: "https://github.com/shlawgathon/BlueDocs",
  },
  {
    title: "3rd Place · SCU ACM Hackathon",
    project: "DriveWatch AI",
    date: "Nov 2024",
    url: "https://github.com/v1dit/AWS2024",
  },
];

const projects = [
  {
    name: "Ido",
    description: "Universal agent harness for editable 3D design.",
    stack: "Python · Blender · OpenSCAD",
    url: "https://github.com/v1dit/ido",
    featured: true,
  },
  {
    name: "Kiro",
    description: "AI context infrastructure connecting code and organizational knowledge.",
    stack: "Agents · Retrieval · Infrastructure",
    url: "https://github.com/kgarg2468/kiro-nozomio-hack",
    featured: true,
  },
  {
    name: "ML Labs",
    description: "Autonomous end-to-end machine learning lab powered by agent swarms.",
    stack: "TypeScript · ML · Multi-agent",
    url: "https://github.com/v1dit/ml-labs",
    featured: true,
  },
  {
    name: "Erevna",
    description: "Autonomous research infrastructure for deep technical investigation.",
    stack: "TypeScript · Research agents",
    url: "https://github.com/v1dit/erevna",
    featured: true,
  },
  {
    name: "BlueDocs",
    description: "OceanHacks-winning project for environmental knowledge workflows.",
    stack: "AI · Climate",
    url: "https://github.com/shlawgathon/BlueDocs",
  },
  {
    name: "DriveWatch AI",
    description: "Computer-vision driver safety project and SCU ACM third-place winner.",
    stack: "Python · Computer vision",
    url: "https://github.com/v1dit/AWS2024",
  },
  {
    name: "Aegis",
    description: "Adaptive cyber-defense simulation with reinforcement learning.",
    stack: "Python · RL · Security",
    url: "https://github.com/v1dit/aegis-demo-checkpoints",
  },
  {
    name: "Homora",
    description: "Experimental agentic application built for the NVIDIA short hackathon.",
    stack: "TypeScript · AI",
    url: "https://github.com/v1dit/homora-nvidia-short-hack",
  },
  {
    name: "Sportsbet Portfolio",
    description: "Web3 and AI sports-betting clearing and portfolio system.",
    stack: "Solidity · Web3 · AI",
    url: "https://github.com/v1dit/sportsbet-portfolio",
  },
  {
    name: "Networking Agent",
    description: "Automated, personalized professional outreach from end to end.",
    stack: "Python · Agents",
    url: "https://github.com/v1dit/networking-agent",
  },
  {
    name: "Voyagent",
    description: "Early intelligent travel-search prototype.",
    stack: "Python · Travel",
    url: "https://github.com/v1dit/Voyagent",
  },
];

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);
}

function projectMarkup(project) {
  return `
    <a class="project reactive-link" href="${project.url}" target="_blank" rel="noreferrer">
      <span class="project__name">${escapeHtml(project.name)}</span>
      <span class="project__description">${escapeHtml(project.description)}</span>
      <span class="project__stack">${escapeHtml(project.stack)}</span>
      <span class="project__arrow" aria-hidden="true">↗</span>
    </a>`;
}

document.querySelector("#experience-list").innerHTML = experience
  .map((role) => `
    <article class="role">
      <h3 class="role__company">${escapeHtml(role.company)}</h3>
      <div class="role__details">
        <h3 class="role__title">${escapeHtml(role.title)}</h3>
        ${role.date ? `<p class="role__date">${escapeHtml(role.date)}</p>` : ""}
      </div>
    </article>`)
  .join("");

document.querySelector("#awards-list").innerHTML = awards
  .map((award, index) => `
    <a class="award reactive-link" href="${award.url}" target="_blank" rel="noreferrer">
      <span class="award__index">${String(index + 1).padStart(2, "0")} / ${String(awards.length).padStart(2, "0")}</span>
      <h3>${escapeHtml(award.title)}</h3>
      <p class="award__date">${escapeHtml(award.project)} · ${escapeHtml(award.date)}</p>
      <span class="award__arrow" aria-hidden="true">↗</span>
    </a>`)
  .join("");

document.querySelector("#featured-projects").innerHTML = projects
  .filter((project) => project.featured)
  .map(projectMarkup)
  .join("");

document.querySelector("#all-projects").innerHTML = projects.map(projectMarkup).join("");
document.querySelector("#project-count").textContent = String(projects.length).padStart(2, "0");
document.querySelector("#year").textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const canvas = document.querySelector("#canvas");
const polyhedron = new BrailleIcosahedron(82, 28, 45, 13, 11.5);
let pointer = { x: window.innerWidth * 0.35, y: window.innerHeight * 0.35 };
let hoveredLink = false;

function renderPolyhedron() {
  canvas.textContent = polyhedron.render();
}

renderPolyhedron();

if (!reducedMotion.matches) {
  window.addEventListener("pointermove", (event) => {
    pointer = { x: event.clientX, y: event.clientY };
  }, { passive: true });

  document.addEventListener("pointerover", (event) => {
    hoveredLink = Boolean(event.target.closest(".reactive-link"));
  });

  document.addEventListener("pointerout", (event) => {
    if (!event.relatedTarget?.closest?.(".reactive-link")) hoveredLink = false;
  });

  window.setInterval(() => {
    const nx = pointer.x / Math.max(window.innerWidth, 1) - 0.5;
    const ny = pointer.y / Math.max(window.innerHeight, 1) - 0.5;
    const multiplier = hoveredLink ? -5 : 1;
    polyhedron.rotate((0.007 + ny * 0.006) * multiplier, (-0.01 + nx * 0.008) * multiplier);
    renderPolyhedron();
  }, 75);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
