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
    org: "structure",
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
  ["org", "Cơ cấu tổ chức", "┬"],
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

const permissionModules = [
  {
    name: "Theo dõi trên bản đồ",
    description: "Quản lý quyền xem live tracking, lịch sử di chuyển và xuất báo cáo theo dõi.",
    features: ["Theo dõi trực tiếp vị trí thiết bị", "Theo dõi lịch sử di chuyển", "Xuất báo cáo theo dõi"]
  },
  {
    name: "Quản lý thiết bị",
    description: "Vận hành vòng đời thiết bị từ nhập kho đến phân bổ và điều khiển từ xa.",
    features: ["Thêm thiết bị", "Import danh sách thiết bị từ file CSV", "Xem thông tin thiết bị", "Chỉnh sửa thông tin thiết bị", "Xóa thiết bị", "Tạo yêu cầu bảo trì thiết bị", "Phân bổ thiết bị cho đơn vị hoặc chuyên án", "Xuất báo cáo thiết bị", "Gửi lệnh điều khiển thiết bị từ xa"]
  },
  {
    name: "Quản lý chuyên án",
    description: "Thiết lập chuyên án, cập nhật hồ sơ, gán nhãn đối tượng và xuất báo cáo.",
    features: ["Thêm mới chuyên án", "Xem thông tin chuyên án", "Chỉnh sửa chuyên án", "Xóa chuyên án", "Gán nhãn đối tượng", "Xuất báo cáo chuyên án"]
  },
  {
    name: "Khoanh vùng khu vực",
    description: "Quản lý khu vực giám sát để phục vụ cảnh báo vào/ra vùng.",
    features: ["Thêm mới khu vực giám sát", "Xem thông tin khu vực", "Chỉnh sửa khu vực", "Xóa khu vực"]
  },
  {
    name: "Quản lý cán bộ",
    description: "Quản lý tài khoản cán bộ, hồ sơ, trạng thái và điều chuyển công tác.",
    features: ["Tạo mới tài khoản cán bộ", "Xem thông tin cán bộ", "Chỉnh sửa thông tin cán bộ", "Xóa tài khoản cán bộ"]
  },
  {
    name: "Vai trò và phân quyền",
    description: "Tạo vai trò và cấu hình các chức năng được phép sử dụng.",
    features: ["Thêm mới vai trò", "Xem thông tin vai trò", "Chỉnh sửa vai trò", "Xóa vai trò", "Cấu hình quyền cho vai trò"]
  },
  {
    name: "Đơn vị làm việc",
    description: "Thiết lập cơ cấu đơn vị, thêm tài khoản vào đơn vị và quản lý thông tin tổ chức.",
    features: ["Thêm mới đơn vị", "Xem thông tin đơn vị", "Chỉnh sửa thông tin đơn vị", "Xóa đơn vị", "Thêm tài khoản theo từng đơn vị"]
  }
];

const directorates = ["Cục Kỹ thuật nghiệp vụ", "Cục Điều phối giám sát"];
const provinces = ["Hà Nội", "Đà Nẵng", "TP Hồ Chí Minh"];
const departments = ["Phòng Theo dõi thiết bị", "Phòng Phân tích dữ liệu", "Phòng Quản lý chuyên án"];
const wards = ["Xã Đông Anh", "Xã Sóc Sơn", "Xã Hòa Vang", "Xã Củ Chi"];

const roleProfiles = [
  { name: "Admin", scope: "Toàn hệ thống", users: 1, enabled: 31 },
  { name: "Quản lý cấp Cục", scope: "Đơn vị chỉ đạo nghiệp vụ và cấp dưới", users: 2, enabled: 28 },
  { name: "Cán bộ cấp Cục", scope: "Đơn vị chỉ đạo nghiệp vụ", users: 4, enabled: 16 },
  { name: "Quản lý cấp Tỉnh", scope: "Phòng nghiệp vụ và đơn vị cấp xã trực thuộc", users: 6, enabled: 22 },
  { name: "Cán bộ cấp Tỉnh", scope: "Phòng nghiệp vụ được phân công", users: 9, enabled: 13 },
  { name: "Quản lý cấp Xã", scope: "Đơn vị cấp cơ sở", users: 5, enabled: 15 },
  { name: "Cán bộ cấp Xã", scope: "Nhiệm vụ được giao", users: 18, enabled: 8 }
];

