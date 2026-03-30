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
    { href: "/cardapio.html", label: "Cardápio" },
    { href: "/checkout.html", label: "Finalização" },
    { href: "/admin/dashboard.html", label: "Painel" },
    { href: "/admin/pedidos.html", label: "Pedidos" },
    { href: "/admin/cardapio.html", label: "Cardápio Admin" },
    { href: "/admin/clientes.html", label: "Clientes" },
    { href: "/admin/configuracoes.html", label: "Configurações" }
  ];
  var sidebarStateKey = "izzimenu-admin-sidebar-collapsed";
  var avatarStateKey = "izzimenu-admin-avatar-src";
  var notificationsStateKey = "izzimenu-admin-notifications-v2";
  var ordersStateKey = "izzimenu-demo-orders-v2";
  var cartStateKey = "izzimenu-demo-cart-v2";
  var catalogStateKey = "izzimenu-demo-catalog-v2";
  var customersStateKey = "izzimenu-demo-customers-v2";
  var orderStatusFlow = ["Novo", "Em preparo", "Saiu para entrega", "Concluído", "Cancelado"];
  var defaultDemoOrders = [
    {
      id: "482",
      client: "Ricardo Mendonça",
      phone: "(11) 99832-1122",
      summary: "2 Itens • Entrega em Casa",
      total: 142.5,
      eta: "42 min",
      paymentLabel: "Pago (Online)",
      paymentTone: "paid",
      badgeTone: "soft",
      addressTitle: "Rua das Palmeiras, 88",
      addressLine: "Moema, São Paulo - SP",
      addressNote: "Casa 2 - Portão cinza",
      items: [
        { quantity: 1, name: "Smash Duplo", note: "Sem cebola • Molho à parte", price: 48.9 },
        { quantity: 1, name: "Batata Crinkle Grande", note: "Com cheddar e bacon", price: 26.6 },
        { quantity: 2, name: "Refrigerante Lata", note: "Coca-Cola zero", price: 18 }
      ],
      subtotal: 123.5,
      deliveryFee: 19,
      totalLabel: 142.5,
      status: "Novo",
      type: "Entrega",
      paymentMethod: "Cartão online"
    },
    {
      id: "483",
      client: "Beatriz Silva",
      phone: "(11) 98765-4321",
      summary: "1 Item • Retirada",
      total: 58,
      eta: "12 min",
      paymentLabel: "Pendente",
      paymentTone: "pending",
      badgeTone: "strong",
      addressTitle: "Rua das Amoreiras, 142",
      addressLine: "Jardim Paulista, São Paulo - SP",
      addressNote: "Apt 42B - Tocar interfone",
      items: [
        { quantity: 1, name: "Combo Premium Delivery", note: "Sem cebola • Batata extra crocante", price: 58 }
      ],
      subtotal: 58,
      deliveryFee: 0,
      totalLabel: 58,
      status: "Em preparo",
      type: "Retirada",
      paymentMethod: "Pagamento na entrega"
    },
    {
      id: "484",
      client: "Carlos Eduardo",
      phone: "(11) 99551-7719",
      summary: "4 Itens • Entrega em Casa",
      total: 215.9,
      eta: "5 min",
      paymentLabel: "Pago (Cartão)",
      paymentTone: "paid",
      badgeTone: "soft",
      addressTitle: "Alameda Lorena, 900",
      addressLine: "Jardins, São Paulo - SP",
      addressNote: "Sala comercial - Recepção principal",
      items: [
        { quantity: 2, name: "Cheddar Master", note: "Maionese defumada", price: 77.8 },
        { quantity: 1, name: "Bacon BBQ Special", note: "Sem picles", price: 42 },
        { quantity: 1, name: "Milk-shake de Ovomaltine", note: "500ml", price: 26.1 },
        { quantity: 2, name: "Água sem gás", note: "Gelada", price: 10 }
      ],
      subtotal: 192.9,
      deliveryFee: 23,
      totalLabel: 215.9,
      status: "Saiu para entrega",
      type: "Entrega",
      paymentMethod: "Cartão online"
    }
  ];
  var defaultDemoCatalog = [
    {
      id: "cheddar-master",
      name: "Cheddar Master",
      description: "Hambúrguer de 180g, cheddar cremoso, cebola caramelizada e maionese defumada.",
      details: "Hambúrguer de 180g (blend da casa), cheddar cremoso importado, cebola caramelizada artesanal e maionese defumada no pão brioche amanteigado.",
      price: 38.9,
      category: "Hambúrgueres",
      featured: true,
      active: true,
      soldOut: false,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIuCwGIMEtsggcuxwWCybnehpG0wlJCZSoFX8GvjLikoY8efwzFuAM6Gcfxn1N5FNUDFIK1k__HETll7oHs_7UmM-MwsqbHW0LNPkOTRPUKFyNO9xzqVxHL832xUomeC6FEPoPY6SYyFlXIPSUmwcuGIvKDOqvYMzia-Tf551Y8CVz9g2VITTYtxofTJ5b6qPmasSz9nsSzGkbAGHyY6hO9Qrqf9QwRFgc2SRLa2VrYsmYp7SCpIPBrgyS3Z1WEP1s8CtXHwCDpQ"
    },
    {
      id: "bacon-bbq-special",
      name: "Bacon BBQ Special",
      description: "Hambúrguer angus, bacon crocante, anéis de cebola e molho barbecue artesanal.",
      details: "Pão brioche, burger angus, bacon crocante, onion rings e barbecue artesanal da casa.",
      price: 42,
      category: "Hambúrgueres",
      featured: false,
      active: true,
      soldOut: false,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGgiADQ1QHwVVhA3T74ibfLSi-AbJ4LGYLaeGW6U9QHSVlqYY3Jxq5CeWd81tQnGYPg2tc1OGUT-_9RljI8UaeGGjab49CnaKHcUJjJJjrUaGz8Xyr8w_-pN_V-dnPWSZjr7u_xZKgP8UojUIKLxO2lNz3bdGPjWxI8p9-ncf1cZ7VzWnYswR6wInL2qrufbNe9I3jAWnHlTy401mucllyW0kyvxhlW6BZWSQ6VbClqdYcr70hiRhJ1APRO-VHVOW0-zW7MOOqiA"
    },
    {
      id: "veggie-power",
      name: "Veggie Power",
      description: "Hambúrguer de grão de bico, guacamole, brotos orgânicos e pão integral.",
      details: "Burger vegano com grão de bico, avocado, brotos frescos e maionese vegetal.",
      price: 34.9,
      category: "Hambúrgueres",
      featured: false,
      active: false,
      soldOut: true,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw9eVVsm9NipHwzFBIFRFa14WF3ZT1ILp4okf9-onkiCWy6TEEkOrVCAZj7rphWF53XBLI7Sn18t0IHhPFHtirhucivto02bD9cH5bQocO3BXXK0BaiiSKaYDJjq0Iq9L1tQkukPcXTy3o3FuqVX5r3pSIvrBVX8miVibHVdXZvIjfXBwwrQfowNP2_JVtV49ANc2f7cdECoNQIim8enj_UNFHh74qKBMiB1J-r8zfBZQRypOHGyahdM2hBg_LSrVYerHQdMG9DQ"
    },
    {
      id: "american-classic",
      name: "American Classic",
      description: "Carne 180g, alface americana, tomate fresco, picles e queijo prato.",
      details: "Burger clássico com salada fresca, queijo prato e molho especial.",
      price: 32,
      category: "Hambúrgueres",
      featured: false,
      active: true,
      soldOut: false,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdJj8PQQFNhzugdZbvMGhQ2uoQNVfrtAxKiQ-9cRBrbaudSgEpwbNBuMALigFXYQjrwDWJExl3mSQpZqUalGms-GiUIDBjNj1BbrNNorqKO0jwcL5vRsgyrZZjiMzQnCuRrPY2VH218Ij3OcQAPsurpshjcW_1KEiPXgcWEvRRArk3beJuxVm-SHSWTqSHwXU-nltuZ1sHk23SuO-cncPG4kBGm7x1T99TIpfhKYAUbJgSfKvqEHSudmQypolhzn6PrLV67kYPYw"
    },
    {
      id: "refrigerante-lata",
      name: "Refrigerante Lata",
      description: "Coca-Cola, Guaraná, Fanta.",
      details: "Lata 350ml gelada para acompanhar qualquer pedido.",
      price: 6.5,
      category: "Bebidas",
      featured: false,
      active: true,
      soldOut: false,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "suco-natural",
      name: "Suco Natural",
      description: "Laranja ou limão 300ml.",
      details: "Suco natural preparado na hora, sem conservantes.",
      price: 12,
      category: "Bebidas",
      featured: false,
      active: true,
      soldOut: false,
      image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "batata-crinkle",
      name: "Batata Crinkle Grande",
      description: "Batata crocante com cheddar e bacon.",
      details: "Porção grande com cheddar cremoso e farofa de bacon crocante.",
      price: 26.6,
      category: "Acompanhamentos",
      featured: false,
      active: true,
      soldOut: false,
      image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "brownie-sundae",
      name: "Brownie Sundae",
      description: "Brownie com sorvete de creme e calda quente.",
      details: "Sobremesa gelada para fechar o pedido com ticket mais alto.",
      price: 19.9,
      category: "Sobremesas",
      featured: false,
      active: true,
      soldOut: false,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"
    }
  ];
  var defaultDemoCustomers = [
    {
      id: "juliana-duarte",
      name: "Juliana Duarte",
      phone: "(11) 99832-5521",
      email: "juliana.duarte@email.com",
      ordersCount: 42,
      totalSpent: 1240.5,
      lastOrderLabel: "há 2 dias",
      segment: "recorrente",
      badgeLabel: "Recorrente",
      vip: true,
      address: "Rua Augusta, 520 • Consolação",
      summary: "Alta recorrência",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBH2uAaj0veDsJOpvD_ry5E0XFJWGa2-cvK_OSIMCw6fq8fndsCI3-lE_b4vuqEaPnhSDwAuNKQ6C3aRFmMSX1d22LHYIPdLygzc2A9nIrMrHvqgiw4MBrLlKmn71N9umZiqS-xpgRgflUHd9-ZDbaySGfjHV0lC9dNYaLaJQC2uTQDy50I_d0SiZEtgvh2Y-oG4c7YFHyHq3hEDQ_yVtem86pUzSW-MS-Fh5piKA52SxdHHsFJwdJNhF9_qbz22ETXqS86Y-RuVw",
      initials: "JD",
      history: [
        { id: "8821", status: "Entregue", date: "14 mai", total: 42.5 },
        { id: "8710", status: "Entregue", date: "28 abr", total: 120 }
      ]
    },
    {
      id: "marcos-santana",
      name: "Marcos Santana",
      phone: "(11) 98765-4402",
      email: "marcos.santana@email.com",
      ordersCount: 1,
      totalSpent: 45,
      lastOrderLabel: "há 5 horas",
      segment: "novo",
      badgeLabel: "Novo",
      vip: false,
      address: "Rua Harmonia, 91 • Vila Madalena",
      summary: "Primeiro pedido recente",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
      initials: "MS",
      history: [
        { id: "8942", status: "Em preparo", date: "Hoje", total: 45 }
      ]
    },
    {
      id: "ana-lopes",
      name: "Ana Lopes",
      phone: "(11) 99521-7810",
      email: "ana.lopes@email.com",
      ordersCount: 86,
      totalSpent: 3105.2,
      lastOrderLabel: "ontem",
      segment: "recorrente",
      badgeLabel: "Recorrente",
      vip: true,
      address: "Alameda Santos, 220 • Jardins",
      summary: "Cliente com alto ticket",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
      initials: "AL",
      history: [
        { id: "8808", status: "Entregue", date: "Ontem", total: 88.9 },
        { id: "8754", status: "Entregue", date: "26 abr", total: 64.4 }
      ]
    },
    {
      id: "renato-horta",
      name: "Renato Horta",
      phone: "(11) 98911-2200",
      email: "renato.horta@email.com",
      ordersCount: 12,
      totalSpent: 412,
      lastOrderLabel: "há 3 meses",
      segment: "inativo",
      badgeLabel: "Inativo",
      vip: false,
      address: "Rua Cotovia, 18 • Moema",
      summary: "Cliente parado para reativação",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
      initials: "RH",
      history: [
        { id: "8201", status: "Entregue", date: "12 jan", total: 52 },
        { id: "8114", status: "Entregue", date: "03 jan", total: 36.9 }
      ]
    }
  ];
  var demoOrders = [];
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

  function isPrimaryActionLabel(label) {
    return [
      /\bnovo\s+\w+/,
      /\bnova\s+\w+/,
      /salvar alteracoes/,
      /ver pedidos/,
      /finalizar pedido/,
      /confirmar pedido/
    ].some(function (pattern) {
      return pattern.test(label);
    });
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
    document.querySelectorAll("button, a").forEach(function (element) {
      var label = normalize(element.textContent || element.getAttribute("aria-label") || "");
      if (isPrimaryActionLabel(label)) {
        element.classList.add("izzimenu-demo-cta");
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

  function cloneData(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function formatMoney(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(Number(value || 0));
  }

  function formatDeliveryFee(value) {
    return Number(value || 0) > 0 ? formatMoney(value) : "Grátis";
  }

  function parseMoney(value) {
    if (typeof value === "number") {
      return value;
    }

    return Number(String(value || "")
      .replace(/[^\d,-]/g, "")
      .replace(/\./g, "")
      .replace(",", ".")) || 0;
  }

  function slugify(text) {
    return normalize(text).replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  }

  function getToastStack() {
    var stack = document.querySelector(".izzimenu-demo-toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "izzimenu-demo-toast-stack";
      document.body.appendChild(stack);
    }

    return stack;
  }

  function showDemoToast(title, body, tone) {
    var toast = document.createElement("div");
    toast.className = "izzimenu-demo-toast" + (tone ? " izzimenu-demo-toast--" + tone : "");
    toast.innerHTML = "<strong>" + title + "</strong><span>" + body + "</span>";
    getToastStack().appendChild(toast);

    window.requestAnimationFrame(function () {
      toast.classList.add("is-visible");
    });

    window.setTimeout(function () {
      toast.classList.remove("is-visible");
      window.setTimeout(function () {
        toast.remove();
      }, 220);
    }, 3200);
  }

  function getShortTimestamp() {
    return "Hoje, " + new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date());
  }

  function getDemoOrders() {
    var items = readJsonState(ordersStateKey, null);
    if (!Array.isArray(items) || !items.length || !items[0].id || !Array.isArray(items[0].items)) {
      items = cloneData(defaultDemoOrders);
      writeJsonState(ordersStateKey, items);
    }

    demoOrders = cloneData(items);
    return demoOrders;
  }

  function saveDemoOrders(items) {
    demoOrders = cloneData(items);
    writeJsonState(ordersStateKey, demoOrders);
  }

  function getDemoCatalog() {
    var items = readJsonState(catalogStateKey, null);
    if (!Array.isArray(items) || !items.length || !items[0].id || !items[0].category) {
      items = cloneData(defaultDemoCatalog);
      writeJsonState(catalogStateKey, items);
    }

    return cloneData(items);
  }

  function saveDemoCatalog(items) {
    writeJsonState(catalogStateKey, cloneData(items));
  }

  function getDemoCustomers() {
    var items = readJsonState(customersStateKey, null);
    if (!Array.isArray(items) || !items.length || !items[0].id || !items[0].phone) {
      items = cloneData(defaultDemoCustomers);
      writeJsonState(customersStateKey, items);
    }

    return cloneData(items);
  }

  function saveDemoCustomers(items) {
    writeJsonState(customersStateKey, cloneData(items));
  }

  function getDemoCart() {
    var items = readJsonState(cartStateKey, []);
    return Array.isArray(items) ? items : [];
  }

  function saveDemoCart(items) {
    writeJsonState(cartStateKey, Array.isArray(items) ? items : []);
  }

  function clearDemoCart() {
    saveDemoCart([]);
  }

  function getProductById(productId) {
    return getDemoCatalog().find(function (product) {
      return product.id === productId;
    }) || null;
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
      items = cloneData(defaultNotifications);
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

  function prependNotification(notification) {
    var items = [notification].concat(getNotifications()).slice(0, 12);
    saveNotifications(items);
  }

  function getNextOrderId() {
    return String(getDemoOrders().reduce(function (maxValue, order) {
      return Math.max(maxValue, Number(order.id || 0));
    }, 480) + 1);
  }

  function getOrderById(orderId) {
    return getDemoOrders().find(function (order) {
      return order.id === orderId;
    }) || null;
  }

  function upsertCustomerFromOrder(order, formData) {
    var customers = getDemoCustomers();
    var normalizedPhone = normalize(formData.phone);
    var existingCustomer = customers.find(function (customer) {
      return normalize(customer.phone) === normalizedPhone || normalize(customer.email) === normalize(formData.email);
    });

    if (existingCustomer) {
      existingCustomer.name = formData.name;
      existingCustomer.phone = formData.phone;
      existingCustomer.email = formData.email;
      existingCustomer.ordersCount += 1;
      existingCustomer.totalSpent = Number(existingCustomer.totalSpent || 0) + Number(order.total || 0);
      existingCustomer.lastOrderLabel = "agora";
      existingCustomer.segment = existingCustomer.ordersCount > 1 ? "recorrente" : "novo";
      existingCustomer.badgeLabel = existingCustomer.segment === "recorrente" ? "Recorrente" : "Novo";
      existingCustomer.summary = existingCustomer.segment === "recorrente" ? "Cliente com retorno recente" : "Novo cliente em onboarding";
      existingCustomer.address = formData.address + (formData.reference ? " • " + formData.reference : "");
      existingCustomer.history.unshift({
        id: order.id,
        status: order.status,
        date: "Hoje",
        total: order.total
      });
      existingCustomer.history = existingCustomer.history.slice(0, 4);
    } else {
      customers.unshift({
        id: slugify(formData.name || "cliente-demo"),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        ordersCount: 1,
        totalSpent: order.total,
        lastOrderLabel: "agora",
        segment: "novo",
        badgeLabel: "Novo",
        vip: false,
        address: formData.address + (formData.reference ? " • " + formData.reference : ""),
        summary: "Cliente criado pela demo do checkout",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
        initials: (formData.name || "CD").split(" ").slice(0, 2).map(function (part) {
          return part.charAt(0).toUpperCase();
        }).join("").slice(0, 2),
        history: [
          { id: order.id, status: order.status, date: "Hoje", total: order.total }
        ]
      });
    }

    saveDemoCustomers(customers);
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

    topBar.className = "izzimenu-admin-topbar sticky top-0 z-30 flex justify-between items-center w-full px-8 h-10";

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

    var storeButton = Array.from(rightGroup.children).find(function (child) {
      return child.dataset && child.dataset.demoRole === "view-store";
    });

    if (!storeButton) {
      storeButton = document.createElement("a");
    }

    storeButton.className = "izzimenu-admin-store-btn hidden sm:inline-flex";
    storeButton.dataset.demoRole = "view-store";
    storeButton.href = "/cardapio.html";
    storeButton.innerHTML =
      "<span class=\"material-symbols-outlined\">storefront</span>" +
      "<span>Ver Loja</span>";

    rightGroup.insertBefore(storeButton, notificationButton);

    Array.from(rightGroup.children).forEach(function (child) {
      if (child === searchWrapper || child === storeButton || child === notificationButton) {
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

  function getOrderFilterValue(label) {
    return normalize(label || "").replace("concluido", "concluido");
  }

  function matchesOrderFilter(order, activeFilter) {
    if (!activeFilter || activeFilter === "todos") {
      return true;
    }

    return normalize(order.status) === activeFilter;
  }

  function getOrderEtaToneClass(order) {
    if (normalize(order.status) === "novo") {
      return "bg-error-container/20 text-error";
    }

    return "bg-secondary-container/30 text-secondary";
  }

  function renderOrderRow(order, selectedOrderId) {
    var isSelected = selectedOrderId === order.id;
    return (
      "<div class=\"grid grid-cols-6 items-center px-6 py-5 " + (isSelected ? "bg-surface-container-low border-l-4 border-primary" : "bg-surface-container-lowest") + " hover:bg-surface-container-low transition-colors group cursor-pointer izzimenu-admin-order-row" + (isSelected ? " is-selected" : "") + "\" data-order-id=\"" + order.id + "\">" +
      "<div class=\"col-span-2 flex items-center gap-4\">" +
      "<div class=\"w-10 h-10 rounded " + (isSelected ? "bg-primary text-on-primary" : "bg-primary-container text-primary") + " flex items-center justify-center font-bold text-xs shadow-sm\">#" + order.id + "</div>" +
      "<div>" +
      "<p class=\"font-bold text-on-surface\">" + order.client + "</p>" +
      "<p class=\"text-xs text-on-surface-variant\">" + order.summary + "</p>" +
      "</div>" +
      "</div>" +
      "<div class=\"text-center\"><p class=\"font-bold text-on-surface\">" + formatMoney(order.total) + "</p></div>" +
      "<div class=\"text-center\"><div class=\"inline-flex items-center gap-1.5 px-2 py-1 rounded-full font-bold text-[10px] " + getOrderEtaToneClass(order) + "\"><span class=\"material-symbols-outlined text-sm\">schedule</span>" + order.eta + "</div></div>" +
      "<div class=\"text-center\"><span class=\"px-2.5 py-1 rounded text-[10px] font-black uppercase " + getPaymentBadgeClass(order) + "\">" + order.paymentLabel + "</span></div>" +
      "<div class=\"text-right\"><button class=\"p-2 rounded bg-surface-container hover:bg-primary hover:text-on-primary transition-all\" type=\"button\" data-order-id=\"" + order.id + "\" data-order-action=\"focus\"><span class=\"material-symbols-outlined text-lg\">more_vert</span></button></div>" +
      "</div>"
    );
  }

  function renderOrderDetail(order) {
    var detailAside = Array.from(document.querySelectorAll("main aside")).find(function (element) {
      return !element.classList.contains("izzimenu-admin-sidebar");
    });

    if (!detailAside) {
      return;
    }

    detailAside.classList.add("izzimenu-admin-order-detail");

    if (!order) {
      detailAside.innerHTML =
        "<div class=\"p-6\"><strong class=\"block text-lg font-headline font-extrabold text-on-surface\">Selecione um pedido</strong><span class=\"mt-2 block text-sm text-on-surface-variant\">A lista ao lado continua navegável e a demo reage como um painel real.</span></div>";
      return;
    }

    var phoneDigits = String(order.phone || "").replace(/\D+/g, "");
    detailAside.innerHTML =
      "<div class=\"p-6 border-b border-surface-container\">" +
      "<div class=\"flex items-center justify-between mb-4\">" +
      "<span class=\"px-3 py-1 rounded bg-primary text-on-primary text-[10px] font-black uppercase tracking-widest\">Pedido #" + order.id + "</span>" +
      "<div class=\"flex gap-2\">" +
      "<button class=\"p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors\" type=\"button\" data-order-action=\"print\"><span class=\"material-symbols-outlined text-xl\">print</span></button>" +
      "<button class=\"p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors\" type=\"button\" data-order-action=\"close\"><span class=\"material-symbols-outlined text-xl\">close</span></button>" +
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
          "<span class=\"font-bold\">" + formatMoney(item.price) + "</span>" +
          "</div>"
        );
      }).join("") +
      "</div>" +
      "</section>" +
      "<section class=\"pt-6 border-t border-surface-container space-y-2 text-sm\">" +
      "<div class=\"flex justify-between\"><span class=\"text-on-surface-variant\">Subtotal</span><span class=\"font-bold\">" + formatMoney(order.subtotal) + "</span></div>" +
      "<div class=\"flex justify-between\"><span class=\"text-on-surface-variant\">Taxa de entrega</span><span class=\"font-bold\">" + formatDeliveryFee(order.deliveryFee) + "</span></div>" +
      "<div class=\"flex justify-between\"><span class=\"text-on-surface-variant\">Forma de pagamento</span><span class=\"font-bold\">" + order.paymentMethod + "</span></div>" +
      "<div class=\"flex justify-between text-base pt-2\"><span class=\"font-bold\">Total</span><span class=\"font-black\">" + formatMoney(order.totalLabel || order.total) + "</span></div>" +
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
      "<section class=\"space-y-3\">" +
      "<div class=\"flex items-center justify-between\">" +
      "<p class=\"text-[10px] uppercase font-black tracking-widest text-on-surface-variant\">Atualizar status</p>" +
      "<span class=\"text-[10px] font-bold uppercase tracking-wider text-on-surface-variant\">Modo demo</span>" +
      "</div>" +
      "<div class=\"flex flex-wrap gap-2\">" +
      orderStatusFlow.map(function (status) {
        var isActive = normalize(status) === normalize(order.status);
        return "<button type=\"button\" class=\"" + (isActive ? "bg-primary text-on-primary" : "bg-surface-container-low text-on-surface") + " px-3 py-2 rounded-full text-xs font-bold transition-colors\" data-order-action=\"status\" data-order-status=\"" + status + "\">" + status + "</button>";
      }).join("") +
      "</div>" +
      "<p class=\"text-xs text-on-surface-variant\">As mudanças são aplicadas só nesta demo, para apresentar o fluxo operacional.</p>" +
      "</section>" +
      "<section class=\"pt-2\">" +
      "<a class=\"inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-outline-variant/20 text-sm font-bold text-on-surface hover:bg-surface-container-low transition-colors\" href=\"https://wa.me/55" + phoneDigits + "?text=" + encodeURIComponent("Olá, " + order.client + "! Seu pedido #" + order.id + " está em " + order.status + ".") + "\" target=\"_blank\" rel=\"noreferrer\">" +
      "<span class=\"material-symbols-outlined text-base\">chat</span>Chamar no WhatsApp</a>" +
      "</section>" +
      "</div>";
  }

  function setupOrdersDemo() {
    if (currentPath !== "/admin/pedidos.html") {
      return;
    }

    var listRoot = document.querySelector("main .flex-1.w-full.space-y-3");
    if (!listRoot) {
      return;
    }

    var headerRow = listRoot.querySelector(".grid.grid-cols-6");
    if (!headerRow) {
      return;
    }

    var filtersBar = document.querySelector(".lg\\:col-span-3.bg-surface-container-low");
    var filterButtons = filtersBar ? Array.from(filtersBar.querySelectorAll("button")) : [];
    var selectedOrderId = null;
    var activeFilter = "todos";
    var activeQuery = "";

    function getFilteredOrders() {
      return getDemoOrders()
        .slice()
        .sort(function (left, right) {
          return Number(right.id) - Number(left.id);
        })
        .filter(function (order) {
          if (!matchesOrderFilter(order, activeFilter)) {
            return false;
          }

          if (!activeQuery) {
            return true;
          }

          return normalize([
            order.id,
            order.client,
            order.phone,
            order.summary,
            order.type,
            order.status,
            order.paymentMethod
          ].join(" ")).indexOf(normalize(activeQuery)) !== -1;
        });
    }

    function renderRows() {
      var orders = getFilteredOrders();
      var rowsMarkup = orders.map(function (order) {
        return renderOrderRow(order, selectedOrderId);
      }).join("");

      listRoot.innerHTML =
        headerRow.outerHTML +
        rowsMarkup +
        "<div class=\"izzimenu-admin-orders-empty\"" + (orders.length ? " hidden" : "") + ">" +
        "<strong>Nenhum pedido encontrado</strong>" +
        "<span>Tente buscar por número do pedido, cliente, status ou forma de entrega.</span>" +
        "</div>";

      if (!orders.length) {
        renderOrderDetail(null);
        updateUrlParam("order", "");
      }
    }

    function renderFilterState() {
      filterButtons.forEach(function (button) {
        var isActive = getOrderFilterValue(button.textContent) === activeFilter;
        button.className = (isActive
          ? "flex-1 px-4 py-2.5 text-sm font-bold bg-white text-on-surface rounded-lg shadow-sm whitespace-nowrap"
          : "flex-1 px-4 py-2.5 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors whitespace-nowrap");
      });
    }

    function selectOrder(orderId) {
      var order = getOrderById(orderId);
      if (!order) {
        return;
      }

      selectedOrderId = order.id;
      renderRows();
      renderFilterState();
      renderOrderDetail(order);
      updateUrlParam("order", order.id);
    }

    function applyOrderSearch(query) {
      activeQuery = query.trim();
      updateUrlParam("q", activeQuery);
      renderRows();
      renderFilterState();

      var visibleOrders = getFilteredOrders();
      if (!visibleOrders.length) {
        selectedOrderId = null;
        return;
      }

      var stillVisible = visibleOrders.some(function (order) {
        return order.id === selectedOrderId;
      });

      if (!stillVisible) {
        selectOrder(visibleOrders[0].id);
      } else {
        renderOrderDetail(getOrderById(selectedOrderId));
      }
    }

    function updateOrderStatus(orderId, nextStatus) {
      var orders = getDemoOrders().map(function (order) {
        if (order.id !== orderId) {
          return order;
        }

        order.status = nextStatus;
        if (normalize(nextStatus) === "concluido") {
          order.eta = "Finalizado";
        } else if (normalize(nextStatus) === "cancelado") {
          order.paymentTone = "pending";
          order.paymentLabel = "Cancelado";
        }
        return order;
      });

      saveDemoOrders(orders);
      selectOrder(orderId);
      showDemoToast("Status atualizado", "O pedido #" + orderId + " agora está como " + nextStatus + ".", "success");
    }

    listRoot.addEventListener("click", function (event) {
      var actionButton = event.target.closest("[data-order-action]");
      if (actionButton) {
        event.stopPropagation();
      }

      if (actionButton && actionButton.getAttribute("data-order-action") === "focus") {
        selectOrder(actionButton.getAttribute("data-order-id"));
        return;
      }

      var row = event.target.closest("[data-order-id]");
      if (!row) {
        return;
      }

      selectOrder(row.getAttribute("data-order-id"));
    });

    var detailAside = Array.from(document.querySelectorAll("main aside")).find(function (element) {
      return !element.classList.contains("izzimenu-admin-sidebar");
    });

    if (detailAside && !detailAside.dataset.bound) {
      detailAside.addEventListener("click", function (event) {
        var actionButton = event.target.closest("[data-order-action]");
        if (!actionButton) {
          return;
        }

        var action = actionButton.getAttribute("data-order-action");
        if (action === "close") {
          selectedOrderId = null;
          renderRows();
          renderOrderDetail(null);
          updateUrlParam("order", "");
          return;
        }

        if (action === "print") {
          showDemoToast("Impressão simulada", "Na versão final este pedido pode ser enviado para a impressora da cozinha.", "warning");
          return;
        }

        if (action === "status") {
          updateOrderStatus(selectedOrderId, actionButton.getAttribute("data-order-status"));
        }
      });

      detailAside.dataset.bound = "true";
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeFilter = getOrderFilterValue(button.textContent);
        renderFilterState();
        applyOrderSearch(activeQuery);
      });
    });

    var dateInput = document.querySelector('input[type="date"]');
    if (dateInput && !dateInput.dataset.bound) {
      dateInput.addEventListener("change", function () {
        showDemoToast("Filtro de data aplicado", "A data foi considerada apenas para demonstração visual do painel.", "warning");
      });
      dateInput.dataset.bound = "true";
    }

    var paymentFilterButton = Array.from(document.querySelectorAll("button")).find(function (button) {
      return normalize(button.textContent).indexOf("pagamento") !== -1;
    });
    if (paymentFilterButton && !paymentFilterButton.dataset.bound) {
      paymentFilterButton.addEventListener("click", function () {
        showDemoToast("Filtro de pagamento", "O agrupamento por pagamento está ilustrado na demo e pode ser aprofundado no clone final.", "warning");
      });
      paymentFilterButton.dataset.bound = "true";
    }

    window.__izzimenuApplyOrderSearch = applyOrderSearch;

    var urlState = new URL(window.location.href);
    activeQuery = urlState.searchParams.get("q") || "";
    selectedOrderId = urlState.searchParams.get("order") || null;

    renderFilterState();
    renderRows();

    var visibleOrders = getFilteredOrders();
    if (!selectedOrderId && visibleOrders.length) {
      selectedOrderId = visibleOrders[0].id;
    }

    if (selectedOrderId) {
      selectOrder(selectedOrderId);
    }

    if (urlState.searchParams.get("demoCreated") === "1") {
      showDemoToast("Pedido criado na demo", "O checkout simulou um novo pedido e o painel já refletiu essa entrada.", "success");
      updateUrlParam("demoCreated", "");
    }
  }

  function setupCustomersDemo() {
    if (currentPath !== "/admin/clientes.html") {
      return;
    }

    var tableBody = document.querySelector("tbody");
    var sidebarColumn = document.querySelector(".xl\\:col-span-4.space-y-8");
    var filterGroup = Array.from(document.querySelectorAll("button")).filter(function (button) {
      return ["todos", "recorrentes", "novos"].indexOf(normalize(button.textContent)) !== -1;
    }).slice(0, 3);
    var searchInput = Array.from(document.querySelectorAll("main input")).find(function (input) {
      return normalize(input.getAttribute("placeholder") || "").indexOf("buscar clientes") !== -1;
    });
    var editorSection = Array.from(document.querySelectorAll("section")).find(function (section) {
      return normalize(section.textContent).indexOf("editor de campanha") !== -1;
    });
    var selectedCustomerId = null;
    var activeSegment = "todos";
    var activeQuery = "";

    if (!tableBody || !sidebarColumn || !editorSection) {
      return;
    }

    function getFilteredCustomers() {
      return getDemoCustomers().filter(function (customer) {
        if (activeSegment === "recorrentes" && customer.segment !== "recorrente") {
          return false;
        }

        if (activeSegment === "novos" && customer.segment !== "novo") {
          return false;
        }

        if (!activeQuery) {
          return true;
        }

        return normalize([
          customer.name,
          customer.phone,
          customer.email,
          customer.summary,
          customer.segment
        ].join(" ")).indexOf(normalize(activeQuery)) !== -1;
      });
    }

    function getCustomerBadgeClass(customer) {
      if (customer.segment === "recorrente") {
        return "bg-primary-container text-on-primary-container";
      }

      if (customer.segment === "novo") {
        return "bg-surface-container-highest text-on-surface-variant";
      }

      return "bg-error-container text-on-error-container";
    }

    function renderCustomerTable() {
      var customers = getFilteredCustomers();

      if (!customers.length) {
        tableBody.innerHTML =
          "<tr><td colspan=\"5\" class=\"px-6 py-10 text-center\">" +
          "<strong class=\"block text-on-surface font-headline text-lg\">Nenhum cliente encontrado</strong>" +
          "<span class=\"mt-2 block text-sm text-on-surface-variant\">Ajuste a busca ou troque o filtro para continuar a demo.</span>" +
          "</td></tr>";
        return;
      }

      tableBody.innerHTML = customers.map(function (customer, index) {
        var isSelected = customer.id === selectedCustomerId;
        return (
          "<tr class=\"" + (index % 2 ? "bg-surface-container-low/20 " : "") + "hover:bg-surface-container-low/50 transition-colors cursor-pointer" + (isSelected ? " bg-primary-container/20" : "") + "\" data-customer-id=\"" + customer.id + "\">" +
          "<td class=\"px-6 py-5\">" +
          "<div class=\"flex items-center gap-3\">" +
          "<div class=\"h-10 w-10 rounded-lg bg-secondary-container flex items-center justify-center text-secondary font-bold\">" + customer.initials + "</div>" +
          "<div><p class=\"font-bold text-on-surface\">" + customer.name + "</p><p class=\"text-xs text-on-surface-variant\">" + customer.phone + "</p></div>" +
          "</div>" +
          "</td>" +
          "<td class=\"px-6 py-5 font-semibold text-on-surface\">" + customer.ordersCount + "</td>" +
          "<td class=\"px-6 py-5 font-bold text-on-surface\">" + formatMoney(customer.totalSpent) + "</td>" +
          "<td class=\"px-6 py-5 text-sm text-on-surface-variant\">" + customer.lastOrderLabel + "</td>" +
          "<td class=\"px-6 py-5\"><span class=\"px-3 py-1 text-[10px] font-black uppercase rounded-full " + getCustomerBadgeClass(customer) + "\">" + customer.badgeLabel + "</span></td>" +
          "</tr>"
        );
      }).join("");
    }

    function renderCustomerSidebar(customer) {
      if (!customer) {
        return;
      }

      sidebarColumn.innerHTML =
        "<div class=\"bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 shadow-sm\">" +
        "<div class=\"flex items-start justify-between mb-6\">" +
        "<h3 class=\"text-lg font-bold\">Perfil do Cliente</h3>" +
        "<button class=\"text-on-surface-variant hover:text-on-surface\" type=\"button\" data-customer-action=\"open-orders\"><span class=\"material-symbols-outlined\">open_in_new</span></button>" +
        "</div>" +
        "<div class=\"text-center mb-6\">" +
        "<div class=\"h-20 w-20 rounded-full bg-white border-4 border-white shadow-sm mx-auto overflow-hidden\"><img alt=\"Cliente\" src=\"" + customer.avatar + "\" /></div>" +
        "<h4 class=\"text-xl font-extrabold mt-3\">" + customer.name + "</h4>" +
        "<span class=\"inline-block px-3 py-1 mt-1 " + (customer.vip ? "bg-tertiary text-on-tertiary" : "bg-surface-container-high text-on-surface") + " text-[10px] font-bold rounded uppercase\">" + (customer.vip ? "Cliente VIP" : "Base ativa") + "</span>" +
        "</div>" +
        "<div class=\"space-y-4 text-sm\">" +
        "<div class=\"flex justify-between gap-4 p-3 bg-white/50 rounded-lg\"><span class=\"text-on-surface-variant font-medium\">Endereço principal</span><span class=\"text-on-surface font-bold text-right\">" + customer.address + "</span></div>" +
        "<div class=\"flex justify-between gap-4 p-3 bg-white/50 rounded-lg\"><span class=\"text-on-surface-variant font-medium\">Segmento</span><span class=\"text-on-surface font-bold\">" + customer.summary + "</span></div>" +
        "<div class=\"flex justify-between gap-4 p-3 bg-white/50 rounded-lg\"><span class=\"text-on-surface-variant font-medium\">Contato</span><span class=\"text-on-surface font-bold text-right\">" + customer.email + "</span></div>" +
        "<div class=\"pt-4\">" +
        "<p class=\"text-xs font-bold uppercase text-on-surface-variant mb-3\">Histórico de pedidos</p>" +
        "<div class=\"space-y-2\">" +
        customer.history.map(function (entry) {
          return "<div class=\"flex items-center gap-3 text-xs p-2 hover:bg-white rounded transition-colors\"><span class=\"material-symbols-outlined text-primary\">package_2</span><div class=\"flex-1\"><p class=\"font-bold\">Pedido #" + entry.id + "</p><p class=\"text-on-surface-variant\">" + entry.status + " • " + entry.date + "</p></div><span class=\"font-bold\">" + formatMoney(entry.total) + "</span></div>";
        }).join("") +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class=\"bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10\">" +
        "<div class=\"flex items-center justify-between mb-6\"><h3 class=\"font-bold text-on-surface\">Campanhas</h3><button class=\"text-xs font-bold text-primary flex items-center gap-1\" type=\"button\" data-customer-action=\"new-campaign\">Nova Campanha <span class=\"material-symbols-outlined text-sm\">add</span></button></div>" +
        "<div class=\"space-y-4\">" +
        "<div class=\"border-l-4 border-primary pl-4 py-1\"><p class=\"text-xs font-bold text-on-surface-variant\">Última semana</p><p class=\"font-bold text-sm\">Campanha de recompra para " + customer.name + "</p><div class=\"flex gap-4 mt-2\"><div><p class=\"text-[10px] text-on-surface-variant uppercase font-bold\">Taxa de abertura</p><p class=\"text-sm font-black text-primary\">" + (customer.segment === "recorrente" ? "42.8%" : "31.4%") + "</p></div><div><p class=\"text-[10px] text-on-surface-variant uppercase font-bold\">Cliques</p><p class=\"text-sm font-black text-secondary\">" + (customer.segment === "recorrente" ? "1.2k" : "842") + "</p></div></div></div>" +
        "<div class=\"border-l-4 border-surface-container-highest pl-4 py-1\"><p class=\"text-xs font-bold text-on-surface-variant\">Próxima oportunidade</p><p class=\"font-bold text-sm\">" + (customer.segment === "inativo" ? "Reativação com cupom exclusivo" : "Cross-sell de sobremesas e bebidas") + "</p><p class=\"mt-2 text-xs text-on-surface-variant\">Use o editor abaixo para simular o disparo desta campanha.</p></div>" +
        "</div>" +
        "</div>";
    }

    function selectCustomer(customerId) {
      var customer = getDemoCustomers().find(function (item) {
        return item.id === customerId;
      });

      if (!customer) {
        return;
      }

      selectedCustomerId = customer.id;
      renderCustomerTable();
      renderCustomerSidebar(customer);
    }

    tableBody.addEventListener("click", function (event) {
      var row = event.target.closest("[data-customer-id]");
      if (!row) {
        return;
      }

      selectCustomer(row.getAttribute("data-customer-id"));
    });

    filterGroup.forEach(function (button) {
      button.addEventListener("click", function () {
        activeSegment = normalize(button.textContent);
        filterGroup.forEach(function (item) {
          item.className = item === button
            ? "px-4 py-1.5 rounded-md bg-surface-container-lowest shadow-sm text-sm font-bold text-on-surface"
            : "px-4 py-1.5 rounded-md text-sm font-medium text-on-surface-variant hover:text-on-surface";
        });
        renderCustomerTable();

        var visibleCustomers = getFilteredCustomers();
        if (!visibleCustomers.some(function (customer) { return customer.id === selectedCustomerId; })) {
          selectCustomer(visibleCustomers[0] ? visibleCustomers[0].id : null);
        }
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        activeQuery = searchInput.value.trim();
        renderCustomerTable();

        var visibleCustomers = getFilteredCustomers();
        if (!visibleCustomers.some(function (customer) { return customer.id === selectedCustomerId; })) {
          selectCustomer(visibleCustomers[0] ? visibleCustomers[0].id : null);
        }
      });
    }

    sidebarColumn.addEventListener("click", function (event) {
      var actionButton = event.target.closest("[data-customer-action]");
      if (!actionButton) {
        return;
      }

      if (actionButton.getAttribute("data-customer-action") === "open-orders") {
        var currentCustomer = getDemoCustomers().find(function (item) {
          return item.id === selectedCustomerId;
        });
        if (currentCustomer) {
          window.location.href = "/admin/pedidos.html?q=" + encodeURIComponent(currentCustomer.name);
        }
      }

      if (actionButton.getAttribute("data-customer-action") === "new-campaign") {
        var campaignInput = editorSection.querySelector("input[type='text']");
        if (campaignInput) {
          campaignInput.value = "Campanha para " + (getDemoCustomers().find(function (item) { return item.id === selectedCustomerId; }) || { name: "clientes ativos" }).name;
        }
        showDemoToast("Campanha preparada", "Você pode seguir com a prévia ou envio simulado logo abaixo.", "success");
      }
    });

    var editorInput = editorSection.querySelector("input[type='text']");
    var editorSelect = editorSection.querySelector("select");
    var editorTextarea = editorSection.querySelector("textarea");
    var previewButton = Array.from(editorSection.querySelectorAll("button")).find(function (button) {
      return normalize(button.textContent).indexOf("previa") !== -1;
    });
    var sendButton = Array.from(editorSection.querySelectorAll("button")).find(function (button) {
      return normalize(button.textContent).indexOf("enviar agora") !== -1;
    });

    if (previewButton) {
      previewButton.addEventListener("click", function () {
        showDemoToast("Prévia pronta", "Assunto: " + (editorInput ? editorInput.value : "Campanha demo") + ".", "success");
      });
    }

    if (sendButton) {
      sendButton.addEventListener("click", function () {
        var recipients = getFilteredCustomers().length || getDemoCustomers().length;
        prependNotification({
          id: "campaign-" + Date.now(),
          title: "Campanha simulada enviada",
          body: (editorInput ? editorInput.value : "Campanha demo") + " foi disparada para " + recipients + " contatos na demo.",
          time: getShortTimestamp(),
          href: "/admin/clientes.html",
          unread: true
        });
        showDemoToast("Envio simulado", "Nenhum e-mail real foi disparado. A demo registrou o envio para " + recipients + " clientes.", "warning");
      });
    }

    Array.from(document.querySelectorAll("button")).forEach(function (button) {
      var label = normalize(button.textContent);
      if (/baixar relatorio|ver relatorios/.test(label) && !button.dataset.bound) {
        button.addEventListener("click", function () {
          showDemoToast("Relatório demo", "Os dados estão prontos para navegação comercial, sem exportação real nesta versão.", "warning");
        });
        button.dataset.bound = "true";
      }
    });

    if (editorSelect && editorTextarea && editorInput && !editorSection.dataset.bound) {
      editorSelect.addEventListener("change", function () {
        showDemoToast("Segmentação ajustada", "A campanha agora foca em " + editorSelect.value.toLowerCase() + ".", "success");
      });

      editorTextarea.addEventListener("focus", function () {
        var currentCustomer = getDemoCustomers().find(function (item) {
          return item.id === selectedCustomerId;
        });
        if (currentCustomer && editorTextarea.value.indexOf(currentCustomer.name) === -1) {
          editorTextarea.value = "Olá, " + currentCustomer.name + ",\n\nparamos um incentivo especial para seu próximo pedido aqui no IzziMenu.\n\nUse o cupom DEMO20 para visualizar o fluxo completo da campanha.\n\nEquipe IzziMenu";
        }
      });

      editorSection.dataset.bound = "true";
    }

    var initialCustomers = getFilteredCustomers();
    if (initialCustomers.length) {
      selectCustomer(initialCustomers[0].id);
    } else {
      renderCustomerTable();
    }
  }

  function setupCatalogDemo() {
    if (currentPath !== "/admin/cardapio.html") {
      return;
    }

    var categoryCard = Array.from(document.querySelectorAll("main .bg-surface-container-low.rounded-xl")).find(function (card) {
      return normalize(card.textContent).indexOf("categorias") !== -1;
    });
    var productPanel = document.querySelector(".md\\:col-span-3.space-y-4");
    var editorSection = document.querySelector(".mt-20.bg-surface-container-lowest");
    var selectedCategory = "Hambúrgueres";
    var selectedProductId = null;
    var draftProduct = null;
    var editorFocusTimeoutId = null;

    if (!categoryCard || !productPanel || !editorSection) {
      return;
    }

    function getCategories(catalog) {
      var orderedNames = ["Hambúrgueres", "Bebidas", "Acompanhamentos", "Sobremesas"];
      var categories = [];
      catalog.forEach(function (product) {
        if (categories.indexOf(product.category) === -1) {
          categories.push(product.category);
        }
      });

      return orderedNames.filter(function (name) {
        return categories.indexOf(name) !== -1;
      }).concat(categories.filter(function (name) {
        return orderedNames.indexOf(name) === -1;
      }));
    }

    function getSelectedProduct(catalog) {
      return catalog.find(function (product) {
        return product.id === selectedProductId;
      }) || null;
    }

    function renderCategories() {
      var catalog = getDemoCatalog();
      var categories = getCategories(catalog);
      var panelBody = categoryCard.querySelector(".space-y-2");
      if (!panelBody) {
        return;
      }

      panelBody.innerHTML = categories.map(function (category) {
        var count = catalog.filter(function (product) {
          return product.category === category;
        }).length;
        var isActive = category === selectedCategory;
        return (
          "<button type=\"button\" class=\"w-full flex justify-between items-center p-3 rounded-lg text-sm transition-colors " + (isActive ? "bg-surface-container-lowest shadow-sm font-semibold text-primary" : "hover:bg-surface-container-highest font-medium text-on-surface-variant") + "\" data-catalog-category=\"" + category + "\">" +
          category + " <span class=\"" + (isActive ? "bg-primary-container text-on-primary-container" : "bg-surface-container-highest text-on-surface-variant") + " px-2 py-0.5 rounded-full text-[10px]\">" + count + "</span></button>"
        );
      }).join("");
    }

    function renderProducts() {
      var catalog = getDemoCatalog();
      var products = catalog.filter(function (product) {
        return product.category === selectedCategory;
      });

      productPanel.innerHTML =
        "<div class=\"flex items-center justify-between px-4 pb-2\">" +
        "<div class=\"flex items-center gap-4\"><span class=\"text-sm font-bold text-on-surface\">" + selectedCategory + "</span><span class=\"text-xs text-on-surface-variant\">Fluxo totalmente navegável na demo</span></div>" +
        "<div class=\"flex items-center gap-2 text-xs text-on-surface-variant font-medium\"><span>Exibindo " + products.length + " produto(s)</span></div>" +
        "</div>" +
        (products.length ? products.map(function (product) {
          return (
            "<div class=\"group flex items-center " + (product.active ? "bg-surface-container-lowest shadow-[0_4px_12px_rgba(42,52,57,0.04)] hover:shadow-[0_12px_32px_-4px_rgba(42,52,57,0.08)]" : "bg-surface-container-low/50 border border-dashed border-outline-variant/30") + " p-4 rounded-xl transition-all" + (product.id === selectedProductId ? " ring-2 ring-primary/20" : "") + "\" data-catalog-product=\"" + product.id + "\">" +
            "<div class=\"drag-handle px-2 text-outline-variant\"><span class=\"material-symbols-outlined" + (product.active ? "" : " opacity-30") + "\">drag_indicator</span></div>" +
            "<div class=\"relative\"><img class=\"w-16 h-16 rounded-lg object-cover ml-2" + (product.active ? "" : " grayscale opacity-50") + "\" src=\"" + product.image + "\" alt=\"" + product.name + "\" />" +
            (product.soldOut ? "<div class=\"absolute inset-0 flex items-center justify-center ml-2\"><span class=\"bg-surface text-[8px] font-black uppercase px-1 rounded\">Indisponível</span></div>" : "") +
            "</div>" +
            "<div class=\"flex-1 px-6" + (product.active ? "" : " opacity-50") + "\"><div class=\"flex items-center gap-2 mb-1\"><h4 class=\"font-bold text-on-surface\">" + product.name + "</h4>" + (product.featured ? "<span class=\"material-symbols-outlined text-amber-500 text-[18px]\" style=\"font-variation-settings: 'FILL' 1;\">star</span>" : "") + "</div><p class=\"text-xs text-on-surface-variant line-clamp-1\">" + product.description + "</p></div>" +
            "<div class=\"px-6 text-right" + (product.active ? "" : " opacity-50") + "\"><span class=\"block text-sm font-bold text-on-surface\">" + formatMoney(product.price) + "</span><span class=\"text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter\">Preço Base</span></div>" +
            "<div class=\"px-6 border-l border-outline-variant/20 flex flex-col items-center gap-1\"><label class=\"relative inline-flex items-center cursor-pointer\"><input class=\"sr-only peer\" type=\"checkbox\" " + (product.active ? "checked" : "") + " data-catalog-toggle=\"" + product.id + "\" /><div class=\"w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary\"></div></label><span class=\"text-[10px] font-bold text-on-surface-variant uppercase\">" + (product.active ? "Ativo" : "Inativo") + "</span></div>" +
            "<div class=\"flex gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity\">" +
            "<button class=\"p-2 text-outline hover:text-primary transition-colors\" type=\"button\" data-catalog-action=\"edit\" data-product-id=\"" + product.id + "\"><span class=\"material-symbols-outlined\">edit</span></button>" +
            "<button class=\"p-2 text-outline hover:text-primary transition-colors\" type=\"button\" data-catalog-action=\"duplicate\" data-product-id=\"" + product.id + "\"><span class=\"material-symbols-outlined\">content_copy</span></button>" +
            "<button class=\"p-2 text-outline hover:text-error transition-colors\" type=\"button\" data-catalog-action=\"delete\" data-product-id=\"" + product.id + "\"><span class=\"material-symbols-outlined\">delete</span></button>" +
            "</div>" +
            "</div>"
          );
        }).join("") : "<div class=\"bg-surface-container-lowest p-6 rounded-xl shadow-sm\"><div class=\"flex flex-col items-center justify-center py-12 text-center\"><span class=\"material-symbols-outlined text-4xl text-outline-variant mb-4\">inventory_2</span><h5 class=\"font-bold text-on-surface mb-1\">Nenhum produto nesta categoria</h5><p class=\"text-sm text-on-surface-variant mb-6\">Use o botão Novo Produto para criar o primeiro item dessa seção.</p><button type=\"button\" class=\"text-primary font-bold text-sm hover:underline\" data-catalog-action=\"new-product-empty\">Criar produto agora</button></div></div>");
    }

    function syncEditorFields() {
      var catalog = getDemoCatalog();
      var selectedProduct = getSelectedProduct(catalog);
      if (!selectedProduct) {
        return;
      }

      draftProduct = cloneData(selectedProduct);

      var textInputs = editorSection.querySelectorAll("input[type='text']");
      var nameInput = textInputs[0];
      var priceInput = textInputs[1];
      var categorySelect = editorSection.querySelector("select");
      var descriptionInput = editorSection.querySelector("textarea");
      var checkboxes = editorSection.querySelectorAll("input[type='checkbox']");
      var imagePreview = editorSection.querySelector("img");
      var title = editorSection.querySelector("h2");

      if (title) {
        title.textContent = draftProduct.name;
      }
      if (nameInput) {
        nameInput.value = draftProduct.name;
      }
      if (priceInput) {
        priceInput.value = draftProduct.price.toFixed(2).replace(".", ",");
      }
      if (categorySelect) {
        if (!Array.from(categorySelect.options).some(function (option) { return option.value === draftProduct.category; })) {
          var option = document.createElement("option");
          option.value = draftProduct.category;
          option.textContent = draftProduct.category;
          categorySelect.appendChild(option);
        }
        categorySelect.value = draftProduct.category;
      }
      if (descriptionInput) {
        descriptionInput.value = draftProduct.details;
      }
      if (checkboxes[0]) {
        checkboxes[0].checked = draftProduct.active;
      }
      if (checkboxes[1]) {
        checkboxes[1].checked = draftProduct.featured;
      }
      if (imagePreview) {
        imagePreview.src = draftProduct.image;
        imagePreview.alt = draftProduct.name;
      }
    }

    function bringEditorIntoView() {
      if (!editorSection) {
        return;
      }

      var bannerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--izzimenu-demo-banner-height")) || 0;
      var editorTop = editorSection.getBoundingClientRect().top + window.scrollY;
      var targetTop = Math.max(editorTop - bannerHeight - 24, 0);

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });

      editorSection.classList.remove("izzimenu-demo-editor-focus");
      window.requestAnimationFrame(function () {
        editorSection.classList.add("izzimenu-demo-editor-focus");
      });

      if (editorFocusTimeoutId) {
        window.clearTimeout(editorFocusTimeoutId);
      }

      editorFocusTimeoutId = window.setTimeout(function () {
        editorSection.classList.remove("izzimenu-demo-editor-focus");
      }, 1800);
    }

    function persistDraft(message) {
      if (!draftProduct) {
        return;
      }

      var catalog = getDemoCatalog();
      catalog = catalog.map(function (product) {
        return product.id === draftProduct.id ? cloneData(draftProduct) : product;
      });
      saveDemoCatalog(catalog);
      selectedCategory = draftProduct.category;
      renderCategories();
      renderProducts();
      syncEditorFields();
      showDemoToast("Cardápio atualizado", message, "success");
    }

    function createNewProduct(categoryName) {
      var safeCategory = categoryName || selectedCategory;
      var newProduct = {
        id: slugify("novo-produto-" + Date.now()),
        name: "Novo Produto Demo",
        description: "Item criado para simular o fluxo completo do cardápio.",
        details: "Personalize este produto na demo e salve para apresentar o comportamento final ao cliente.",
        price: 29.9,
        category: safeCategory,
        featured: false,
        active: true,
        soldOut: false,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
      };
      var catalog = getDemoCatalog();
      catalog.unshift(newProduct);
      saveDemoCatalog(catalog);
      selectedCategory = safeCategory;
      selectedProductId = newProduct.id;
      renderCategories();
      renderProducts();
      syncEditorFields();
      bringEditorIntoView();
      showDemoToast("Produto criado", "O novo item foi adicionado apenas nesta demo para navegação comercial.", "success");
    }

    categoryCard.addEventListener("click", function (event) {
      var categoryButton = event.target.closest("[data-catalog-category]");
      if (!categoryButton) {
        return;
      }

      selectedCategory = categoryButton.getAttribute("data-catalog-category");
      var firstProduct = getDemoCatalog().find(function (product) {
        return product.category === selectedCategory;
      });
      selectedProductId = firstProduct ? firstProduct.id : null;
      renderCategories();
      renderProducts();
      syncEditorFields();
    });

    productPanel.addEventListener("click", function (event) {
      var productButton = event.target.closest("[data-product-id]");
      if (productButton) {
        var action = productButton.getAttribute("data-catalog-action");
        var productId = productButton.getAttribute("data-product-id");
        var catalog = getDemoCatalog();
        var product = catalog.find(function (item) { return item.id === productId; });

        if (action === "edit") {
          selectedProductId = productId;
          syncEditorFields();
          renderProducts();
          bringEditorIntoView();
          return;
        }

        if (action === "duplicate" && product) {
          var duplicate = cloneData(product);
          duplicate.id = slugify(product.name + "-copy-" + Date.now());
          duplicate.name = product.name + " Copy";
          catalog.unshift(duplicate);
          saveDemoCatalog(catalog);
          selectedProductId = duplicate.id;
          renderCategories();
          renderProducts();
          syncEditorFields();
          bringEditorIntoView();
          showDemoToast("Produto duplicado", "Você acabou de duplicar " + product.name + " na demo.", "success");
          return;
        }

        if (action === "delete" && product) {
          saveDemoCatalog(catalog.filter(function (item) { return item.id !== productId; }));
          var updatedCatalog = getDemoCatalog();
          var nextProduct = updatedCatalog.find(function (item) { return item.category === selectedCategory; }) || updatedCatalog[0] || null;
          selectedCategory = nextProduct ? nextProduct.category : selectedCategory;
          selectedProductId = nextProduct ? nextProduct.id : null;
          renderCategories();
          renderProducts();
          syncEditorFields();
          showDemoToast("Produto removido", product.name + " saiu apenas desta instância da demo.", "warning");
          return;
        }
      }

      var row = event.target.closest("[data-catalog-product]");
      if (row) {
        selectedProductId = row.getAttribute("data-catalog-product");
        syncEditorFields();
        renderProducts();
        bringEditorIntoView();
      }

      var emptyButton = event.target.closest("[data-catalog-action='new-product-empty']");
      if (emptyButton) {
        createNewProduct(selectedCategory);
      }
    });

    productPanel.addEventListener("change", function (event) {
      var toggle = event.target.closest("[data-catalog-toggle]");
      if (!toggle) {
        return;
      }

      var productIdToToggle = toggle.getAttribute("data-catalog-toggle");
      var nextCatalog = getDemoCatalog().map(function (product) {
        if (product.id === productIdToToggle) {
          product.active = !!toggle.checked;
          product.soldOut = !product.active;
        }
        return product;
      });
      saveDemoCatalog(nextCatalog);
      if (selectedProductId === productIdToToggle) {
        syncEditorFields();
      }
      renderProducts();
      showDemoToast("Disponibilidade atualizada", "O status do item foi alterado na demo.", "success");
    });

    var topButtons = Array.from(document.querySelectorAll("button"));
    var newCategoryButton = topButtons.find(function (button) {
      return normalize(button.textContent).indexOf("nova categoria") !== -1;
    });
    var newProductButton = topButtons.find(function (button) {
      return normalize(button.textContent).indexOf("novo produto") !== -1;
    });
    var saveButton = topButtons.find(function (button) {
      return normalize(button.textContent).indexOf("salvar alteracoes") !== -1;
    });
    var discardButton = topButtons.find(function (button) {
      return normalize(button.textContent) === "descartar";
    });
    var addGroupButton = topButtons.find(function (button) {
      return normalize(button.textContent).indexOf("adicionar grupo") !== -1;
    });
    var duplicateEditorButton = topButtons.find(function (button) {
      return normalize(button.textContent).indexOf("duplicar produto") !== -1;
    });
    var deleteEditorButton = topButtons.find(function (button) {
      return normalize(button.textContent).indexOf("excluir do cardapio") !== -1;
    });

    if (newCategoryButton) {
      newCategoryButton.addEventListener("click", function () {
        var newCategory = window.prompt("Nome da nova categoria na demo:", "Lanches especiais");
        if (!newCategory) {
          return;
        }
        selectedCategory = newCategory.trim();
        createNewProduct(selectedCategory);
      });
    }

    if (newProductButton) {
      newProductButton.addEventListener("click", function () {
        createNewProduct(selectedCategory);
      });
    }

    if (saveButton) {
      saveButton.addEventListener("click", function () {
        var textInputs = editorSection.querySelectorAll("input[type='text']");
        var categorySelect = editorSection.querySelector("select");
        var descriptionInput = editorSection.querySelector("textarea");
        var checkboxes = editorSection.querySelectorAll("input[type='checkbox']");

        draftProduct.name = textInputs[0].value.trim() || "Produto sem nome";
        draftProduct.price = parseMoney(textInputs[1].value);
        draftProduct.category = categorySelect.value;
        draftProduct.description = descriptionInput.value.trim().split(".")[0] + ".";
        draftProduct.details = descriptionInput.value.trim();
        draftProduct.active = !!(checkboxes[0] && checkboxes[0].checked);
        draftProduct.featured = !!(checkboxes[1] && checkboxes[1].checked);
        draftProduct.soldOut = !draftProduct.active;
        persistDraft("As mudanças ficaram navegáveis nesta demo e podem ser refinadas no clone final.");
      });
    }

    if (discardButton) {
      discardButton.addEventListener("click", function () {
        syncEditorFields();
        showDemoToast("Alterações descartadas", "O editor voltou para a última versão salva na demo.", "warning");
      });
    }

    if (addGroupButton) {
      addGroupButton.addEventListener("click", function () {
        showDemoToast("Grupo adicional", "Na demo, o cadastro de extras está sinalizado, mas sem um builder completo de opções.", "warning");
      });
    }

    if (duplicateEditorButton) {
      duplicateEditorButton.addEventListener("click", function () {
        var product = getSelectedProduct(getDemoCatalog());
        if (!product) {
          return;
        }
        var catalog = getDemoCatalog();
        var duplicate = cloneData(product);
        duplicate.id = slugify(product.name + "-copy-" + Date.now());
        duplicate.name = product.name + " Copy";
        catalog.unshift(duplicate);
        saveDemoCatalog(catalog);
        selectedProductId = duplicate.id;
        renderCategories();
        renderProducts();
        syncEditorFields();
        bringEditorIntoView();
      });
    }

    if (deleteEditorButton) {
      deleteEditorButton.addEventListener("click", function () {
        var product = getSelectedProduct(getDemoCatalog());
        if (!product) {
          return;
        }
        var catalog = getDemoCatalog().filter(function (item) {
          return item.id !== product.id;
        });
        saveDemoCatalog(catalog);
        var nextProduct = catalog.find(function (item) {
          return item.category === selectedCategory;
        }) || catalog[0] || null;
        selectedProductId = nextProduct ? nextProduct.id : null;
        if (nextProduct) {
          selectedCategory = nextProduct.category;
        }
        renderCategories();
        renderProducts();
        syncEditorFields();
      });
    }

    var initialCatalog = getDemoCatalog();
    selectedProductId = (initialCatalog.find(function (product) {
      return product.category === selectedCategory;
    }) || initialCatalog[0] || {}).id || null;

    renderCategories();
    renderProducts();
    syncEditorFields();
  }

  function getCartTotals(cartItems, paymentMethod) {
    var subtotal = cartItems.reduce(function (sum, item) {
      return sum + Number(item.price || 0) * Number(item.quantity || 0);
    }, 0);
    var deliveryFee = cartItems.length ? 8.9 : 0;
    var discount = normalize(paymentMethod) === "pix online" ? subtotal * 0.05 : 0;
    return {
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      discount: discount,
      total: subtotal + deliveryFee - discount
    };
  }

  function setupPublicCardapioDemo() {
    if (currentPath !== "/cardapio.html") {
      return;
    }

    var searchInput = document.querySelector("main input[placeholder*='Buscar']");
    var categoryButtons = Array.from(document.querySelectorAll("main .sticky nav button"));
    var cartBar = document.querySelector(".fixed.bottom-0 .pointer-events-auto");
    var cartCount = cartBar ? cartBar.querySelector(".absolute.-top-2.-right-2") : null;
    var cartTotal = cartBar ? cartBar.querySelector(".font-bold.text-lg.leading-none") : null;
    var cartButton = cartBar ? Array.from(cartBar.querySelectorAll("button")).find(function (button) {
      return normalize(button.textContent).indexOf("finalizar pedido") !== -1;
    }) : null;
    var topInfoButton = document.querySelector("header button");
    var floatingButtons = Array.from(document.querySelectorAll(".hidden.md\\:flex.fixed button"));
    var activeCategory = normalize(categoryButtons[0] ? categoryButtons[0].textContent : "");

    function getCardElementFromButton(button) {
      var currentElement = button;
      while (currentElement && currentElement !== document.body) {
        if (
          currentElement.tagName === "DIV" &&
          currentElement.querySelector &&
          currentElement.querySelector("h3") &&
          currentElement.querySelector("button")
        ) {
          return currentElement;
        }
        currentElement = currentElement.parentElement;
      }

      return null;
    }

    function getProductCards() {
      var cards = [];
      Array.from(document.querySelectorAll("main section button")).forEach(function (button) {
        var icon = button.querySelector(".material-symbols-outlined");
        var isAddButton = /adicionar/.test(normalize(button.textContent)) || (icon && normalize(icon.textContent) === "add");
        if (!isAddButton) {
          return;
        }

        var card = getCardElementFromButton(button);
        if (!card || cards.indexOf(card) !== -1) {
          return;
        }

        var section = card.closest("section");
        var name = card.querySelector("h3").textContent.trim();
        var matchedProduct = getDemoCatalog().find(function (product) {
          return normalize(product.name) === normalize(name);
        });
        var priceNode = Array.from(card.querySelectorAll("span")).find(function (span) {
          return /R\$/.test(span.textContent);
        });
        card.dataset.productName = name;
        card.dataset.productCategory = matchedProduct ? matchedProduct.category : section.querySelector("h2").textContent.trim();
        card.dataset.productPrice = matchedProduct ? String(matchedProduct.price) : String(parseMoney(priceNode ? priceNode.textContent : "0"));
        card.dataset.productId = matchedProduct ? matchedProduct.id : slugify(name);
        cards.push(card);
      });
      return cards;
    }

    function syncCartBar() {
      var cartItems = getDemoCart();
      var totals = getCartTotals(cartItems, "");
      if (cartCount) {
        cartCount.textContent = cartItems.reduce(function (sum, item) { return sum + Number(item.quantity || 0); }, 0);
      }
      if (cartTotal) {
        cartTotal.textContent = formatMoney(totals.total);
      }
      if (cartButton) {
        cartButton.disabled = !cartItems.length;
        cartButton.classList.toggle("opacity-60", !cartItems.length);
      }
    }

    function addToCartFromCard(card) {
      var catalogProduct = getProductById(card.dataset.productId) || {
        id: card.dataset.productId,
        name: card.dataset.productName,
        price: Number(card.dataset.productPrice || 0),
        description: card.textContent.trim()
      };

      var cartItems = getDemoCart();
      var existingItem = cartItems.find(function (item) {
        return item.productId === catalogProduct.id;
      });

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          productId: catalogProduct.id,
          name: catalogProduct.name,
          price: Number(catalogProduct.price || 0),
          quantity: 1,
          note: catalogProduct.description || "Item demo",
          image: catalogProduct.image || ""
        });
      }

      saveDemoCart(cartItems);
      syncCartBar();
      showDemoToast("Item adicionado", catalogProduct.name + " entrou no carrinho demo.", "success");
    }

    function applyMenuFilters() {
      var query = normalize(searchInput ? searchInput.value : "");
      var visibleBySection = new Map();

      getProductCards().forEach(function (card) {
        var matchesCategory = !activeCategory || activeCategory === "todos" || normalize(card.dataset.productCategory) === activeCategory;
        var matchesQuery = !query || normalize(card.textContent).indexOf(query) !== -1;
        var visible = matchesCategory && matchesQuery;
        card.style.display = visible ? "" : "none";
        var section = card.closest("section");
        visibleBySection.set(section, (visibleBySection.get(section) || 0) + (visible ? 1 : 0));
      });

      visibleBySection.forEach(function (count, section) {
        section.style.display = count ? "" : "none";
      });
    }

    categoryButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        activeCategory = normalize(button.textContent);
        categoryButtons.forEach(function (item) {
          item.className = item === button
            ? "whitespace-nowrap px-6 py-2 rounded-full bg-primary text-on-primary font-semibold text-sm transition-transform active:scale-95"
            : "whitespace-nowrap px-6 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-medium text-sm hover:bg-surface-container-highest transition-colors";
        });
        applyMenuFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyMenuFilters);
    }

    Array.from(document.querySelectorAll("main button")).forEach(function (button) {
      var card = getCardElementFromButton(button);
      if (!card || !card.querySelector("h3") || normalize(button.textContent).indexOf("finalizar pedido") !== -1) {
        return;
      }

      var icon = button.querySelector(".material-symbols-outlined");
      var isAddButton = /adicionar/.test(normalize(button.textContent)) || (icon && normalize(icon.textContent) === "add");
      if (!isAddButton || button.disabled || button.dataset.bound) {
        return;
      }

      button.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        addToCartFromCard(card);
      });
      button.dataset.bound = "true";
    });

    if (cartButton) {
      cartButton.addEventListener("click", function () {
        if (!getDemoCart().length) {
          showDemoToast("Carrinho vazio", "Adicione pelo menos um item para avançar na demo.", "warning");
          return;
        }
        window.location.href = "/checkout.html";
      });
    }

    if (topInfoButton) {
      topInfoButton.addEventListener("click", function () {
        showDemoToast("Loja demo aberta", "A operação está simulada com prazo médio de 35 a 50 minutos.", "warning");
      });
    }

    floatingButtons.forEach(function (button) {
      var icon = button.querySelector(".material-symbols-outlined");
      var iconName = icon ? normalize(icon.textContent) : "";
      if (iconName === "home") {
        button.addEventListener("click", function () {
          window.location.href = "/index.html";
        });
      }
      if (iconName === "favorite") {
        button.addEventListener("click", function () {
          showDemoToast("Favoritos demo", "A lista de favoritos pode ser ligada ao perfil do cliente no clone final.", "warning");
        });
      }
      if (iconName === "receipt_long") {
        button.addEventListener("click", function () {
          window.location.href = "/checkout.html";
        });
      }
    });

    syncCartBar();
    applyMenuFilters();
  }

  function setupCheckoutDemo() {
    if (currentPath !== "/checkout.html") {
      return;
    }

    if (!getDemoCart().length) {
      saveDemoCart([
        { productId: "cheddar-master", name: "Cheddar Master", price: 38.9, quantity: 2, note: "Maionese defumada" },
        { productId: "batata-crinkle", name: "Batata Crinkle Grande", price: 26.6, quantity: 1, note: "Cheddar e bacon" }
      ]);
    }

    var headerButtons = Array.from(document.querySelectorAll("header button"));
    var backButton = headerButtons[0];
    var inputs = Array.from(document.querySelectorAll("main input"));
    var nameInput = inputs[0];
    var phoneInput = inputs[1];
    var emailInput = inputs[2];
    var addressInput = inputs[3];
    var paymentInputs = Array.from(document.querySelectorAll("input[name='payment']"));
    var summaryCard = document.querySelector(".bg-on-surface.text-surface.rounded-2xl");
    var couponButton = Array.from(document.querySelectorAll("button")).find(function (button) {
      return normalize(button.textContent).indexOf("aplicar") !== -1;
    });
    var confirmButton = Array.from(document.querySelectorAll("button")).find(function (button) {
      return normalize(button.textContent).indexOf("confirmar pedido") !== -1;
    });

    function getSelectedPaymentMethod() {
      var checkedInput = paymentInputs.find(function (input) { return input.checked; }) || paymentInputs[0];
      if (!checkedInput) {
        return "Pix online";
      }
      return checkedInput.closest("label").querySelector("p").textContent.trim();
    }

    function renderSummary() {
      var totals = getCartTotals(getDemoCart(), getSelectedPaymentMethod());
      var cartItems = getDemoCart();
      summaryCard.innerHTML =
        "<h3 class=\"font-headline font-extrabold text-xl mb-6 tracking-tight\">Resumo do Pedido</h3>" +
        "<div class=\"space-y-4 border-b border-surface-variant/10 pb-6 mb-6\">" +
        "<div class=\"flex justify-between items-center\"><span class=\"text-sm text-surface-variant/70 font-medium\">Itens (" + cartItems.reduce(function (sum, item) { return sum + item.quantity; }, 0) + ")</span><span class=\"text-sm font-bold tracking-tight\">" + formatMoney(totals.subtotal) + "</span></div>" +
        "<div class=\"flex justify-between items-center\"><span class=\"text-sm text-surface-variant/70 font-medium\">Taxa de entrega</span><span class=\"text-sm font-bold tracking-tight\">" + formatDeliveryFee(totals.deliveryFee) + "</span></div>" +
        "<div class=\"flex justify-between items-center text-primary-fixed-dim\"><span class=\"text-sm font-medium\">Desconto " + (normalize(getSelectedPaymentMethod()) === "pix online" ? "Pix" : "demo") + "</span><span class=\"text-sm font-bold tracking-tight\">" + (totals.discount ? "- " + formatMoney(totals.discount) : "R$ 0,00") + "</span></div>" +
        "</div>" +
        "<div class=\"space-y-2 mb-6\">" +
        cartItems.map(function (item) {
          return "<div class=\"flex justify-between gap-4 text-xs text-surface-variant/70\"><span>" + item.quantity + "x " + item.name + "</span><span class=\"font-bold text-surface\">" + formatMoney(item.price * item.quantity) + "</span></div>";
        }).join("") +
        "</div>" +
        "<div class=\"flex justify-between items-end\"><div><p class=\"text-[10px] uppercase tracking-widest text-surface-variant/50 font-bold mb-1\">Total a pagar</p><p class=\"font-headline font-black text-3xl tracking-tighter\">" + formatMoney(totals.total) + "</p></div><div class=\"text-right\"><span class=\"bg-surface-variant/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider\">Demo sem cobrança real</span></div></div>";
    }

    if (backButton) {
      backButton.addEventListener("click", function () {
        window.location.href = "/cardapio.html";
      });
    }

    if (couponButton) {
      couponButton.addEventListener("click", function () {
        showDemoToast("Cupom demo", "O campo está pronto para campanha, mas sem validação real nesta versão comercial.", "warning");
      });
    }

    paymentInputs.forEach(function (input, index) {
      if (!paymentInputs.some(function (item) { return item.checked; }) && index === 0) {
        input.checked = true;
      }
      input.addEventListener("change", function () {
        renderSummary();
        showDemoToast("Pagamento atualizado", "A cobrança continua simulada, sem processar valores reais.", "warning");
      });
    });

    if (confirmButton) {
      confirmButton.addEventListener("click", function () {
        var paymentMethod = getSelectedPaymentMethod();
        var name = (nameInput.value || "").trim();
        var phone = (phoneInput.value || "").trim();
        var email = (emailInput.value || "").trim();
        var address = (addressInput.value || "").trim();

        if (!name || !phone || !email || !address) {
          showDemoToast("Dados incompletos", "Preencha nome, telefone, e-mail e endereço para gerar o pedido demo.", "warning");
          return;
        }

        var cartItems = getDemoCart();
        var totals = getCartTotals(cartItems, paymentMethod);
        var orderId = getNextOrderId();
        var paymentTone = normalize(paymentMethod) === "cartao de credito" ? "paid" : "pending";
        var paymentLabel = normalize(paymentMethod) === "pix online"
          ? "Aguardando Pix"
          : normalize(paymentMethod) === "cartao de credito"
            ? "Pago (Demo)"
            : "Pagamento na entrega";
        var order = {
          id: orderId,
          client: name,
          phone: phone,
          summary: cartItems.reduce(function (sum, item) { return sum + item.quantity; }, 0) + " Itens • Entrega em Casa",
          total: totals.total,
          eta: "28 min",
          paymentLabel: paymentLabel,
          paymentTone: paymentTone,
          badgeTone: paymentTone === "paid" ? "soft" : "strong",
          addressTitle: address,
          addressLine: "São Paulo - SP",
          addressNote: "Pedido criado no checkout demo",
          items: cartItems.map(function (item) {
            return {
              quantity: item.quantity,
              name: item.name,
              note: item.note || "Sem observações",
              price: item.price * item.quantity
            };
          }),
          subtotal: totals.subtotal,
          deliveryFee: totals.deliveryFee,
          totalLabel: totals.total,
          status: "Novo",
          type: "Entrega",
          paymentMethod: paymentMethod
        };

        saveDemoOrders([order].concat(getDemoOrders()));
        upsertCustomerFromOrder(order, {
          name: name,
          phone: phone,
          email: email,
          address: address,
          reference: "Checkout demo"
        });
        prependNotification({
          id: "order-" + orderId,
          title: "Novo pedido #" + orderId,
          body: name + " concluiu um pedido demo a partir do cardápio público.",
          time: getShortTimestamp(),
          href: "/admin/pedidos.html?order=" + orderId,
          unread: true
        });
        clearDemoCart();
        window.location.href = "/admin/pedidos.html?order=" + orderId + "&demoCreated=1";
      });
    }

    renderSummary();
  }

  function setupConfigDemo() {
    if (currentPath !== "/admin/configuracoes.html") {
      return;
    }

    Array.from(document.querySelectorAll("button")).forEach(function (button) {
      var label = normalize(button.textContent);
      if (label.indexOf("salvar alteracoes") !== -1 && !button.dataset.demoBound) {
        button.addEventListener("click", function () {
          showDemoToast("Configurações em modo demo", "Os dados de perfil e loja não são persistidos nesta demonstração comercial.", "warning");
        });
        button.dataset.demoBound = "true";
      }
    });
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
    setupCustomersDemo();
    setupCatalogDemo();
    setupConfigDemo();
    setupAdminSearch();
    setupAdminNotifications();
    setupAdminAvatarMenu();
  }

  setupPublicCardapioDemo();
  setupCheckoutDemo();

  patchAnchorByText(document.querySelector("aside"));
  patchAnchorByText(document.querySelector("header"));
  patchAnchorByText(document.querySelector("nav.md\\:hidden"));
  patchButtons();
})();
