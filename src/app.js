const state = {
  view: "dashboard",
  role: "Admin",
  query: "",
  modal: null,
  toast: "",
  selectedDevice: "GPS-THM-018",
  mapLayer: "live",
  splitMap: false,
  tick: 0,
  tabs: {
    org: "tree",
    rbac: "roles",
    account: "users",
    settings: "profile"
  }
};

const nav = [
  ["dashboard", "Dashboard", "▦"],
  ["map", "Bản đồ theo dõi", "⌖"],
  ["cases", "Chuyên án", "◇"],
  ["devices", "Thiết bị", "●"],
  ["alerts", "Cảnh báo", "!"],
  ["areas", "Khu vực giám sát", "⬡"],
  ["org", "Đơn vị làm việc", "┬"],
  ["rbac", "Vai trò & phân quyền", "☷"],
  ["accounts", "Tài khoản", "♙"],
  ["reports", "Báo cáo", "▤"],
  ["settings", "Cài đặt", "⚙"]
];

const roles = [
  "Admin",
  "Quản lý cấp Cục",
  "Cán bộ cấp Cục",
  "Quản lý cấp Tỉnh",
  "Cán bộ cấp Tỉnh",
  "Quản lý cấp Xã",
  "Cán bộ cấp Xã"
];

const permissions = {
  Admin: ["all"],
  "Quản lý cấp Cục": ["unit", "role", "account", "case", "device", "alert", "report"],
  "Cán bộ cấp Cục": ["view", "case", "device", "alert", "report"],
  "Quản lý cấp Tỉnh": ["unit_child", "account", "case", "device", "alert", "report"],
  "Cán bộ cấp Tỉnh": ["view", "case", "device", "alert"],
  "Quản lý cấp Xã": ["account", "case", "device", "alert"],
  "Cán bộ cấp Xã": ["view", "device", "alert"]
};

const org = [
  {
    name: "Cục Kỹ thuật nghiệp vụ",
    code: "CUC-KTNV",
    level: "Cục",
    manager: "Nguyễn Văn An",
    rooms: ["Phòng Điều phối", "Phòng Thiết bị", "Phòng Phân tích"],
    children: [
      {
        name: "Công an TP Hà Nội",
        code: "HN",
        level: "Tỉnh",
        manager: "Trần Minh Đức",
        rooms: ["Đội Theo dõi", "Đội Kỹ thuật"],
        children: [
          { name: "Công an xã Đông Anh", code: "HN-DA", level: "Xã", manager: "Phạm Quang Huy", rooms: ["Tổ Địa bàn", "Tổ Trực ban"] },
          { name: "Công an xã Sóc Sơn", code: "HN-SS", level: "Xã", manager: "Lê Hoài Nam", rooms: ["Tổ Giám sát"] }
        ]
      },
      {
        name: "Công an TP Đà Nẵng",
        code: "DN",
        level: "Tỉnh",
        manager: "Hoàng Anh Tuấn",
        rooms: ["Đội Chuyên án", "Đội Hậu cần"],
        children: [
          { name: "Công an xã Hòa Vang", code: "DN-HV", level: "Xã", manager: "Võ Thanh Bình", rooms: ["Tổ Theo dõi"] }
        ]
      }
    ]
  }
];

const devices = [
  { id: "GPS-THM-018", name: "Thiết bị 018", status: "Online", battery: 82, unit: "Công an TP Hà Nội", case: "CA-2026-017", holder: "Đội Theo dõi", x: 42, y: 38 },
  { id: "GPS-THM-027", name: "Thiết bị 027", status: "Online", battery: 31, unit: "Công an xã Đông Anh", case: "CA-2026-017", holder: "Tổ Địa bàn", x: 58, y: 44 },
  { id: "GPS-THM-041", name: "Thiết bị 041", status: "Offline", battery: 64, unit: "Công an TP Đà Nẵng", case: "CA-2026-011", holder: "Kho thiết bị", x: 34, y: 70 },
  { id: "GPS-THM-052", name: "Thiết bị 052", status: "Online", battery: 17, unit: "Công an xã Hòa Vang", case: "CA-2026-021", holder: "Tổ Theo dõi", x: 70, y: 61 },
  { id: "GPS-THM-063", name: "Thiết bị 063", status: "Offline", battery: 9, unit: "Cục Kỹ thuật nghiệp vụ", case: "Chưa phân bổ", holder: "Phòng Thiết bị", x: 22, y: 52 }
];