const orgCatalog = [
  { type: "Đơn vị chỉ đạo nghiệp vụ", level: "Cấp TW", name: "Cục Kỹ thuật nghiệp vụ", directorate: "Cục Kỹ thuật nghiệp vụ", province: "Toàn quốc", department: "Ban chỉ đạo", ward: "-", manager: "Nguyễn Văn An", accounts: ["CB001", "CB005"] },
  { type: "Phòng nghiệp vụ", level: "Cấp tỉnh", name: "Phòng Theo dõi thiết bị Hà Nội", directorate: "Cục Kỹ thuật nghiệp vụ", province: "Hà Nội", department: "Phòng Theo dõi thiết bị", ward: "-", manager: "Trần Minh Đức", accounts: ["CB002", "CB004"] },
  { type: "Phòng nghiệp vụ", level: "Cấp tỉnh", name: "Phòng Phân tích dữ liệu Đà Nẵng", directorate: "Cục Kỹ thuật nghiệp vụ", province: "Đà Nẵng", department: "Phòng Phân tích dữ liệu", ward: "-", manager: "Hoàng Anh Tuấn", accounts: ["CB006"] },
  { type: "Đơn vị cấp cơ sở", level: "Cấp xã", name: "Tổ giám sát xã Đông Anh", directorate: "Cục Kỹ thuật nghiệp vụ", province: "Hà Nội", department: "Phòng Theo dõi thiết bị", ward: "Xã Đông Anh", manager: "Phạm Quang Huy", accounts: ["CB003"] },
  { type: "Đơn vị cấp cơ sở", level: "Cấp xã", name: "Tổ giám sát xã Hòa Vang", directorate: "Cục Kỹ thuật nghiệp vụ", province: "Đà Nẵng", department: "Phòng Phân tích dữ liệu", ward: "Xã Hòa Vang", manager: "Võ Thanh Bình", accounts: ["CB007"] }
];

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
  { staffId: "CB001", name: "Nguyễn Văn An", avatar: "NA", phone: "0912 345 111", email: "an.nguyen@themis.vn", role: "Quản lý cấp Cục", directorate: "Cục Kỹ thuật nghiệp vụ", province: "", department: "", ward: "", unit: "Cục Kỹ thuật nghiệp vụ", room: "Ban chỉ đạo", status: "Hoạt động", casesFollowing: ["CA-2026-017", "CA-2026-021"] },
  { staffId: "CB002", name: "Trần Minh Đức", avatar: "TD", phone: "0912 345 222", email: "duc.tran@themis.vn", role: "Quản lý cấp Tỉnh", directorate: "Cục Kỹ thuật nghiệp vụ", province: "Hà Nội", department: "Phòng Theo dõi thiết bị", ward: "", unit: "Phòng Theo dõi thiết bị Hà Nội", room: "Phòng Theo dõi thiết bị", status: "Hoạt động", casesFollowing: ["CA-2026-017"] },
  { staffId: "CB003", name: "Phạm Quang Huy", avatar: "PH", phone: "0912 345 333", email: "huy.pham@themis.vn", role: "Quản lý cấp Xã", directorate: "Cục Kỹ thuật nghiệp vụ", province: "Hà Nội", department: "Phòng Theo dõi thiết bị", ward: "Xã Đông Anh", unit: "Tổ giám sát xã Đông Anh", room: "Tổ Địa bàn", status: "Hoạt động", casesFollowing: ["CA-2026-017"] },
  { staffId: "CB004", name: "Lê Thu Hà", avatar: "LH", phone: "0912 345 444", email: "ha.le@themis.vn", role: "Cán bộ cấp Tỉnh", directorate: "Cục Kỹ thuật nghiệp vụ", province: "Hà Nội", department: "Phòng Theo dõi thiết bị", ward: "", unit: "Phòng Theo dõi thiết bị Hà Nội", room: "Đội Kỹ thuật", status: "Khóa", casesFollowing: ["CA-2026-011"] },
  { staffId: "CB005", name: "Đỗ Minh Khôi", avatar: "DK", phone: "0912 345 555", email: "khoi.do@themis.vn", role: "Cán bộ cấp Cục", directorate: "Cục Kỹ thuật nghiệp vụ", province: "", department: "", ward: "", unit: "Cục Kỹ thuật nghiệp vụ", room: "Phòng Quản trị hệ thống", status: "Hoạt động", casesFollowing: ["CA-2026-017", "CA-2026-011"] },
  { staffId: "CB006", name: "Hoàng Anh Tuấn", avatar: "HT", phone: "0912 345 666", email: "tuan.hoang@themis.vn", role: "Quản lý cấp Tỉnh", directorate: "Cục Kỹ thuật nghiệp vụ", province: "Đà Nẵng", department: "Phòng Phân tích dữ liệu", ward: "", unit: "Phòng Phân tích dữ liệu Đà Nẵng", room: "Đội Chuyên án", status: "Hoạt động", casesFollowing: ["CA-2026-011"] },
  { staffId: "CB007", name: "Võ Thanh Bình", avatar: "VB", phone: "0912 345 777", email: "binh.vo@themis.vn", role: "Quản lý cấp Xã", directorate: "Cục Kỹ thuật nghiệp vụ", province: "Đà Nẵng", department: "Phòng Phân tích dữ liệu", ward: "Xã Hòa Vang", unit: "Tổ giám sát xã Hòa Vang", room: "Tổ Theo dõi", status: "Hoạt động", casesFollowing: ["CA-2026-021"] }
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
  return layout("Cơ cấu tổ chức", "Quản lý Đơn vị chỉ đạo nghiệp vụ, Phòng nghiệp vụ cấp tỉnh và Đơn vị cấp cơ sở cấp xã", `
    <div class="panel">
      <div class="panel-head"><div class="tabs">${["structure:Cơ cấu tổ chức", "departments:Bộ phận nghiệp vụ", "staff:Danh sách tài khoản", "scope:Phạm vi dữ liệu"].map(tabButton("org")).join("")}</div><button class="btn primary" onclick="openModal('unitTypeForm')">Thêm mới cơ cấu</button></div>
      <div class="panel-body">${tab === "structure" ? orgStructure() : orgTab(tab)}</div>
    </div>
  `);
}

