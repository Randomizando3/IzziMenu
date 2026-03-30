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
  var avatarStateKey = "izzimenu-admin-avatar-src";
  var notificationsStateKey = "izzimenu-admin-notifications";
  var demoOrders = [
    {
      id: "482",
      client: "Ricardo Mendonça",
      phone: "(11) 99832-1122",
      summary: "2 Itens • Entrega em Casa",
      total: "R$ 142,50",
      eta: "42 min",
      paymentLabel: "Pago (Online)",
      paymentTone: "paid",
      badgeTone: "soft",
      addressTitle: "Rua das Palmeiras, 88",
      addressLine: "Moema, São Paulo - SP",
      addressNote: "Casa 2 - Portão cinza",
      items: [
        { quantity: 1, name: "Smash Duplo", note: "Sem cebola • Molho à parte", price: "R$ 48,90" },
        { quantity: 1, name: "Batata Crinkle Grande", note: "Com cheddar e bacon", price: "R$ 26,60" },
        { quantity: 2, name: "Refrigerante Lata", note: "Coca-Cola zero", price: "R$ 18,00" }
      ],
      subtotal: "R$ 123,50",
      deliveryFee: "R$ 19,00",
      totalLabel: "R$ 142,50",
      status: "Recebido",
      type: "Entrega"
    },
    {
      id: "483",
      client: "Beatriz Silva",
      phone: "(11) 98765-4321",
      summary: "1 Item • Retirada",
      total: "R$ 58,00",
      eta: "12 min",
      paymentLabel: "Pendente",
      paymentTone: "pending",
      badgeTone: "strong",
      addressTitle: "Rua das Amoreiras, 142",
      addressLine: "Jardim Paulista, São Paulo - SP",
      addressNote: "Apt 42B - Tocar interfone",
      items: [
        { quantity: 1, name: "Combo Premium Delivery", note: "Sem cebola • Batata extra crocante", price: "R$ 58,00" }
      ],
      subtotal: "R$ 58,00",
      deliveryFee: "Grátis",
      totalLabel: "R$ 58,00",
      status: "Em preparo",
      type: "Retirada"
    },
    {
      id: "484",
      client: "Carlos Eduardo",
      phone: "(11) 99551-7719",
      summary: "4 Itens • Entrega em Casa",
      total: "R$ 215,90",
      eta: "5 min",
      paymentLabel: "Pago (Cartão)",
      paymentTone: "paid",
      badgeTone: "soft",
      addressTitle: "Alameda Lorena, 900",
      addressLine: "Jardins, São Paulo - SP",
      addressNote: "Sala comercial - Recepção principal",
      items: [
        { quantity: 2, name: "Cheddar Master", note: "Maionese defumada", price: "R$ 77,80" },
        { quantity: 1, name: "Bacon BBQ Special", note: "Sem picles", price: "R$ 42,00" },
        { quantity: 1, name: "Milk-shake de Ovomaltine", note: "500ml", price: "R$ 26,10" },
        { quantity: 2, name: "Água sem gás", note: "Gelada", price: "R$ 10,00" }
      ],
      subtotal: "R$ 192,90",
      deliveryFee: "R$ 23,00",
      totalLabel: "R$ 215,90",
      status: "Saiu para entrega",
      type: "Entrega"
    }
  ];
  var defaultNotifications = [
    {
      id: "order-483",
      title: "Novo pedido #483",
      body: "Beatriz Silva acabou de finalizar um pedido para retirada.",
      time: "Há 2 min",
      href: "/admin/pedidos.html?order=483",
      unread: true
    },
    {
      id: "payment-484",
      title: "Pagamento aprovado",
      body: "O pedido #484 foi aprovado no cartão e já pode seguir no fluxo.",
      time: "Há 8 min",
      href: "/admin/pedidos.html?order=484",
      unread: true
    },
    {
      id: "client-jane",
      title: "Cliente recorrente voltou",
      body: "Jane Doe abriu o cardápio novamente depois da última campanha.",
      time: "Hoje, 17:10",
      href: "/admin/clientes.html",
      unread: false
    }
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

  function readJsonState(key, fallbackValue) {
    try {
      var rawValue = window.localStorage.getItem(key);
      if (!rawValue) {
        return fallbackValue;
      }

      return JSON.parse(rawValue);
    } catch (error) {
      return fallbackValue;
    }
  }

  function writeJsonState(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      return;
    }
  }

  function getAvatarSrc() {
    try {
      return window.localStorage.getItem(avatarStateKey) || adminAvatarSrc;
    } catch (error) {
      return adminAvatarSrc;
    }
  }

  function setAvatarSrc(value) {
    try {
      if (value) {
        window.localStorage.setItem(avatarStateKey, value);
      } else {
        window.localStorage.removeItem(avatarStateKey);
      }
    } catch (error) {
      return;
    }
  }

  function getNotifications() {
    var items = readJsonState(notificationsStateKey, null);
    if (!Array.isArray(items) || !items.length) {
      items = defaultNotifications.slice();
      writeJsonState(notificationsStateKey, items);
    }

    return items;
  }

  function saveNotifications(items) {
    writeJsonState(notificationsStateKey, items);
  }

  function updateUrlParam(name, value) {
    var currentUrl = new URL(window.location.href);

    if (value) {
      currentUrl.searchParams.set(name, value);
    } else {
      currentUrl.searchParams.delete(name);
    }

    window.history.replaceState({}, "", currentUrl.pathname + currentUrl.search + currentUrl.hash);
  }

  function getOrderById(orderId) {
    return demoOrders.find(function (order) {
      return order.id === orderId;
    }) || null;
  }

  function hasImage(element) {
    return !!(element && (element.tagName === "IMG" || (element.querySelector && element.querySelector("img"))));
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

    topBar.className = "izzimenu-admin-topbar sticky top-0 z-30 flex justify-between items-center w-full px-8 h-12";

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

    if (currentPath === "/admin/pedidos.html") {
      if (!searchWrapper) {
        searchWrapper = document.createElement("div");
        rightGroup.prepend(searchWrapper);
      }

      searchWrapper.className = "izzimenu-admin-search hidden sm:block";
      searchWrapper.dataset.demoRole = "admin-search";
      searchWrapper.innerHTML =
        "<span class=\"material-symbols-outlined\">search</span>" +
        "<input aria-label=\"Buscar pedidos\" placeholder=\"Buscar pedidos...\" type=\"text\" />";
    } else if (searchWrapper) {
      searchWrapper.remove();
      searchWrapper = null;
    }

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
    notificationButton.dataset.demoRole = "notifications-toggle";
    notificationButton.href = "#";
    notificationButton.innerHTML =
      "<span class=\"material-symbols-outlined\">notifications</span>" +
      "<span class=\"izzimenu-admin-icon-dot\"></span>";

    Array.from(rightGroup.children).forEach(function (child) {
      if (child === searchWrapper || child === notificationButton) {
        return;
      }

      if (hasImage(child)) {
        child.remove();
      }
    });

    var avatar = document.createElement("div");
    rightGroup.appendChild(avatar);

    avatar.className = "izzimenu-admin-avatar";
    avatar.dataset.demoRole = "avatar-toggle";
    avatar.setAttribute("role", "button");
    avatar.setAttribute("tabindex", "0");
    avatar.setAttribute("aria-label", "Abrir opções do perfil");
    avatar.innerHTML = "<img alt=\"Admin Profile\" src=\"" + getAvatarSrc() + "\" />";
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

  function syncAvatarImages() {
    var avatarSrc = getAvatarSrc();
    document.querySelectorAll(".izzimenu-admin-avatar img").forEach(function (image) {
      image.src = avatarSrc;
    });
  }

  function setupAdminAvatarMenu() {
    var topBar = document.querySelector(".izzimenu-admin-topbar");
    var avatarToggle = document.querySelector('[data-demo-role="avatar-toggle"]');

    if (!topBar || !avatarToggle) {
      return;
    }

    syncAvatarImages();

    var panel = document.querySelector(".izzimenu-admin-avatar-menu");
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "izzimenu-admin-popover izzimenu-admin-avatar-menu";
      topBar.appendChild(panel);
    }

    var input = document.querySelector(".izzimenu-admin-avatar-input");
    if (!input) {
      input = document.createElement("input");
      input.className = "izzimenu-admin-avatar-input";
      input.type = "file";
      input.accept = "image/*";
      input.hidden = true;
      document.body.appendChild(input);
    }

    function renderMenu() {
      panel.innerHTML =
        "<div class=\"izzimenu-admin-avatar-menu__preview\">" +
        "<img alt=\"Avatar atual\" src=\"" + getAvatarSrc() + "\" />" +
        "<div>" +
        "<strong>Perfil da demo</strong>" +
        "<span>Imagem salva localmente neste navegador.</span>" +
        "</div>" +
        "</div>" +
        "<button type=\"button\" class=\"izzimenu-admin-avatar-menu__action\" data-avatar-action=\"upload\">Trocar foto</button>" +
        "<button type=\"button\" class=\"izzimenu-admin-avatar-menu__action\" data-avatar-action=\"reset\">Restaurar padrão</button>";
    }

    function closeMenu() {
      panel.classList.remove("is-open");
      avatarToggle.classList.remove("is-active");
    }

    function openMenu() {
      renderMenu();
      panel.classList.add("is-open");
      avatarToggle.classList.add("is-active");
    }

    if (!avatarToggle.dataset.bound) {
      avatarToggle.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (panel.classList.contains("is-open")) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      avatarToggle.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          avatarToggle.click();
        }
      });

      input.addEventListener("change", function () {
        var file = input.files && input.files[0];
        if (!file) {
          return;
        }

        var reader = new FileReader();
        reader.onload = function (loadEvent) {
          setAvatarSrc(loadEvent.target.result);
          syncAvatarImages();
          renderMenu();
        };
        reader.readAsDataURL(file);
      });

      document.addEventListener("click", function (event) {
        if (!panel.classList.contains("is-open")) {
          return;
        }

        if (panel.contains(event.target) || avatarToggle.contains(event.target)) {
          return;
        }

        closeMenu();
      });

      panel.addEventListener("click", function (event) {
        var actionButton = event.target.closest("[data-avatar-action]");
        if (!actionButton) {
          return;
        }

        var action = actionButton.getAttribute("data-avatar-action");
        if (action === "upload") {
          input.click();
        }

        if (action === "reset") {
          setAvatarSrc("");
          syncAvatarImages();
          renderMenu();
        }
      });

      avatarToggle.dataset.bound = "true";
    }

    renderMenu();
  }

  function getPaymentBadgeClass(order) {
    if (order.paymentTone === "pending") {
      return "bg-surface-container-highest text-on-surface-variant";
    }

    return "bg-secondary-container text-on-secondary-container";
  }

  function renderOrderDetail(order) {
    var detailAside = Array.from(document.querySelectorAll("main aside")).find(function (element) {
      return !element.classList.contains("izzimenu-admin-sidebar");
    });

    if (!detailAside || !order) {
      return;
    }

    detailAside.classList.add("izzimenu-admin-order-detail");
    detailAside.innerHTML =
      "<div class=\"p-6 border-b border-surface-container\">" +
      "<div class=\"flex items-center justify-between mb-4\">" +
      "<span class=\"px-3 py-1 rounded bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest\">Pedido #" + order.id + "</span>" +
      "<div class=\"flex gap-2\">" +
      "<button class=\"p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors\" type=\"button\"><span class=\"material-symbols-outlined text-xl\">print</span></button>" +
      "<button class=\"p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors\" type=\"button\"><span class=\"material-symbols-outlined text-xl\">close</span></button>" +
      "</div>" +
      "</div>" +
      "<h3 class=\"text-xl font-bold text-on-surface\">" + order.client + "</h3>" +
      "<p class=\"text-sm text-on-surface-variant font-medium\">" + order.phone + "</p>" +
      "</div>" +
      "<div class=\"p-6 flex-1 space-y-6\">" +
      "<section>" +
      "<p class=\"text-[10px] uppercase font-black text-on-surface-variant tracking-widest mb-3\">Endereço do pedido</p>" +
      "<div class=\"flex items-start gap-3\">" +
      "<span class=\"material-symbols-outlined text-primary mt-0.5\">location_on</span>" +
      "<div>" +
      "<p class=\"text-sm font-bold text-on-surface\">" + order.addressTitle + "</p>" +
      "<p class=\"text-xs text-on-surface-variant\">" + order.addressLine + "</p>" +
      "<p class=\"text-xs font-semibold text-primary mt-1\">" + order.addressNote + "</p>" +
      "</div>" +
      "</div>" +
      "</section>" +
      "<section>" +
      "<p class=\"text-[10px] uppercase font-black text-on-surface-variant tracking-widest mb-3\">Itens do pedido</p>" +
      "<div class=\"space-y-3\">" +
      order.items.map(function (item) {
        return (
          "<div class=\"flex justify-between items-center text-sm\">" +
          "<div class=\"flex items-center gap-3\">" +
          "<span class=\"w-6 h-6 rounded bg-surface-container-low flex items-center justify-center font-bold text-[10px]\">" + item.quantity + "x</span>" +
          "<div>" +
          "<span class=\"font-medium text-on-surface block\">" + item.name + "</span>" +
          "<span class=\"text-xs text-on-surface-variant\">" + item.note + "</span>" +
          "</div>" +
          "</div>" +
          "<span class=\"font-bold\">" + item.price + "</span>" +
          "</div>"
        );
      }).join("") +
      "</div>" +
      "</section>" +
      "<section class=\"pt-6 border-t border-surface-container space-y-2 text-sm\">" +
      "<div class=\"flex justify-between\"><span class=\"text-on-surface-variant\">Subtotal</span><span class=\"font-bold\">" + order.subtotal + "</span></div>" +
      "<div class=\"flex justify-between\"><span class=\"text-on-surface-variant\">Taxa de Entrega</span><span class=\"font-bold\">" + order.deliveryFee + "</span></div>" +
      "<div class=\"flex justify-between text-base pt-2\"><span class=\"font-bold\">Total</span><span class=\"font-black\">" + order.totalLabel + "</span></div>" +
      "</section>" +
      "<section class=\"grid grid-cols-2 gap-3 pt-2\">" +
      "<div class=\"rounded-xl bg-surface-container-low p-4\">" +
      "<p class=\"text-[10px] uppercase font-black tracking-widest text-on-surface-variant mb-1\">Status</p>" +
      "<p class=\"font-bold text-on-surface\">" + order.status + "</p>" +
      "</div>" +
      "<div class=\"rounded-xl bg-surface-container-low p-4\">" +
      "<p class=\"text-[10px] uppercase font-black tracking-widest text-on-surface-variant mb-1\">Pagamento</p>" +
      "<span class=\"inline-flex px-2.5 py-1 rounded text-[10px] font-black uppercase " + getPaymentBadgeClass(order) + "\">" + order.paymentLabel + "</span>" +
      "</div>" +
      "</section>" +
      "</div>";
  }

  function setupOrdersDemo() {
    if (currentPath !== "/admin/pedidos.html") {
      return;
    }

    var orderRows = Array.from(document.querySelectorAll("main .grid.grid-cols-6.items-center"));
    if (!orderRows.length) {
      return;
    }

    var rowsContainer = orderRows[0].parentElement;
    var emptyState = document.querySelector(".izzimenu-admin-orders-empty");
    if (!emptyState) {
      emptyState = document.createElement("div");
      emptyState.className = "izzimenu-admin-orders-empty";
      emptyState.hidden = true;
      emptyState.innerHTML =
        "<strong>Nenhum pedido encontrado</strong>" +
        "<span>Tente buscar por número do pedido, cliente ou forma de entrega.</span>";
      rowsContainer.appendChild(emptyState);
    }

    orderRows.forEach(function (row) {
      var match = row.textContent.match(/#(\d+)/);
      var orderId = match ? match[1] : "";
      row.dataset.orderId = orderId;
      row.classList.add("izzimenu-admin-order-row");
      row.addEventListener("click", function () {
        selectOrder(orderId);
      });
    });

    function getVisibleRows() {
      return orderRows.filter(function (row) {
        return row.style.display !== "none";
      });
    }

    function selectOrder(orderId) {
      var order = getOrderById(orderId) || getOrderById("483");
      orderRows.forEach(function (row) {
        row.classList.toggle("is-selected", row.dataset.orderId === order.id);
      });
      renderOrderDetail(order);
      updateUrlParam("order", order.id);
    }

    function applyOrderSearch(query) {
      var normalizedQuery = normalize(query);
      var visibleCount = 0;

      orderRows.forEach(function (row) {
        var order = getOrderById(row.dataset.orderId);
        var haystack = normalize([
          row.dataset.orderId,
          row.textContent,
          order ? order.client : "",
          order ? order.phone : "",
          order ? order.type : ""
        ].join(" "));
        var matches = !normalizedQuery || haystack.indexOf(normalizedQuery) !== -1;
        row.style.display = matches ? "" : "none";
        if (matches) {
          visibleCount += 1;
        }
      });

      emptyState.hidden = visibleCount > 0;
      updateUrlParam("q", query.trim());

      var currentSelection = document.querySelector(".izzimenu-admin-order-row.is-selected");
      if (!currentSelection || currentSelection.style.display === "none") {
        var firstVisible = getVisibleRows()[0];
        if (firstVisible) {
          selectOrder(firstVisible.dataset.orderId);
        }
      }
    }

    window.__izzimenuApplyOrderSearch = applyOrderSearch;

    var urlState = new URL(window.location.href);
    var requestedQuery = urlState.searchParams.get("q") || "";
    var requestedOrder = urlState.searchParams.get("order") || "483";

    applyOrderSearch(requestedQuery);

    var selectedRow = orderRows.find(function (row) {
      return row.dataset.orderId === requestedOrder && row.style.display !== "none";
    }) || getVisibleRows()[0];

    if (selectedRow) {
      selectOrder(selectedRow.dataset.orderId);
    }
  }

  function setupAdminSearch() {
    var searchInput = document.querySelector(".izzimenu-admin-search input");
    if (!searchInput) {
      return;
    }

    var queryParam = new URL(window.location.href).searchParams.get("q") || "";
    searchInput.value = queryParam;

    searchInput.addEventListener("input", function () {
      if (currentPath === "/admin/pedidos.html" && typeof window.__izzimenuApplyOrderSearch === "function") {
        window.__izzimenuApplyOrderSearch(searchInput.value);
      }
    });

    searchInput.addEventListener("keydown", function (event) {
      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();
      var query = searchInput.value.trim();

      if (currentPath === "/admin/pedidos.html" && typeof window.__izzimenuApplyOrderSearch === "function") {
        window.__izzimenuApplyOrderSearch(query);
        return;
      }

      window.location.href = "/admin/pedidos.html?q=" + encodeURIComponent(query);
    });
  }

  function setupAdminNotifications() {
    var topBar = document.querySelector(".izzimenu-admin-topbar");
    var button = document.querySelector('[data-demo-role="notifications-toggle"]');
    if (!topBar || !button) {
      return;
    }

    var panel = document.querySelector(".izzimenu-admin-notifications");
    if (!panel) {
      panel = document.createElement("div");
      panel.className = "izzimenu-admin-popover izzimenu-admin-notifications";
      topBar.appendChild(panel);
    }

    var dot = button.querySelector(".izzimenu-admin-icon-dot");

    function markAllAsRead() {
      var items = getNotifications().map(function (item) {
        item.unread = false;
        return item;
      });
      saveNotifications(items);
      renderNotifications();
    }

    function renderNotifications() {
      var items = getNotifications();
      var unreadCount = items.filter(function (item) {
        return item.unread;
      }).length;

      if (dot) {
        dot.style.display = unreadCount ? "" : "none";
      }

      panel.innerHTML =
        "<div class=\"izzimenu-admin-popover__header\">" +
        "<strong>Notificações da demo</strong>" +
        "<button type=\"button\" data-notification-action=\"read-all\">Marcar tudo como lido</button>" +
        "</div>" +
        "<div class=\"izzimenu-admin-notification-list\">" +
        items.map(function (item) {
          return (
            "<button type=\"button\" class=\"izzimenu-admin-notification-item" + (item.unread ? " is-unread" : "") + "\" data-notification-id=\"" + item.id + "\" data-notification-href=\"" + item.href + "\">" +
            "<strong>" + item.title + "</strong>" +
            "<span>" + item.body + "</span>" +
            "<em>" + item.time + "</em>" +
            "</button>"
          );
        }).join("") +
        "</div>";
    }

    function closePanel() {
      panel.classList.remove("is-open");
      button.classList.remove("is-active");
    }

    if (!button.dataset.bound) {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        panel.classList.toggle("is-open");
        button.classList.toggle("is-active", panel.classList.contains("is-open"));
        renderNotifications();
      });

      panel.addEventListener("click", function (event) {
        var action = event.target.closest("[data-notification-action]");
        if (action) {
          markAllAsRead();
          return;
        }

        var itemButton = event.target.closest("[data-notification-id]");
        if (!itemButton) {
          return;
        }

        var items = getNotifications().map(function (item) {
          if (item.id === itemButton.getAttribute("data-notification-id")) {
            item.unread = false;
          }
          return item;
        });
        saveNotifications(items);
        renderNotifications();
        closePanel();
        window.location.href = itemButton.getAttribute("data-notification-href");
      });

      document.addEventListener("click", function (event) {
        if (!panel.classList.contains("is-open")) {
          return;
        }

        if (panel.contains(event.target) || button.contains(event.target)) {
          return;
        }

        closePanel();
      });

      button.dataset.bound = "true";
    }

    renderNotifications();
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
    setupOrdersDemo();
    setupAdminSearch();
    setupAdminNotifications();
    setupAdminAvatarMenu();
  }

  patchAnchorByText(document.querySelector("aside"));
  patchAnchorByText(document.querySelector("header"));
  patchAnchorByText(document.querySelector("nav.md\\:hidden"));
  patchButtons();
})();
