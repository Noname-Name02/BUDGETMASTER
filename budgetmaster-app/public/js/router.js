const routes = {
  pendente: { title: "Pendentes", status: "pendente" },
  aprovado: { title: "Aprovados", status: "aprovado" },
  recusado: { title: "Recusados", status: "recusado" },
  lixeira: { title: "Lixeira", status: "lixeira" },
  all: { title: "Todos", status: "all" }
};

let currentRoute = "pendente";

/* =========================
   GET CURRENT ROUTE
========================= */
export function getCurrentRoute() {
  return currentRoute;
}

/* =========================
   NAVIGATE (ROTEAMENTO)
========================= */
export function navigate(route, callback) {

  if (!routes[route]) {
    console.warn("Rota inválida:", route);
    return;
  }

  currentRoute = route;

  const titleEl = document.getElementById("page-title");

  if (titleEl) {
    titleEl.innerText = routes[route].title;
  }

  callback(routes[route]);
}

/* =========================
   STATUS DA ROTA
========================= */
export function getRouteStatus(route) {
  return routes[route]?.status || "pendente";
}