function orgStructure() {
  const roots = orgCatalog.filter((item) => item.type === "Đơn vị chỉ đạo nghiệp vụ");
  return `
    <div class="toolbar" style="margin-bottom:12px">
      <button class="btn primary" onclick="openModal('directorateForm')">Thêm đơn vị chỉ đạo nghiệp vụ</button>
      <button class="btn" onclick="openModal('departmentForm')">Thêm phòng nghiệp vụ</button>
      <button class="btn" onclick="openModal('wardUnitForm')">Thêm đơn vị cấp xã</button>
    </div>
    <div class="org-tree classic">
      ${roots.map(orgClassicRoot).join("")}
    </div>
  `;
}

function orgClassicRoot(root) {
  const departmentsInRoot = orgCatalog.filter((item) => item.type === "Phòng nghiệp vụ" && item.directorate === root.directorate);
  return `<div class="org-node">
    ${orgClassicRow(root, "Đơn vị chỉ đạo nghiệp vụ cấp TW")}
    ${departmentsInRoot.map((department) => {
      const wardUnits = orgCatalog.filter((item) => item.type === "Đơn vị cấp cơ sở" && item.directorate === department.directorate && item.province === department.province && item.department === department.department);
      return `<div class="org-node">
        ${orgClassicRow(department, `Phòng nghiệp vụ cấp tỉnh • ${department.province}`)}
        ${wardUnits.map((wardUnit) => `<div class="org-node">${orgClassicRow(wardUnit, `Đơn vị cấp cơ sở • ${wardUnit.ward}`)}</div>`).join("")}
      </div>`;
    }).join("")}
  </div>`;
}

function orgClassicRow(item, label) {
  return `<div class="org-row org-row-tree">
    <div>
      <span class="tag info">${label}</span>
      <strong>${item.name}</strong>
      <span class="muted">${item.directorate} • ${item.department} • Quản lý: ${item.manager}</span>
    </div>
    <div class="row-actions">
      <button class="btn" onclick="openModal('orgAccounts',{name:'${item.name}'})">Tài khoản</button>
      <button class="btn" onclick="openModal('unitTypeForm',{name:'${item.name}',type:'${item.type}'})">Sửa</button>
    </div>
  </div>`;
}

function orgTreeRoot(root) {
  const departmentsInRoot = orgCatalog.filter((item) => item.type === "Phòng nghiệp vụ" && item.directorate === root.directorate);
  return `<div class="org-tree-root">
    ${orgNode(root, "root")}
    <div class="org-tree-children">
      ${departmentsInRoot.map((department) => {
        const wardUnits = orgCatalog.filter((item) => item.type === "Đơn vị cấp cơ sở" && item.directorate === department.directorate && item.province === department.province && item.department === department.department);
        return `<div class="org-tree-branch">
          ${orgNode(department, "department")}
          <div class="org-tree-children leaf">
            ${wardUnits.map((wardUnit) => orgNode(wardUnit, "ward")).join("")}
          </div>
        </div>`;
      }).join("")}
    </div>
  </div>`;
}

