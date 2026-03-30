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
  var sidebarStateKey = "izzimenu-admin-sidebar-collapsed";

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
      "<div class=\"izzimenu-demo-banner__inner\">" +
      "<div class=\"izzimenu-demo-banner__copy\">" +
      "<span>Acesso demo ao sistema</span>" +
      "<span class=\"izzimenu-demo-banner__hint\">Dados ilustrativos para navegacao comercial</span>" +
      "</div>" +
      "<a class=\"izzimenu-demo-banner__link\" href=\"/index.html\">Voltar ao site</a>" +
      "</div>";
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

  function readSidebarCollapsedState() {
    try {
      return window.localStorage.getItem(sidebarStateKey) === "1";
    } catch (error) {
      return false;
    }
  }

  function writeSidebarCollapsedState(collapsed) {
    try {
      window.localStorage.setItem(sidebarStateKey, collapsed ? "1" : "0");
    } catch (error) {
      return;
    }
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

  function placeAdminTopBar(topBar) {
    var main = document.querySelector("main");
    if (!topBar || !main) {
      return topBar;
    }

    if (topBar.parentElement === document.body) {
      main.prepend(topBar);
    }

    return topBar;
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

    if (topBar.parentElement === document.body) {
      topBar.classList.add("izzimenu-admin-topbar--offset");
    }

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

  function standardizeAdminShell() {
    var aside = document.querySelector("aside");
    var main = document.querySelector("main");
    var shell = aside && aside.parentElement && aside.parentElement.contains(main) ? aside.parentElement : null;

    if (shell) {
      shell.classList.add("izzimenu-admin-layout");
    }

    if (aside) {
      aside.classList.add("izzimenu-admin-sidebar");
    }

    if (main) {
      main.classList.add("izzimenu-admin-main");
    }
  }

  function standardizeAdminContent(topBar) {
    var main = document.querySelector("main");
    if (!main) {
      return;
    }

    var needsContentWrapper = [
      "p-8",
      "p-6",
      "md:p-12",
      "space-y-8",
      "pb-24",
      "max-w-7xl",
      "mx-auto",
      "w-full"
    ].some(function (className) {
      return main.classList.contains(className);
    });

    if (!needsContentWrapper) {
      return;
    }

    var content = Array.from(main.children).find(function (child) {
      return child.classList && child.classList.contains("izzimenu-admin-content");
    });

    if (!content) {
      content = document.createElement("div");
      content.className = "izzimenu-admin-content";

      if (main.classList.contains("max-w-7xl")) {
        content.classList.add("izzimenu-admin-content--wide");
      } else {
        content.classList.add("izzimenu-admin-content--default");
      }

      if (main.classList.contains("space-y-8")) {
        content.classList.add("izzimenu-admin-content--stacked");
      }

      if (main.classList.contains("pb-24")) {
        content.classList.add("izzimenu-admin-content--bottom-space");
      }

      if (main.classList.contains("p-6") || main.classList.contains("md:p-12")) {
        content.classList.add("izzimenu-admin-content--roomy");
      }

      Array.from(main.children).forEach(function (child) {
        if (child !== topBar) {
          content.appendChild(child);
        }
      });

      main.appendChild(content);
    }

    [
      "p-8",
      "p-6",
      "md:p-12",
      "space-y-8",
      "pb-24",
      "max-w-7xl",
      "mx-auto",
      "w-full"
    ].forEach(function (className) {
      main.classList.remove(className);
    });
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

  function setSidebarCollapsed(collapsed) {
    document.body.classList.toggle("izzimenu-admin-sidebar-collapsed", collapsed);

    var toggle = document.querySelector(".izzimenu-admin-sidebar-toggle");
    if (!toggle) {
      return;
    }

    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", collapsed ? "Expandir sidebar" : "Recolher sidebar");
    toggle.setAttribute("title", collapsed ? "Expandir sidebar" : "Recolher sidebar");

    var icon = toggle.querySelector(".material-symbols-outlined");
    if (icon) {
      icon.textContent = collapsed ? "chevron_right" : "chevron_left";
    }
  }

  function ensureSidebarToggle() {
    var aside = document.querySelector("aside");
    var main = document.querySelector("main");
    if (!aside || !main) {
      return;
    }

    var toggle = document.querySelector(".izzimenu-admin-sidebar-toggle");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "izzimenu-admin-sidebar-toggle";
      toggle.innerHTML = "<span class=\"material-symbols-outlined\">chevron_left</span>";
      document.body.appendChild(toggle);
    }

    var desktopMedia = window.matchMedia("(min-width: 1025px)");
    var syncSidebarState = function () {
      if (!desktopMedia.matches) {
        setSidebarCollapsed(false);
        return;
      }

      setSidebarCollapsed(readSidebarCollapsedState());
    };

    if (!toggle.dataset.bound) {
      toggle.addEventListener("click", function () {
        if (!desktopMedia.matches) {
          return;
        }

        var collapsed = !document.body.classList.contains("izzimenu-admin-sidebar-collapsed");
        setSidebarCollapsed(collapsed);
        writeSidebarCollapsedState(collapsed);
      });

      if (desktopMedia.addEventListener) {
        desktopMedia.addEventListener("change", syncSidebarState);
      } else if (desktopMedia.addListener) {
        desktopMedia.addListener(syncSidebarState);
      }

      toggle.dataset.bound = "true";
    }

    syncSidebarState();
  }

  document.body.prepend(makeBanner());
  if (!isAdmin) {
    document.body.prepend(makeNav());
  }

  if (isAdmin) {
    var adminTopBar = placeAdminTopBar(getAdminTopBar());
    standardizeAdminShell();
    standardizeAdminContent(adminTopBar);
    standardizeAdminBrand(adminTopBar);
    standardizeAdminTopMenu(adminTopBar);
    standardizeAdminSidebar();
    standardizeAdminBottomNav();
    ensureSidebarToggle();
  }

  patchAnchorByText(document.querySelector("aside"));
  patchAnchorByText(document.querySelector("header"));
  patchAnchorByText(document.querySelector("nav.md\\:hidden"));
  patchButtons();
})();
