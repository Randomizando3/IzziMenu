(function () {
  if (!document.body || !document.body.classList.contains("izzimenu-demo-page")) {
    return;
  }

  var currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  var isAdmin = document.body.classList.contains("izzimenu-demo-admin");
  var adminAvatarSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuAscL_y2vZ2hK4zorKY6_xapfKox3G155xsLIbeYhMdAaHQcWwactA6tudZNao7Z_waNjqo32SVJzQbPz7wg7eVh4m0ECymWEfK5hYs05fXpkQn33b1pYksBo7a2be3Rj7cI2A6e_PPhsuLBiNKUlTifduULtob_R-SaTjq1swFNwzRbPbp5XNM2R42DeBS547xeu5G-1FjngJigt5ByZ_F0dsuyVYckCsgGG2QocW-MHHAuDvyvFXfGcAlXIxoNZ7N0N25zbAW7Q";
  var adminItems = [
    { href: "/admin/dashboard.html", label: "Visão Geral", icon: "dashboard" },
    { href: "/admin/pedidos.html", label: "Pedidos", icon: "package_2" },
    { href: "/admin/cardapio.html", label: "Cardápio", icon: "restaurant_menu" },
    { href: "/admin/clientes.html", label: "Clientes", icon: "group" },
    { href: "/admin/configuracoes.html", label: "Configurações", icon: "settings" }
  ];
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

  function getActiveAdminHref() {
    var match = adminItems.find(function (item) {
      return item.href === currentPath;
    });
    return match ? match.href : "/admin/dashboard.html";
  }

  function getAdminTopBar() {
    return Array.from(document.querySelectorAll("header, nav")).find(function (element) {
      return (
        !element.classList.contains("izzimenu-demo-nav") &&
        !/bottom-0/.test(element.className) &&
        /sticky|top-0|h-16/.test(element.className)
      );
    });
  }

  function standardizeAdminBrand(topBar) {
    var aside = document.querySelector("aside");
    if (!aside) {
      return;
    }

    var sideNav = Array.from(aside.children).find(function (child) {
      return child.tagName === "NAV" && /visao geral|resumo|pedidos|cardapio|clientes|configuracoes|fleet|reports/i.test(normalize(child.textContent));
    });

    var footer = Array.from(aside.children).find(function (child) {
      return /ajuda|novo pedido/.test(normalize(child.textContent));
    });

    var intro = Array.from(aside.children).find(function (child) {
      return child !== sideNav && child !== footer && /painel da loja|operacao do restaurante|izzimenu/.test(normalize(child.textContent));
    });

    if (!intro) {
      intro = document.createElement("a");
      if (sideNav) {
        aside.insertBefore(intro, sideNav);
      } else {
        aside.insertBefore(intro, aside.firstChild);
      }
    }

    intro.className = "izzimenu-admin-side-brand";
    intro.href = "/index.html";
    intro.innerHTML =
      "<img alt=\"IzziMenu\" src=\"/assets/izzimenu.png\" />" +
      "<span>Painel Demo do Delivery</span>";
  }

  function standardizeAdminTopMenu(topBar) {
    if (!topBar) {
      return;
    }

    topBar.className = "izzimenu-admin-topbar sticky top-0 z-30 flex justify-between items-center w-full px-8 h-16";

    var childElements = Array.from(topBar.children).filter(function (child) {
      return child.nodeType === 1;
    });

    var leftGroup = childElements.find(function (child) {
      return /izzimenu|visao geral|pedidos|cardapio|clientes|configuracoes/.test(normalize(child.textContent));
    });

    var rightGroup = childElements.find(function (child) {
      return child !== leftGroup;
    });

    if (!leftGroup) {
      leftGroup = document.createElement("div");
      topBar.prepend(leftGroup);
    }

    if (!rightGroup) {
      rightGroup = document.createElement("div");
      topBar.appendChild(rightGroup);
    }

    leftGroup.className = "flex items-center gap-6";
    rightGroup.className = "izzimenu-admin-top-actions";

    Array.from(leftGroup.children).forEach(function (child) {
      if (child.tagName === "NAV") {
        return;
      }

      if (/izzimenu/.test(normalize(child.textContent)) || child.querySelector("img")) {
        child.remove();
      }
    });

    var candidates = Array.from(topBar.querySelectorAll(".hidden.md\\:flex, .hidden.lg\\:flex, nav.hidden.md\\:flex, nav.hidden.lg\\:flex")).filter(function (element) {
      return /visao geral|resumo|pedidos|cardapio|clientes|configuracoes|fleet|reports/i.test(normalize(element.textContent));
    });

    var container = candidates.sort(function (left, right) {
      return left.textContent.length - right.textContent.length;
    })[0];
    if (!container) {
      container = document.createElement("nav");
      leftGroup.appendChild(container);
    }

    container.className = "izzimenu-admin-top-menu hidden lg:flex";
    container.innerHTML = adminItems.map(function (item) {
      var active = item.href === getActiveAdminHref() ? " is-active" : "";
      return "<a class=\"" + active.trim() + "\" href=\"" + item.href + "\">" + item.label + "</a>";
    }).join("");

    var searchWrapper = Array.from(rightGroup.children).find(function (child) {
      return child.querySelector && child.querySelector("input");
    });

    if (!searchWrapper) {
      searchWrapper = document.createElement("div");
      rightGroup.prepend(searchWrapper);
    }

    searchWrapper.className = "izzimenu-admin-search hidden sm:block";
    searchWrapper.innerHTML =
      "<span class=\"material-symbols-outlined\">search</span>" +
      "<input aria-label=\"Buscar pedidos\" placeholder=\"Buscar pedidos...\" type=\"text\" />";

    Array.from(rightGroup.children).forEach(function (child) {
      if (child === searchWrapper) {
        return;
      }

      if (/settings/.test(normalize(child.textContent))) {
        child.remove();
      }
    });

    var notificationButton = Array.from(rightGroup.children).find(function (child) {
      return /notifications/.test(normalize(child.textContent));
    });

    if (!notificationButton) {
      notificationButton = document.createElement("a");
      rightGroup.appendChild(notificationButton);
    }

    notificationButton.className = "izzimenu-admin-icon-btn";
    notificationButton.href = "#";
    notificationButton.innerHTML =
      "<span class=\"material-symbols-outlined\">notifications</span>" +
      "<span class=\"izzimenu-admin-icon-dot\"></span>";

    var avatar = Array.from(rightGroup.children).find(function (child) {
      return child !== notificationButton && child.querySelector && child.querySelector("img");
    });

    if (!avatar) {
      avatar = document.createElement("div");
      rightGroup.appendChild(avatar);
    }

    avatar.className = "izzimenu-admin-avatar";
    avatar.innerHTML = "<img alt=\"Admin Profile\" src=\"" + adminAvatarSrc + "\" />";
  }

  function standardizeAdminSidebar() {
    var aside = document.querySelector("aside");
    if (!aside) {
      return;
    }

    var sideNav = Array.from(aside.children).find(function (child) {
      return child.tagName === "NAV" && /visao geral|resumo|pedidos|cardapio|clientes|configuracoes|fleet|reports/i.test(normalize(child.textContent));
    });

    var footer = Array.from(aside.children).find(function (child) {
      return /ajuda|novo pedido/.test(normalize(child.textContent));
    });

    if (!sideNav) {
      sideNav = document.createElement("nav");
      if (footer) {
        aside.insertBefore(sideNav, footer);
      } else {
        aside.appendChild(sideNav);
      }
    }

    Array.from(aside.children).forEach(function (child) {
      if (child.tagName === "A" && child !== footer) {
        child.remove();
      }
    });

    sideNav.className = "izzimenu-admin-side-nav flex-1";
    sideNav.innerHTML = adminItems.map(function (item) {
      var active = item.href === getActiveAdminHref() ? " is-active" : "";
      return (
        "<a class=\"" + active.trim() + "\" href=\"" + item.href + "\">" +
        "<span class=\"material-symbols-outlined\">" + item.icon + "</span>" +
        "<span>" + item.label + "</span>" +
        "</a>"
      );
    }).join("");

    if (!footer) {
      footer = document.createElement("div");
      aside.appendChild(footer);
    }

    footer.className = "izzimenu-admin-side-footer";
    footer.innerHTML =
      "<a class=\"izzimenu-help-link\" href=\"/index.html#faq\">" +
      "<span class=\"material-symbols-outlined\">help</span>" +
      "<span>Ajuda</span>" +
      "</a>" +
      "<a class=\"izzimenu-new-order\" href=\"/cardapio.html\">" +
      "<span class=\"material-symbols-outlined\">add</span>" +
      "<span>Novo Pedido</span>" +
      "</a>";
  }

  function standardizeAdminBottomNav() {
    var bottomNav = Array.from(document.querySelectorAll("body > nav")).find(function (nav) {
      return nav !== document.querySelector(".izzimenu-demo-nav") && /bottom-0/.test(nav.className);
    });

    if (!bottomNav) {
      return;
    }

    bottomNav.classList.add("izzimenu-admin-bottom-nav");
    bottomNav.innerHTML = adminItems.slice(0, 4).map(function (item) {
      var active = item.href === getActiveAdminHref() ? " is-active" : "";
      return (
        "<a class=\"" + active.trim() + "\" href=\"" + item.href + "\">" +
        "<span class=\"material-symbols-outlined\">" + item.icon + "</span>" +
        "<span>" + item.label + "</span>" +
        "</a>"
      );
    }).join("");
  }

  document.body.prepend(makeBanner());
  if (!isAdmin) {
    document.body.prepend(makeNav());
  }
  document.body.appendChild(makeBackButton());

  if (isAdmin) {
    var adminTopBar = getAdminTopBar();
    standardizeAdminBrand(adminTopBar);
    standardizeAdminTopMenu(adminTopBar);
    standardizeAdminSidebar();
    standardizeAdminBottomNav();
  }

  patchAnchorByText(document.querySelector("aside"));
  patchAnchorByText(document.querySelector("header"));
  patchAnchorByText(document.querySelector("nav.md\\:hidden"));
  patchButtons();
})();