function orgNode(item, level) {
  return `<div class="org-node-card ${level}">
    <div>
      <span class="tag ${level === "root" ? "active" : level === "department" ? "info" : "ok"}">${item.type}</span>
      <strong>${item.name}</strong>
      <p>${item.level} • Quản lý: ${item.manager}</p>
      <div class="org-meta">
        <span>${item.directorate}</span>
        <span>${item.province}</span>
        <span>${item.department}</span>
        <span>${item.ward}</span>
      </div>
    </div>
    <div class="toolbar">
      <button class="btn" onclick="openModal('orgAccounts',{name:'${item.name}'})">Tài khoản</button>
      <button class="btn" onclick="openModal('unitTypeForm',{name:'${item.name}',type:'${item.type}'})">Sửa</button>
    </div>
  </div>`;
}

function orgTab(tab) {
  if (tab === "departments") {
    return `<div class="department-board">${orgCatalog.map((item) => departmentAccounts(item)).join("")}</div>`;
  }
  if (tab === "staff") return tableUsers(users, { compact: true });
  return `<div class="list"><div class="list-item"><strong>Dữ liệu mặc định theo cơ cấu</strong>Cán bộ chỉ xem dữ liệu thuộc đơn vị chỉ đạo nghiệp vụ, phòng nghiệp vụ hoặc đơn vị cấp xã được gán.</div><div class="list-item"><strong>Liên thông dữ liệu</strong><span class="tag info">Hà Nội ↔ Đà Nẵng</span> được cấp cho chuyên án CA-2026-011 đến 30/06/2026.</div><button class="btn primary" onclick="openModal('dataBridge')">Cấp quyền liên thông</button></div>`;
}

function rbacView() {
  const tab = state.tabs.rbac;
  return layout("Vai trò và phân quyền", "Tích chọn chức năng được phép sử dụng theo từng vai trò trong 7 nhóm nghiệp vụ", `
    <div class="panel">
      <div class="panel-head"><div class="tabs">${["roles:Danh sách vai trò", "matrix:Phân quyền chức năng", "users:Người dùng thuộc vai trò"].map(tabButton("rbac")).join("")}</div><button class="btn primary" onclick="openModal('roleForm')" ${can("role") ? "" : "disabled"}>Thêm mới vai trò</button></div>
      <div class="panel-body">${tab === "roles" ? rolesList() : tab === "matrix" ? permissionMatrix() : tableUsers(users, { compact: true })}</div>
    </div>
  `);
}

function rolesList() {
  return `<div class="grid cols-3">${roleProfiles.map((r) => `<div class="role-card"><div class="role-card-head"><strong>${r.name}</strong><span class="tag info">${r.users} tài khoản</span></div><p>${r.scope}</p><div class="permission-progress"><span style="width:${Math.min(100, Math.round((r.enabled / totalPermissionCount()) * 100))}%"></span></div><small>${r.enabled}/${totalPermissionCount()} chức năng được cấp</small><div class="toolbar" style="margin-top:12px"><button class="btn" onclick="openModal('roleDetail',{role:'${r.name}'})">Xem</button><button class="btn" onclick="openModal('roleForm',{role:'${r.name}'})">Sửa</button><button class="btn danger" onclick="notify('Đã mô phỏng xóa vai trò ${r.name}')">Xóa</button></div></div>`).join("")}</div>`;
}

function permissionMatrix() {
  return `<div class="permission-board">${permissionModules.map((module, moduleIndex) => `<section class="permission-section"><div class="permission-section-head"><div><strong>${module.name}</strong><p>${module.description}</p></div><span class="tag info">${module.features.length} chức năng</span></div><div class="permission-list">${module.features.map((feature, featureIndex) => `<label class="check-tile"><input type="checkbox" ${moduleIndex < 2 || featureIndex < 2 ? "checked" : ""}>${feature}</label>`).join("")}</div></section>`).join("")}</div>`;
}