const cases = [
  { id: "CA-2026-017", name: "Theo dõi tuyến vận chuyển phía Bắc", status: "Đang hoạt động", unit: "Công an TP Hà Nội", members: 8, devices: 2, alerts: 5 },
  { id: "CA-2026-011", name: "Giám sát đối tượng liên tỉnh", status: "Tạm dừng", unit: "Công an TP Đà Nẵng", members: 5, devices: 1, alerts: 2 },
  { id: "CA-2026-021", name: "Kiểm soát khu vực trọng điểm", status: "Đang hoạt động", unit: "Công an xã Hòa Vang", members: 4, devices: 1, alerts: 7 }
];

const alerts = [
  { type: "Pin yếu", device: "GPS-THM-052", time: "09:42", severity: "Cao", case: "CA-2026-021", status: "Chưa xử lý" },
  { type: "Ra khỏi khu vực", device: "GPS-THM-027", time: "09:21", severity: "Cao", case: "CA-2026-017", status: "Đang xác minh" },
  { type: "Offline", device: "GPS-THM-041", time: "08:50", severity: "Trung bình", case: "CA-2026-011", status: "Đã ghi nhận" },
  { type: "Tiếp cận mục tiêu", device: "GPS-THM-018", time: "08:18", severity: "Cao", case: "CA-2026-017", status: "Đã xử lý" },
  { type: "Vào khu vực", device: "GPS-THM-018", time: "07:55", severity: "Thấp", case: "CA-2026-017", status: "Đã ghi nhận" }
];

const users = [
  { name: "Nguyễn Văn An", phone: "0912 345 111", email: "an.nguyen@themis.vn", unit: "Cục Kỹ thuật nghiệp vụ", room: "Phòng Điều phối", role: "Quản lý cấp Cục", status: "Hoạt động" },
  { name: "Trần Minh Đức", phone: "0912 345 222", email: "duc.tran@themis.vn", unit: "Công an TP Hà Nội", room: "Đội Theo dõi", role: "Quản lý cấp Tỉnh", status: "Hoạt động" },
  { name: "Phạm Quang Huy", phone: "0912 345 333", email: "huy.pham@themis.vn", unit: "Công an xã Đông Anh", room: "Tổ Địa bàn", role: "Quản lý cấp Xã", status: "Hoạt động" },
  { name: "Lê Thu Hà", phone: "0912 345 444", email: "ha.le@themis.vn", unit: "Công an TP Hà Nội", room: "Đội Kỹ thuật", role: "Cán bộ cấp Tỉnh", status: "Khóa" }
];

const areas = [
  { name: "Vành đai giám sát Bắc Thăng Long", type: "Đa giác", unit: "Công an TP Hà Nội", devices: 2, alerts: 3 },
  { name: "Khu vực mục tiêu A12", type: "Hình tròn", unit: "Công an xã Đông Anh", devices: 1, alerts: 1 },
  { name: "Ranh giới hành chính Hòa Vang", type: "Hành chính", unit: "Công an xã Hòa Vang", devices: 1, alerts: 4 }
];

function can(action) {
  const p = permissions[state.role] || [];
  return p.includes("all") || p.includes(action);
}

function setView(view) {
  state.view = view;
  state.query = "";
  render();
}

function openModal(type, payload = {}) {
  state.modal = { type, payload };
  render();
}

function closeModal() {
  state.modal = null;
  render();
}

function notify(text) {
  state.toast = text;
  render();
  setTimeout(() => {
    state.toast = "";
    render();
  }, 2300);
}

function statusClass(value) {
  if (/online|hoạt động|đã xử lý/i.test(value)) return "online";
  if (/offline|khóa|chưa xử lý/i.test(value)) return "offline";
  if (/pin|tạm|xác minh|trung bình/i.test(value)) return "low";
  return "info";
}

function filtered(rows, keys) {
  const q = state.query.toLowerCase().trim();
  if (!q) return rows;
  return rows.filter((row) => keys.some((key) => String(row[key] || "").toLowerCase().includes(q)));
}

function layout(title, subtitle, content) {
  return `
    <div class="shell">
      ${sidebar()}
      <main class="main">
        <div class="mobile-nav">${nav.map(([id, label]) => `<button onclick="setView('${id}')">${label}</button>`).join("")}</div>
        <header class="topbar">
          <div>
            <h1>${title}</h1>
            <p>${subtitle}</p>
          </div>
          <div class="top-actions">
            <input class="search" placeholder="Tìm nhanh thiết bị, chuyên án, cán bộ..." value="${state.query}" oninput="state.query=this.value; render()" />
            <button class="btn ghost" onclick="openModal('workflow')">Luồng phân cấp</button>
          </div>
        </header>
        <section class="content">${content}</section>
      </main>
    </div>
    ${state.modal ? modal() : ""}
    ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
  `;
}

