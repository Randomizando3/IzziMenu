(function () {
  if (!document.body || !document.body.classList.contains("izzimenu-demo-page")) {
    return;
  }

  var currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  var isAdmin = document.body.classList.contains("izzimenu-demo-admin");
  var pages = [
    { href: "/cardapio.html", label: "Cardapio" },
    { href: "/checkout.html", label: "Checkout" },
    { href: "/admin/dashboard.html", label: "Painel" },
    { href: "/admin/pedidos.html", label: "Pedidos" },
    { href: "/admin/cardapio.html", label: "Cardapio Admin" },
    { href: "/admin/clientes.html", label: "Clientes" },
    { href: "/admin/configuracoes.html", label: "Configuracoes" }
  ];

  function normalize(text) {
    return (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function makeBanner() {
    var banner = document.createElement("div");
    banner.className = "izzimenu-demo-banner";
    banner.innerHTML =
      "<span>Acesso demo ao sistema</span>" +
      "<span class=\"izzimenu-demo-banner__hint\">Dados ilustrativos para navegacao comercial</span>";
    return banner;
  }

  function makeNav() {
    var nav = document.createElement("nav");
    nav.className = "izzimenu-demo-nav";

    var links = pages
      .map(function (page) {
        var active = currentPath === page.href ? " is-active" : "";
        return "<a class=\"" + active.trim() + "\" href=\"" + page.href + "\">" + page.label + "</a>";
      })
      .join("");

    nav.innerHTML =
      "<div class=\"izzimenu-demo-nav__inner\">" +
      "<a class=\"izzimenu-demo-nav__brand\" href=\"/index.html\">" +
      "<img alt=\"IzziMenu\" src=\"/assets/izzimenu.png\" />" +
      "<span class=\"izzimenu-demo-nav__brand-copy\">" +
      "<strong>IzziMenu Demo</strong>" +
      "<span>Navegue pelas telas do sistema</span>" +
      "</span>" +
      "</a>" +
      "<div class=\"izzimenu-demo-nav__links\">" + links + "</div>" +
      "<div class=\"izzimenu-demo-nav__note\">" + (isAdmin ? "Painel da loja" : "Fluxo do cliente") + "</div>" +
      "</div>";

    return nav;
  }

  function makeBackButton() {
    var back = document.createElement("a");
    back.className = "izzimenu-demo-back";
    back.href = "/index.html";
    back.innerHTML =
      "<span class=\"izzimenu-demo-back__icon\">&#8592;</span>" +
      "<span>Voltar para o site</span>";
    return back;
  }

  function patchAnchorByText(scope) {
    if (!scope) {
      return;
    }

    var hrefByLabel = {
      "visao geral": "/admin/dashboard.html",
      "resumo": "/admin/dashboard.html",
      "home": "/admin/dashboard.html",
      "pedidos": "/admin/pedidos.html",
      "cardapio": "/admin/cardapio.html",
      "clientes": "/admin/clientes.html",
      "configuracoes": "/admin/configuracoes.html",
      "ajuda": "/index.html#faq"
    };

    scope.querySelectorAll("a").forEach(function (anchor) {
      var label = normalize(anchor.textContent);
      if (hrefByLabel[label]) {
        anchor.setAttribute("href", hrefByLabel[label]);
      }
    });

    scope.querySelectorAll("span.cursor-pointer").forEach(function (span) {
      var label = normalize(span.textContent);
      if (!hrefByLabel[label]) {
        return;
      }

      var anchor = document.createElement("a");
      anchor.className = span.className;
      anchor.href = hrefByLabel[label];
      anchor.innerHTML = span.innerHTML;
      span.replaceWith(anchor);
    });
  }

  function patchButtons() {
    document.querySelectorAll("button").forEach(function (button) {
      var label = normalize(button.textContent);
      if (label.indexOf("finalizar pedido") !== -1) {
        button.addEventListener("click", function () {
          window.location.href = "/checkout.html";
        });
      }

      if (label.indexOf("confirmar pedido") !== -1) {
        button.addEventListener("click", function () {
          window.location.href = "/admin/pedidos.html";
        });
      }

      if (label.indexOf("novo pedido") !== -1) {
        button.addEventListener("click", function () {
          window.location.href = "/cardapio.html";
        });
      }
    });
  }

  document.body.prepend(makeBanner());
  if (!isAdmin) {
    document.body.prepend(makeNav());
  }
  document.body.appendChild(makeBackButton());

  patchAnchorByText(document.querySelector("aside"));
  patchAnchorByText(document.querySelector("header"));
  patchAnchorByText(document.querySelector("nav.md\\:hidden"));
  patchButtons();
})();