function accountsView() {
  return crudPage("Quản lý tài khoản", "Tạo tài khoản cán bộ, xem/sửa/xóa, điều chuyển công tác và đặt lại mật khẩu cho cấp dưới", "Tạo tài khoản", "accountForm", tableUsers(filtered(users, ["staffId", "name", "email", "unit", "role", "status"])));
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

function tableUsers(rows, options = {}) {
  return `<table><thead><tr><th>Mã cán bộ</th><th>Họ và tên</th><th>SĐT</th><th>Mail</th><th>Vai trò</th><th>Đơn vị công tác</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>${rows.map((u) => `<tr><td><strong>${u.staffId}</strong></td><td><div class="staff-cell"><span class="avatar">${u.avatar}</span><span>${u.name}</span></div></td><td>${u.phone}</td><td>${u.email}</td><td>${u.role}</td><td>${placementLabel(u)}</td><td><span class="status ${statusClass(u.status)}">${u.status}</span></td><td class="actions-cell"><button class="btn ghost action-trigger" onclick="openModal('accountActions',{staffId:'${u.staffId}',compact:${options.compact ? "true" : "false"}})">Thao tác</button></td></tr>`).join("")}</tbody></table>`;
}

function totalPermissionCount() {
  return permissionModules.reduce((sum, module) => sum + module.features.length, 0);
}

function placementLabel(user) {
  return [user.directorate, user.province, user.department, user.ward].filter(Boolean).join(" / ") || user.unit;
}

function departmentAccounts(item) {
  const rows = users.filter((user) => item.accounts.includes(user.staffId));
  return `<div class="department-card">
    <div class="department-card-head">
      <div>
        <span class="tag info">${item.type}</span>
        <strong>${item.name}</strong>
        <p>${item.directorate} • ${item.province}${item.ward !== "-" ? ` • ${item.ward}` : ""}</p>
      </div>
      <span class="tag ok">${rows.length} tài khoản</span>
    </div>
    <div class="account-mini-list">
      ${rows.map((user) => `<button class="account-mini" onclick="openModal('accountDetail',{staffId:'${user.staffId}'})"><span class="avatar">${user.avatar}</span><span><strong>${user.staffId} - ${user.name}</strong><small>${user.email} • ${user.phone}</small><small>${user.role}</small></span></button>`).join("")}
    </div>
    <div class="toolbar">
      <button class="btn primary" onclick="openModal('attachAccount',{name:'${item.name}'})">Thêm tài khoản có sẵn</button>
      <button class="btn" onclick="openModal('orgAccounts',{name:'${item.name}'})">Xem danh sách</button>
    </div>
  </div>`;
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
    unitTypeForm: "Thêm mới cơ cấu tổ chức",
    directorateForm: "Thêm đơn vị chỉ đạo nghiệp vụ",
    departmentForm: "Thêm phòng nghiệp vụ",
    wardUnitForm: "Thêm đơn vị cấp xã",
    orgAccounts: "Danh sách tài khoản bộ phận",
    attachAccount: "Thêm tài khoản vào bộ phận",
    dataBridge: "Cấp quyền liên thông dữ liệu",
    roleForm: "Cấu hình vai trò",
    roleDetail: "Thông tin vai trò",
    roleClone: "Sao chép vai trò",
    accountForm: "Tạo/Cập nhật tài khoản",
    accountDetail: "Chi tiết tài khoản",
    accountActions: "Thao tác tài khoản",
    resetPassword: "Đặt lại mật khẩu",
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
    return `<div class="grid cols-3"><div class="list-item"><strong>Admin</strong>Tạo Đơn vị chỉ đạo nghiệp vụ cấp TW và tài khoản quản lý.</div><div class="list-item"><strong>Quản lý cấp Cục</strong>Tạo Phòng nghiệp vụ cấp tỉnh và phân công cán bộ quản lý.</div><div class="list-item"><strong>Quản lý cấp Tỉnh</strong>Tạo Đơn vị cấp cơ sở cấp xã và thêm tài khoản vào bộ phận.</div></div>${orgStructure()}`;
  }
  if (type === "activity") return activityLog();
  if (type === "history") return `<div class="list"><div class="list-item"><strong>${payload.id}</strong>09:00 Cầu Nhật Tân → 09:30 Đông Anh → 10:00 Khu vực A12</div><button class="btn primary" onclick="state.mapLayer='history'; closeModal(); setView('map')">Hiển thị trên bản đồ</button></div>`;
  if (type === "deviceControl") return `<div class="form-grid"><div class="field full"><label>Thiết bị</label><input class="form-control" value="${payload.id || state.selectedDevice}"></div><div class="field"><label>Tần suất gửi vị trí</label><select class="form-control"><option>10 giây/lần</option><option>30 giây/lần</option><option>1 phút/lần</option></select></div><div class="field"><label>Chế độ</label><select class="form-control"><option>Theo dõi liên tục</option><option>Tiết kiệm pin</option><option>Ngủ tạm thời</option></select></div><div class="field full"><label>Lệnh nhanh</label><div class="toolbar"><button class="btn">Ping</button><button class="btn">Cập nhật firmware</button><button class="btn danger">Ngắt kết nối</button></div></div></div>`;
  if (type === "directorateForm") return directorateForm(payload);
  if (type === "departmentForm") return departmentForm(payload);
  if (type === "wardUnitForm") return wardUnitForm(payload);
  if (type === "unitTypeForm") return unitTypeForm(payload);
  if (type === "orgAccounts") return orgAccounts(payload.name);
  if (type === "attachAccount") return attachAccountForm(payload.name);
  if (type === "accountForm") return accountForm(payload.staffId);
  if (type === "accountDetail") return accountDetail(payload.staffId);
  if (type === "accountActions") return accountActions(payload.staffId, payload.compact);
  if (type === "transfer") return transferForm(payload.staffId);
  if (type === "resetPassword") return resetPasswordForm(payload.staffId);
  if (type === "roleForm") return roleForm(payload.role || "Vai trò nghiệp vụ mới");
  if (type === "roleDetail") return roleDetail(payload.role);
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

function selectOptions(items, selected = "") {
  return items.map((item) => `<option ${item === selected ? "selected" : ""}>${item}</option>`).join("");
}

function managerOptions(selected = "") {
  return users.map((user) => `<option ${user.name === selected ? "selected" : ""}>${user.name}</option>`).join("");
}

function unitTypeForm(payload = {}) {
  return `<div class="grid cols-3">
    <button class="list-item" onclick="state.modal={type:'directorateForm',payload:{}}; render()"><strong>Đơn vị chỉ đạo nghiệp vụ</strong><span>Cấp TW: nhập tên đơn vị, chọn cán bộ quản lý, ghi chú.</span></button>
    <button class="list-item" onclick="state.modal={type:'departmentForm',payload:{}}; render()"><strong>Phòng nghiệp vụ</strong><span>Cấp tỉnh: chọn đơn vị chỉ đạo, tỉnh trực thuộc và cán bộ quản lý.</span></button>
    <button class="list-item" onclick="state.modal={type:'wardUnitForm',payload:{}}; render()"><strong>Đơn vị cấp cơ sở</strong><span>Cấp xã: chọn đơn vị chỉ đạo, tỉnh, phòng nghiệp vụ, xã và cán bộ quản lý.</span></button>
  </div>`;
}

function directorateForm(payload = {}) {
  return `<div class="form-grid">
    <div class="field full"><label>Tên đơn vị chỉ đạo nghiệp vụ</label><input class="form-control" value="${payload.name || ""}" placeholder="Ví dụ: Cục Kỹ thuật nghiệp vụ"></div>
    <div class="field full"><label>Cán bộ quản lý</label><select class="form-control">${managerOptions(payload.manager)}</select></div>
    <div class="field full"><label>Ghi chú</label><textarea class="form-control" rows="4" placeholder="Mô tả phạm vi chỉ đạo nghiệp vụ"></textarea></div>
  </div>`;
}

function departmentForm(payload = {}) {
  return `<div class="form-grid">
    <div class="field"><label>Tên phòng nghiệp vụ</label><input class="form-control" value="${payload.name || ""}" placeholder="Ví dụ: Phòng Theo dõi thiết bị"></div>
    <div class="field"><label>Đơn vị chỉ đạo nghiệp vụ</label><select class="form-control">${selectOptions(directorates, payload.directorate)}</select></div>
    <div class="field"><label>Tỉnh trực thuộc</label><select class="form-control">${selectOptions(provinces, payload.province)}</select></div>
    <div class="field"><label>Cán bộ quản lý</label><select class="form-control">${managerOptions(payload.manager)}</select></div>
    <div class="field full"><label>Ghi chú</label><textarea class="form-control" rows="4" placeholder="Ghi chú chức năng, phạm vi địa bàn"></textarea></div>
  </div>`;
}

function wardUnitForm(payload = {}) {
  return `<div class="form-grid">
    <div class="field"><label>Tên đơn vị cấp xã</label><input class="form-control" value="${payload.name || ""}" placeholder="Ví dụ: Tổ giám sát xã Đông Anh"></div>
    <div class="field"><label>Đơn vị chỉ đạo nghiệp vụ</label><select class="form-control">${selectOptions(directorates, payload.directorate)}</select></div>
    <div class="field"><label>Tỉnh trực thuộc</label><select class="form-control">${selectOptions(provinces, payload.province)}</select></div>
    <div class="field"><label>Phòng nghiệp vụ</label><select class="form-control">${selectOptions(departments, payload.department)}</select></div>
    <div class="field"><label>Xã trực thuộc</label><select class="form-control">${selectOptions(wards, payload.ward)}</select></div>
    <div class="field"><label>Cán bộ quản lý</label><select class="form-control">${managerOptions(payload.manager)}</select></div>
    <div class="field full"><label>Ghi chú</label><textarea class="form-control" rows="4" placeholder="Ghi chú địa bàn hoặc nhiệm vụ"></textarea></div>
  </div>`;
}

function orgAccounts(name) {
  const item = orgCatalog.find((unit) => unit.name === name) || orgCatalog[0];
  const rows = users.filter((user) => item.accounts.includes(user.staffId));
  return `<div class="list"><div class="list-item"><strong>${item.name}</strong>${item.type} • ${item.level}<br>Quản lý: ${item.manager}</div>${tableUsers(rows, { compact: true })}<button class="btn primary" onclick="state.modal={type:'attachAccount',payload:{name:'${item.name}'}}; render()">Thêm tài khoản có sẵn</button></div>`;
}

function attachAccountForm(name) {
  return `<div class="form-grid"><div class="field full"><label>Bộ phận</label><input class="form-control" value="${name || ""}"></div><div class="field full"><label>Chọn tài khoản có sẵn</label><select class="form-control">${users.map((user) => `<option>${user.staffId} - ${user.name} - ${user.role}</option>`).join("")}</select></div><div class="field full"><span class="tag info">Tài khoản được thêm sẽ kế thừa phạm vi dữ liệu của bộ phận này.</span></div></div>`;
}

function accountForm(staffId) {
  const user = users.find((item) => item.staffId === staffId) || {};
  return `<div class="form-grid">
    <div class="field"><label>Mã nhân viên</label><input class="form-control" value="${user.staffId || ""}" placeholder="CB008"></div>
    <div class="field"><label>Họ và tên</label><input class="form-control" value="${user.name || ""}" placeholder="Nhập họ tên cán bộ"></div>
    <div class="field"><label>AVT</label><input class="form-control" type="file" accept="image/*"></div>
    <div class="field"><label>SĐT</label><input class="form-control" value="${user.phone || ""}" placeholder="09xx xxx xxx"></div>
    <div class="field"><label>Mail</label><input class="form-control" value="${user.email || ""}" placeholder="email@themis.vn"></div>
    <div class="field"><label>Vai trò</label><select class="form-control">${roles.map((role) => `<option ${role === user.role ? "selected" : ""}>${role}</option>`).join("")}</select></div>
    <div class="field full"><label>Đơn vị làm việc theo vai trò</label><div class="permission-section"><div class="form-grid">
      <div class="field"><label>Đơn vị chỉ đạo nghiệp vụ</label><select class="form-control">${selectOptions(directorates, user.directorate)}</select></div>
      <div class="field"><label>Phòng nghiệp vụ</label><select class="form-control"><option>Không áp dụng cho cấp Cục</option>${selectOptions(departments, user.department)}</select></div>
      <div class="field"><label>Đơn vị cấp xã</label><select class="form-control"><option>Không áp dụng cho cấp Cục/Tỉnh</option>${selectOptions(wards, user.ward)}</select></div>
      <div class="field"><label>Trạng thái</label><select class="form-control"><option ${user.status === "Hoạt động" ? "selected" : ""}>Hoạt động</option><option ${user.status === "Khóa" ? "selected" : ""}>Khóa</option></select></div>
    </div><p class="muted">Cấp Cục chỉ chọn Đơn vị chỉ đạo nghiệp vụ. Cấp phòng nghiệp vụ chọn Đơn vị chỉ đạo nghiệp vụ và Phòng nghiệp vụ. Cấp xã chọn đủ ba cấp.</p></div></div>
  </div>`;
}

function accountDetail(staffId) {
  const user = users.find((item) => item.staffId === staffId) || users[0];
  return `<div class="list"><div class="account-hero"><span class="avatar large">${user.avatar}</span><div><strong>${user.staffId} - ${user.name}</strong><p>${user.role} • ${placementLabel(user)}</p><span class="status ${statusClass(user.status)}">${user.status}</span></div></div><div class="grid cols-2"><div class="list-item"><strong>Liên hệ</strong>${user.phone}<br>${user.email}</div><div class="list-item"><strong>Đơn vị công tác</strong>${placementLabel(user)}</div></div><div class="list-item"><strong>Chuyên án đang theo dõi</strong>${user.casesFollowing.map((id) => `<span class="tag info" style="margin:6px 6px 0 0">${id}</span>`).join("")}</div><div class="toolbar"><button class="btn" onclick="state.modal={type:'accountForm',payload:{staffId:'${user.staffId}'}}; render()">Sửa</button><button class="btn" onclick="state.modal={type:'transfer',payload:{staffId:'${user.staffId}'}}; render()">Điều chuyển công tác</button><button class="btn" onclick="state.modal={type:'resetPassword',payload:{staffId:'${user.staffId}'}}; render()">Đặt lại mật khẩu</button></div></div>`;
}

function accountActions(staffId, compact = false) {
  const user = users.find((item) => item.staffId === staffId) || users[0];
  return `<div class="list">
    <div class="account-hero"><span class="avatar">${user.avatar}</span><div><strong>${user.staffId} - ${user.name}</strong><p>${user.role} • ${placementLabel(user)}</p></div></div>
    <div class="action-list">
      <button class="list-item" onclick="state.modal={type:'accountDetail',payload:{staffId:'${user.staffId}'}}; render()"><strong>Xem chi tiết</strong><span>Thông tin liên hệ, đơn vị công tác và chuyên án đang theo dõi.</span></button>
      <button class="list-item" onclick="state.modal={type:'accountForm',payload:{staffId:'${user.staffId}'}}; render()"><strong>Sửa thông tin</strong><span>Cập nhật hồ sơ, vai trò và đơn vị làm việc.</span></button>
      <button class="list-item" onclick="state.modal={type:'transfer',payload:{staffId:'${user.staffId}'}}; render()"><strong>Điều chuyển công tác</strong><span>Chuyển cán bộ sang đơn vị/phòng/xã khác.</span></button>
      ${compact ? "" : `<button class="list-item" onclick="state.modal={type:'resetPassword',payload:{staffId:'${user.staffId}'}}; render()"><strong>Đặt lại mật khẩu</strong><span>Dành cho tài khoản có quyền cao hơn trong phạm vi quản lý.</span></button>`}
      <button class="list-item danger-action" onclick="notify('Đã mô phỏng xóa tài khoản ${user.staffId}'); closeModal()"><strong>Xóa tài khoản</strong><span>Thao tác demo, không xóa dữ liệu thật.</span></button>
    </div>
  </div>`;
}

function transferForm(staffId) {
  const user = users.find((item) => item.staffId === staffId) || users[0];
  return `<div class="form-grid"><div class="field full"><label>Cán bộ</label><input class="form-control" value="${user.staffId} - ${user.name}"></div><div class="field full"><label>Đơn vị hiện tại</label><input class="form-control" value="${placementLabel(user)}"></div><div class="field"><label>Đơn vị chỉ đạo nghiệp vụ mới</label><select class="form-control">${selectOptions(directorates, user.directorate)}</select></div><div class="field"><label>Tỉnh trực thuộc mới</label><select class="form-control">${selectOptions(provinces, user.province)}</select></div><div class="field"><label>Phòng nghiệp vụ mới</label><select class="form-control">${selectOptions(departments, user.department)}</select></div><div class="field"><label>Đơn vị cấp xã mới</label><select class="form-control">${selectOptions(wards, user.ward)}</select></div><div class="field full"><label>Lý do điều chuyển</label><textarea class="form-control" rows="4" placeholder="Nhập lý do chuyển công tác"></textarea></div></div>`;
}

function resetPasswordForm(staffId) {
  const user = users.find((item) => item.staffId === staffId) || users[0];
  return `<div class="form-grid"><div class="field full"><label>Tài khoản cấp dưới</label><input class="form-control" value="${user.staffId} - ${user.name}"></div><div class="field"><label>Mật khẩu mới</label><input class="form-control" type="password" value="Themis@2026"></div><div class="field"><label>Yêu cầu đổi khi đăng nhập</label><select class="form-control"><option>Có</option><option>Không</option></select></div><div class="field full"><span class="tag warning">Chỉ tài khoản có quyền cao hơn trong cùng phạm vi dữ liệu được đặt lại mật khẩu.</span></div></div>`;
}

function roleForm(role) {
  return `<div class="form-grid"><div class="field"><label>Tên vai trò</label><input class="form-control" value="${role}" placeholder="Nhập tên vai trò"></div><div class="field"><label>Phạm vi dữ liệu</label><select class="form-control"><option>Theo đơn vị công tác</option><option>Đơn vị và cấp dưới</option><option>Liên thông được cấp quyền</option><option>Toàn hệ thống</option></select></div><div class="field full"><label>Chọn tính năng muốn phân quyền</label>${permissionMatrix()}</div><div class="field full"><span class="tag warning">Chỉ Admin hoặc Quản lý cấp Cục được phép thêm, sửa hoặc cấu hình quyền cho vai trò.</span></div></div>`;
}

function roleDetail(role) {
  const profile = roleProfiles.find((item) => item.name === role) || roleProfiles[0];
  return `<div class="list"><div class="list-item"><strong>${profile.name}</strong>${profile.scope}<br>${profile.users} tài khoản đang sử dụng • ${profile.enabled}/${totalPermissionCount()} chức năng được cấp</div>${permissionMatrix()}<div class="toolbar"><button class="btn primary" onclick="state.modal={type:'roleForm',payload:{role:'${profile.name}'}}; render()">Cấu hình quyền</button><button class="btn danger" onclick="notify('Đã mô phỏng xóa vai trò ${profile.name}')">Xóa vai trò</button></div></div>`;
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