function sidebar() {
  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">T</div>
        <div><strong>Themis</strong><span>GPS Command Center</span></div>
      </div>
      <nav class="nav">
        ${nav.map(([id, label, icon]) => `<button class="${state.view === id ? "active" : ""}" onclick="setView('${id}')"><span>${icon}</span>${label}</button>`).join("")}
      </nav>
      <div class="user-switch">
        <label>Vai trò demo hiện tại</label>
        <select onchange="state.role=this.value; notify('Đã chuyển vai trò demo sang ' + this.value)">
          ${roles.map((role) => `<option ${role === state.role ? "selected" : ""}>${role}</option>`).join("")}
        </select>
      </div>
    </aside>
  `;
}

function dashboard() {
  const kpis = [
    ["Tổng số thiết bị", devices.length, "+12 nhập kho tháng này"],
    ["Thiết bị Online", devices.filter((d) => d.status === "Online").length, "Theo dõi thời gian thực"],
    ["Thiết bị Offline", devices.filter((d) => d.status === "Offline").length, "Cần kiểm tra tín hiệu"],
    ["Pin yếu", devices.filter((d) => d.battery <= 20).length, "Dưới ngưỡng 20%"],
    ["Chuyên án hoạt động", cases.filter((c) => c.status === "Đang hoạt động").length, "Đang chia sẻ dữ liệu"],
    ["Cảnh báo phát sinh", alerts.length, "24 giờ gần nhất"]
  ];
  return layout("Dashboard vận hành", `Phạm vi dữ liệu theo vai trò: ${state.role}`, `
    <div class="grid cols-3">
      ${kpis.map((k) => `<div class="kpi"><span>${k[0]}</span><strong>${k[1]}</strong><small>${k[2]}</small></div>`).join("")}
    </div>
    <div class="grid cols-2" style="margin-top:14px">
      <div class="panel">
        <div class="panel-head"><h2>Hoạt động gần đây</h2><button class="btn" onclick="openModal('activity')">Xem nhật ký</button></div>
        <div class="panel-body timeline">
          ${["Thiết bị GPS-THM-027 được phân bổ vào chuyên án CA-2026-017", "Cảnh báo ra khỏi khu vực được chuyển sang đang xác minh", "Quản lý cấp Tỉnh tạo tài khoản cán bộ mới", "Admin cấp quyền liên thông dữ liệu Hà Nội - Đà Nẵng"].map((text, i) => `<div class="timeline-item"><time>0${i + 8}:1${i}</time><div>${text}<br><span class="muted">Ghi nhận bởi hệ thống Themis</span></div></div>`).join("")}
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><h2>Thiết bị cần chú ý</h2><button class="btn primary" onclick="setView('map')">Mở bản đồ</button></div>
        <div class="panel-body">${deviceCards(devices.filter((d) => d.status === "Offline" || d.battery <= 20))}</div>
      </div>
    </div>
  `);
}

function mapView() {
  const selected = devices.find((d) => d.id === state.selectedDevice) || devices[0];
  return layout("Bản đồ theo dõi GPS", "Mô phỏng vị trí thời gian thực, lịch sử, heatmap, lộ trình và đa khung hình", `
    <div class="map-layout">
      <div class="map ${state.splitMap ? "split-map" : ""}">
        ${state.splitMap ? splitMapCanvas() : mapCanvas()}
      </div>
      <div class="panel">
        <div class="panel-head"><h2>Chi tiết thiết bị</h2><span class="status ${statusClass(selected.status)}">${selected.status}</span></div>
        <div class="panel-body list">
          <div class="list-item"><strong>${selected.id}</strong><span>${selected.name} • Pin ${selected.battery}%</span></div>
          <div class="list-item"><strong>Chuyên án</strong><span>${selected.case}</span></div>
          <div class="list-item"><strong>Đơn vị / Phòng</strong><span>${selected.unit}<br>${selected.holder}</span></div>
          <div class="toolbar">
            <button class="btn primary" onclick="openModal('deviceControl', {id:'${selected.id}'})">Điều khiển</button>
            <button class="btn" onclick="openModal('history', {id:'${selected.id}'})">Lịch sử</button>
            <button class="btn" onclick="openModal('shareCase')">Chia sẻ</button>
          </div>
          <div class="list-item"><strong>Thiết bị đang theo dõi</strong>${devices.map((d) => `<button class="btn ghost" style="width:100%;margin-top:7px;justify-content:space-between" onclick="state.selectedDevice='${d.id}'; render()"><span>${d.id}</span><span>${d.battery}%</span></button>`).join("")}</div>
        </div>
      </div>
    </div>
  `);
}

function splitMapCanvas() {
  return `
    <div class="map-mini">Live</div>
    <div class="map-mini">Lịch sử</div>
    <div class="map-mini">Heatmap</div>
    <div class="map-mini">Lộ trình</div>
    <div class="map-controls">
      <span></span>
      <button class="btn primary" onclick="state.splitMap=false; render()">Thoát đa khung</button>
    </div>
  `;
}

function mapCanvas() {
  const roads = [
    [8, 30, 78, 13], [15, 62, 70, -8], [44, 12, 58, 82], [20, 78, 46, -36]
  ];
  return `
    ${roads.map((r) => `<div class="road" style="left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;transform:rotate(${r[3]}deg)"></div>`).join("")}
    <div class="area circle" style="left:52%;top:30%;width:150px;height:150px"></div>
    <div class="area poly" style="left:18%;top:52%;width:210px;height:150px"></div>
    <svg class="route" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline points="18,68 28,58 42,52 58,44 73,38" fill="none" stroke="#0b6f79" stroke-width="0.8" stroke-dasharray="2 1"/>
      ${state.mapLayer === "heat" ? `<circle cx="58" cy="44" r="13" fill="rgba(217,139,16,.22)"/><circle cx="42" cy="52" r="18" fill="rgba(196,59,59,.16)"/>` : ""}
    </svg>
    ${devices.map((d, i) => {
      const dx = d.status === "Online" ? Math.sin((state.tick + i) / 2) * 1.8 : 0;
      const dy = d.status === "Online" ? Math.cos((state.tick + i) / 2) * 1.4 : 0;
      const cls = d.status === "Offline" ? "offline" : d.battery <= 20 ? "low" : "";
      return `<button title="${d.id}" class="device-pin ${cls}" style="left:${d.x + dx}%;top:${d.y + dy}%" onclick="state.selectedDevice='${d.id}'; render()"></button>`;
    }).join("")}
    <div class="map-controls">
      <div class="layer-box">
        ${["live:Realtime", "history:Lịch sử", "heat:Heatmap", "route:Lộ trình"].map((item) => {
          const [id, label] = item.split(":");
          return `<button class="btn ${state.mapLayer === id ? "primary" : ""}" onclick="state.mapLayer='${id}'; render()">${label}</button>`;
        }).join("")}
      </div>
      <button class="btn" onclick="state.splitMap=!state.splitMap; render()">Đa khung hình</button>
    </div>
  `;
}

function casesView() {
  const rows = filtered(cases, ["id", "name", "unit", "status"]);
  return crudPage("Chuyên án", "Danh sách, tạo mới, thành viên, thiết bị, khu vực, cảnh báo và chia sẻ chuyên án", "Tạo chuyên án", "caseForm", `
    <table><thead><tr><th>Mã</th><th>Tên chuyên án</th><th>Đơn vị</th><th>Thành viên</th><th>Thiết bị</th><th>Cảnh báo</th><th>Trạng thái</th><th></th></tr></thead>
    <tbody>${rows.map((c) => `<tr><td>${c.id}</td><td><strong>${c.name}</strong></td><td>${c.unit}</td><td>${c.members}</td><td>${c.devices}</td><td>${c.alerts}</td><td><span class="status ${statusClass(c.status)}">${c.status}</span></td><td class="toolbar"><button class="btn" onclick="openModal('caseDetail',{id:'${c.id}'})">Chi tiết</button><button class="btn" onclick="openModal('caseConfig',{id:'${c.id}'})">Cấu hình</button></td></tr>`).join("")}</tbody></table>
  `);
}

function devicesView() {
  const rows = filtered(devices, ["id", "name", "unit", "case", "holder", "status"]);
  return crudPage("Thiết bị", "Danh sách, thêm thiết bị, import CSV, phân bổ, thu hồi, tiếp nhận và điều khiển", "Thêm thiết bị", "deviceForm", `
    <div class="toolbar" style="margin-bottom:12px">
      <button class="btn" onclick="openModal('importCsv')">Import CSV</button>
      <button class="btn" onclick="openModal('allocate')">Phân bổ</button>
      <button class="btn" onclick="openModal('recall')">Thu hồi</button>
      <button class="btn" onclick="openModal('receive')">Tiếp nhận</button>
    </div>
    <table><thead><tr><th>Mã</th><th>Tên</th><th>Pin</th><th>Đơn vị</th><th>Chuyên án</th><th>Trạng thái</th><th></th></tr></thead>
    <tbody>${rows.map((d) => `<tr><td>${d.id}</td><td>${d.name}<br><span class="muted">${d.holder}</span></td><td>${d.battery}%</td><td>${d.unit}</td><td>${d.case}</td><td><span class="status ${statusClass(d.status === "Online" && d.battery <= 20 ? "Pin yếu" : d.status)}">${d.status === "Online" && d.battery <= 20 ? "Pin yếu" : d.status}</span></td><td class="toolbar"><button class="btn" onclick="state.selectedDevice='${d.id}'; setView('map')">Bản đồ</button><button class="btn" onclick="openModal('deviceControl',{id:'${d.id}'})">Điều khiển</button></td></tr>`).join("")}</tbody></table>
  `);
}

function alertsView() {
  const rows = filtered(alerts, ["type", "device", "case", "status"]);
  return layout("Cảnh báo", "Online, Offline, Pin yếu, Vào/Ra khu vực và Tiếp cận mục tiêu", `
    <div class="panel">
      <div class="panel-head">
        <h2>Hàng đợi cảnh báo</h2>
        <div class="toolbar"><select class="form-control"><option>Tất cả mức độ</option><option>Cao</option><option>Trung bình</option></select><button class="btn primary" onclick="openModal('alertRule')">Cấu hình cảnh báo</button></div>
      </div>
      <div class="table-wrap"><table><thead><tr><th>Loại</th><th>Thiết bị</th><th>Chuyên án</th><th>Thời gian</th><th>Mức độ</th><th>Trạng thái</th><th></th></tr></thead>
      <tbody>${rows.map((a) => `<tr><td>${a.type}</td><td>${a.device}</td><td>${a.case}</td><td>${a.time}</td><td><span class="tag ${a.severity === "Cao" ? "danger" : "warning"}">${a.severity}</span></td><td><span class="status ${statusClass(a.status)}">${a.status}</span></td><td><button class="btn" onclick="openModal('alertHandle',{type:'${a.type}'})">Xử lý</button></td></tr>`).join("")}</tbody></table></div>
    </div>
  `);
}

function areasView() {
  return crudPage("Khu vực giám sát", "Ranh giới hành chính, hình tròn và đa giác dùng cho cảnh báo vào/ra khu vực", "Tạo khu vực", "areaForm", `
    <div class="grid cols-3">${areas.map((a) => `<div class="panel"><div class="panel-head"><h2>${a.name}</h2><span class="tag info">${a.type}</span></div><div class="panel-body list"><div>Đơn vị: ${a.unit}</div><div>Thiết bị áp dụng: ${a.devices}</div><div>Cảnh báo 24h: ${a.alerts}</div><div class="toolbar"><button class="btn" onclick="setView('map')">Xem bản đồ</button><button class="btn" onclick="openModal('areaForm')">Sửa</button></div></div></div>`).join("")}</div>
  `);
}

function orgView() {
  const tab = state.tabs.org;
  return layout("Quản lý đơn vị làm việc", "Cây tổ chức Admin → Cục → Tỉnh → Xã, phòng nghiệp vụ, cán bộ và phạm vi dữ liệu", `
    <div class="panel">
      <div class="panel-head"><div class="tabs">${["tree:Cây tổ chức", "rooms:Phòng nghiệp vụ", "staff:Cán bộ", "scope:Phạm vi dữ liệu"].map(tabButton("org")).join("")}</div><button class="btn primary" onclick="openModal('unitForm')">${can("unit") || can("unit_child") ? "Tạo đơn vị trực thuộc" : "Yêu cầu quyền tạo"}</button></div>
      <div class="panel-body">${tab === "tree" ? orgTree(org) : orgTab(tab)}</div>
    </div>
  `);
}

function orgTree(nodes) {
  return `<div class="org-tree">${nodes.map((n) => `<div class="org-node"><div class="org-row"><div><strong>${n.name}</strong><br><span class="muted">${n.level} • ${n.code} • Quản lý: ${n.manager}</span></div><button class="btn" onclick="openModal('unitForm',{name:'${n.name}'})">Cập nhật</button></div>${n.children ? orgTree(n.children) : ""}</div>`).join("")}</div>`;
}

function orgTab(tab) {
  if (tab === "rooms") return `<div class="grid cols-3">${org.flatMap((d) => [d, ...d.children, ...d.children.flatMap((c) => c.children || [])]).map((u) => `<div class="list-item"><strong>${u.name}</strong>${u.rooms.map((r) => `<div class="tag info" style="margin:5px 5px 0 0">${r}</div>`).join("")}</div>`).join("")}</div>`;
  if (tab === "staff") return tableUsers(users);
  return `<div class="list"><div class="list-item"><strong>Dữ liệu mặc định theo đơn vị</strong>Cán bộ chỉ xem dữ liệu thuộc đơn vị và phòng nghiệp vụ được gán.</div><div class="list-item"><strong>Liên thông dữ liệu</strong><span class="tag info">Hà Nội ↔ Đà Nẵng</span> được cấp cho chuyên án CA-2026-011 đến 30/06/2026.</div><button class="btn primary" onclick="openModal('dataBridge')">Cấp quyền liên thông</button></div>`;
}

function rbacView() {
  const tab = state.tabs.rbac;
  return layout("Quản lý vai trò và phân quyền", "RBAC theo vai trò, quyền chức năng, phạm vi dữ liệu và danh sách người dùng", `
    <div class="panel">
      <div class="panel-head"><div class="tabs">${["roles:Vai trò", "matrix:Ma trận quyền", "users:Người dùng thuộc vai trò"].map(tabButton("rbac")).join("")}</div><button class="btn primary" onclick="openModal('roleForm')" ${can("role") ? "" : "disabled"}>Tạo vai trò</button></div>
      <div class="panel-body">${tab === "roles" ? rolesList() : tab === "matrix" ? permissionMatrix() : tableUsers(users)}</div>
    </div>
  `);
}

function rolesList() {
  return `<div class="grid cols-3">${roles.map((r) => `<div class="list-item"><strong>${r}</strong><span class="muted">${r === "Admin" ? "Toàn hệ thống" : "Phạm vi theo đơn vị"}</span><div class="toolbar" style="margin-top:10px"><button class="btn" onclick="openModal('roleForm',{role:'${r}'})">Sửa</button><button class="btn" onclick="openModal('roleClone',{role:'${r}'})">Sao chép</button></div></div>`).join("")}</div>`;
}

function permissionMatrix() {
  const cols = ["Xem", "Tạo", "Sửa", "Xóa", "Phê duyệt", "Xuất báo cáo", "QL người dùng", "QL đơn vị", "QL chuyên án", "QL thiết bị", "Điều khiển", "QL cảnh báo"];
  return `<div class="matrix"><table><thead><tr><th>Vai trò</th>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${roles.map((r, i) => `<tr><td><strong>${r}</strong></td>${cols.map((_, j) => `<td>${i === 0 || j < Math.max(3, 11 - i) ? "✓" : "−"}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function accountsView() {
  return crudPage("Quản lý tài khoản", "Tạo, chỉnh sửa, khóa/kích hoạt, đặt lại mật khẩu và điều chuyển công tác", "Tạo tài khoản", "accountForm", tableUsers(filtered(users, ["name", "email", "unit", "role", "status"])));
}

function reportsView() {
  const reports = ["Báo cáo thiết bị", "Báo cáo lộ trình", "Báo cáo cảnh báo", "Báo cáo chuyên án"];
  return layout("Báo cáo", "Mẫu báo cáo demo có bộ lọc thời gian, đơn vị, chuyên án và xuất dữ liệu", `
    <div class="grid cols-4">${reports.map((r) => `<div class="panel"><div class="panel-head"><h2>${r}</h2></div><div class="panel-body list"><select class="form-control"><option>7 ngày gần nhất</option><option>30 ngày gần nhất</option></select><select class="form-control"><option>Tất cả đơn vị</option><option>Công an TP Hà Nội</option></select><button class="btn primary" onclick="openModal('reportPreview',{name:'${r}'})">Xem báo cáo</button><button class="btn" onclick="notify('Đã mô phỏng xuất ${r}')">Xuất Excel/PDF</button></div></div>`).join("")}</div>
  `);
}

function settingsView() {
  const tab = state.tabs.settings;
  return layout("Cài đặt", "Thông tin cá nhân, đổi mật khẩu và nhật ký hệ thống", `
    <div class="panel"><div class="panel-head"><div class="tabs">${["profile:Thông tin cá nhân", "password:Đổi mật khẩu", "logs:Nhật ký hệ thống"].map(tabButton("settings")).join("")}</div></div>
    <div class="panel-body">${tab === "logs" ? activityLog() : simpleForm(tab === "password" ? "Đổi mật khẩu" : "Thông tin cá nhân")}</div></div>
  `);
}

function crudPage(title, subtitle, actionLabel, modalType, body) {
  return layout(title, subtitle, `
    <div class="panel">
      <div class="panel-head">
        <h2>${title}</h2>
        <div class="toolbar"><select class="form-control"><option>Tất cả trạng thái</option><option>Hoạt động</option><option>Khóa</option></select><button class="btn primary" onclick="openModal('${modalType}')">${actionLabel}</button></div>
      </div>
      <div class="table-wrap panel-body">${body}</div>
    </div>
  `);
}

function tableUsers(rows) {
  return `<table><thead><tr><th>Họ tên</th><th>Liên hệ</th><th>Đơn vị</th><th>Phòng</th><th>Vai trò</th><th>Trạng thái</th><th></th></tr></thead><tbody>${rows.map((u) => `<tr><td><strong>${u.name}</strong></td><td>${u.phone}<br><span class="muted">${u.email}</span></td><td>${u.unit}</td><td>${u.room}</td><td>${u.role}</td><td><span class="status ${statusClass(u.status)}">${u.status}</span></td><td class="toolbar"><button class="btn" onclick="openModal('accountForm',{name:'${u.name}'})">Sửa</button><button class="btn" onclick="openModal('transfer',{name:'${u.name}'})">Điều chuyển</button><button class="btn danger" onclick="notify('Đã mô phỏng khóa/kích hoạt tài khoản ${u.name}')">Khóa</button></td></tr>`).join("")}</tbody></table>`;
}

function deviceCards(rows) {
  return `<div class="list">${rows.map((d) => `<div class="list-item"><strong>${d.id}</strong>${d.unit}<br><span class="status ${statusClass(d.battery <= 20 ? "Pin yếu" : d.status)}">${d.battery <= 20 ? "Pin yếu" : d.status}</span></div>`).join("")}</div>`;
}

function tabButton(group) {
  return (item) => {
    const [id, label] = item.split(":");
    return `<button class="${state.tabs[group] === id ? "active" : ""}" onclick="state.tabs.${group}='${id}'; render()">${label}</button>`;
  };
}

function simpleForm(title) {
  return `<div class="form-grid"><div class="field"><label>${title}</label><input class="form-control" value="Nguyễn Văn An"></div><div class="field"><label>Email</label><input class="form-control" value="an.nguyen@themis.vn"></div><div class="field"><label>Mật khẩu hiện tại</label><input class="form-control" type="password"></div><div class="field"><label>Mật khẩu mới</label><input class="form-control" type="password"></div><div class="field full"><button class="btn primary" onclick="notify('Đã lưu thông tin demo')">Lưu thay đổi</button></div></div>`;
}

function activityLog() {
  return `<div class="timeline">${["Admin tạo đơn vị cấp Cục", "Quản lý cấp Cục tạo Công an TP Hà Nội", "Quản lý cấp Tỉnh tạo Công an xã Đông Anh", "Thiết bị GPS-THM-018 bật chế độ theo dõi 10 giây/lần"].map((x, i) => `<div class="timeline-item"><time>2026-06-0${i + 1}</time><div>${x}<br><span class="muted">IP 10.12.4.${i + 10}</span></div></div>`).join("")}</div>`;
}

function modal() {
  const { type, payload } = state.modal;
  const titles = {
    workflow: "Luồng tổ chức phân cấp",
    activity: "Nhật ký hoạt động",
    deviceControl: "Điều khiển thiết bị",
    history: "Lịch sử vị trí",
    shareCase: "Chia sẻ chuyên án",
    caseForm: "Tạo chuyên án",
    caseDetail: "Chi tiết chuyên án",
    caseConfig: "Cấu hình chuyên án",
    deviceForm: "Thêm thiết bị",
    importCsv: "Import CSV thiết bị",
    allocate: "Phân bổ thiết bị",
    recall: "Thu hồi thiết bị",
    receive: "Tiếp nhận thiết bị",
    alertRule: "Cấu hình cảnh báo",
    alertHandle: "Xử lý cảnh báo",
    areaForm: "Tạo khu vực giám sát",
    unitForm: "Tạo/Cập nhật đơn vị",
    dataBridge: "Cấp quyền liên thông dữ liệu",
    roleForm: "Cấu hình vai trò",
    roleClone: "Sao chép vai trò",
    accountForm: "Tạo/Cập nhật tài khoản",
    transfer: "Điều chuyển cán bộ",
    reportPreview: "Xem trước báo cáo"
  };
  return `
    <div class="modal-backdrop" onclick="closeModal()">
      <div class="modal" onclick="event.stopPropagation()">
        <div class="modal-head"><h3>${titles[type] || "Thao tác"}</h3><button class="btn ghost" onclick="closeModal()">Đóng</button></div>
        <div class="modal-body">${modalBody(type, payload)}</div>
        <div class="modal-foot"><button class="btn" onclick="closeModal()">Hủy</button><button class="btn primary" onclick="notify('Đã lưu thao tác demo'); closeModal()">Lưu mô phỏng</button></div>
      </div>
    </div>
  `;
}

function modalBody(type, payload) {
  if (type === "workflow") {
    return `<div class="grid cols-3"><div class="list-item"><strong>Admin</strong>Tạo đơn vị cấp Cục và tài khoản Quản lý cấp Cục.</div><div class="list-item"><strong>Quản lý cấp Cục</strong>Tạo Tỉnh, Phòng nghiệp vụ cấp Tỉnh, Quản lý/Cán bộ cấp Tỉnh.</div><div class="list-item"><strong>Quản lý cấp Tỉnh</strong>Tạo Xã, Phòng nghiệp vụ cấp Xã, Quản lý/Cán bộ cấp Xã.</div></div>${orgTree(org)}`;
  }
  if (type === "activity") return activityLog();
  if (type === "history") return `<div class="list"><div class="list-item"><strong>${payload.id}</strong>09:00 Cầu Nhật Tân → 09:30 Đông Anh → 10:00 Khu vực A12</div><button class="btn primary" onclick="state.mapLayer='history'; closeModal(); setView('map')">Hiển thị trên bản đồ</button></div>`;
  if (type === "deviceControl") return `<div class="form-grid"><div class="field full"><label>Thiết bị</label><input class="form-control" value="${payload.id || state.selectedDevice}"></div><div class="field"><label>Tần suất gửi vị trí</label><select class="form-control"><option>10 giây/lần</option><option>30 giây/lần</option><option>1 phút/lần</option></select></div><div class="field"><label>Chế độ</label><select class="form-control"><option>Theo dõi liên tục</option><option>Tiết kiệm pin</option><option>Ngủ tạm thời</option></select></div><div class="field full"><label>Lệnh nhanh</label><div class="toolbar"><button class="btn">Ping</button><button class="btn">Cập nhật firmware</button><button class="btn danger">Ngắt kết nối</button></div></div></div>`;
  if (type === "roleForm") return roleForm(payload.role || "Vai trò nghiệp vụ mới");
  if (type === "reportPreview") return `<div class="list"><div class="list-item"><strong>${payload.name}</strong>Dữ liệu mẫu gồm 5 thiết bị, 3 chuyên án, 5 cảnh báo trong kỳ.</div>${permissionMatrix()}</div>`;
  return genericForm(type, payload);
}

function genericForm(type, payload) {
  const common = `
    <div class="field"><label>Tên/Mã nghiệp vụ</label><input class="form-control" value="${payload.name || payload.id || ""}" placeholder="Nhập thông tin"></div>
    <div class="field"><label>Đơn vị</label><select class="form-control"><option>Cục Kỹ thuật nghiệp vụ</option><option>Công an TP Hà Nội</option><option>Công an xã Đông Anh</option></select></div>
    <div class="field"><label>Phòng nghiệp vụ</label><select class="form-control"><option>Phòng Điều phối</option><option>Đội Theo dõi</option><option>Tổ Địa bàn</option></select></div>
    <div class="field"><label>Vai trò/Trạng thái</label><select class="form-control">${roles.map((r) => `<option>${r}</option>`).join("")}</select></div>
    <div class="field full"><label>Ghi chú</label><textarea class="form-control" rows="4" placeholder="Ghi chú thao tác demo"></textarea></div>
  `;
  if (type === "importCsv") return `<div class="list"><div class="list-item"><strong>CSV mẫu</strong>device_id, imei, serial, unit, status</div><input class="form-control" type="file"><div class="tag info">Mô phỏng kiểm tra trùng IMEI và nhập kho</div></div>`;
  if (type === "caseConfig") return `<div class="form-grid">${common}<div class="field full"><label>Cấu hình cảnh báo</label><div class="permission-grid">${["Online", "Offline", "Pin yếu", "Vào khu vực", "Ra khỏi khu vực", "Tiếp cận mục tiêu"].map((p) => `<label class="check-tile"><input type="checkbox" checked>${p}</label>`).join("")}</div></div></div>`;
  return `<div class="form-grid">${common}</div>`;
}

function roleForm(role) {
  const perms = ["Xem dữ liệu", "Tạo mới", "Chỉnh sửa", "Xóa", "Phê duyệt", "Xuất báo cáo", "Quản lý người dùng", "Quản lý đơn vị", "Quản lý chuyên án", "Quản lý thiết bị", "Điều khiển thiết bị", "Quản lý cảnh báo"];
  return `<div class="form-grid"><div class="field"><label>Tên vai trò</label><input class="form-control" value="${role}"></div><div class="field"><label>Phạm vi dữ liệu</label><select class="form-control"><option>Theo đơn vị</option><option>Đơn vị và cấp dưới</option><option>Liên thông được cấp quyền</option><option>Toàn hệ thống</option></select></div><div class="field full"><label>Quyền chức năng</label><div class="permission-grid">${perms.map((p, i) => `<label class="check-tile"><input type="checkbox" ${i < 8 ? "checked" : ""}>${p}</label>`).join("")}</div></div><div class="field full"><span class="tag warning">Chỉ Admin hoặc Quản lý cấp Cục được phép cấu hình quyền.</span></div></div>`;
}

function render() {
  const views = {
    dashboard,
    map: mapView,
    cases: casesView,
    devices: devicesView,
    alerts: alertsView,
    areas: areasView,
    org: orgView,
    rbac: rbacView,
    accounts: accountsView,
    reports: reportsView,
    settings: settingsView
  };
  document.getElementById("app").innerHTML = views[state.view]();
}

render();
setInterval(() => {
  state.tick += 1;
  if (state.view === "map" && !state.modal) render();
}, 900);
