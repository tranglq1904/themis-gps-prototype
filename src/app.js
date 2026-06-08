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
  orgExpanded: {
    "Cục Kỹ thuật nghiệp vụ": true,
    "Phòng Theo dõi thiết bị Hà Nội": true,
    "Phòng Phân tích dữ liệu Đà Nẵng": true
  },
  orgTool: "dashboard",
  orgWizardStep: 1,
  orgInsertParent: "Level 2",
  orgInsertChild: "Level 3",
  orgNewLevelName: "Cụm nghiệp vụ",
  orgScope: { "Level 2A": true, "Level 2B": true, "Level 2C": false },
  orgMapping: {
    "Cụm A1": ["Level 3A1", "Level 3A2", "Level 3A3"],
    "Cụm A2": ["Level 3A4", "Level 3A5"],
    "Cụm B1": ["Level 3B1"],
    "Cụm B2": ["Level 3B2"],
    "Cụm B3": ["Level 3B3"]
  },
  draggedUnit: null,
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
  { type: "Phòng nghiệp vụ", level: "Cấp tỉnh", name: "Phòng Quản lý chuyên án TP Hồ Chí Minh", directorate: "Cục Kỹ thuật nghiệp vụ", province: "TP Hồ Chí Minh", department: "Phòng Quản lý chuyên án", ward: "-", manager: "Đỗ Minh Khôi", accounts: ["CB005"] },
  { type: "Đơn vị cấp cơ sở", level: "Cấp xã", name: "Tổ giám sát xã Đông Anh", directorate: "Cục Kỹ thuật nghiệp vụ", province: "Hà Nội", department: "Phòng Theo dõi thiết bị", ward: "Xã Đông Anh", manager: "Phạm Quang Huy", accounts: ["CB003"] },
  { type: "Đơn vị cấp cơ sở", level: "Cấp xã", name: "Tổ giám sát xã Hòa Vang", directorate: "Cục Kỹ thuật nghiệp vụ", province: "Đà Nẵng", department: "Phòng Phân tích dữ liệu", ward: "Xã Hòa Vang", manager: "Võ Thanh Bình", accounts: ["CB007"] },
  { type: "Đơn vị cấp cơ sở", level: "Cấp xã", name: "Tổ giám sát xã Củ Chi", directorate: "Cục Kỹ thuật nghiệp vụ", province: "TP Hồ Chí Minh", department: "Phòng Quản lý chuyên án", ward: "Xã Củ Chi", manager: "Lê Thu Hà", accounts: ["CB004"] }
];

const dynamicOrgLevels = [
  { order: 1, name: "Phòng/Ban cấp Cục", code: "CUC", required: true, dataScope: "root-descendants" },
  { order: 2, name: "Khu vực", code: "REGION", required: false, dataScope: "descendants" },
  { order: 3, name: "Phòng/Ban cấp Tỉnh", code: "TINH", required: true, dataScope: "descendants" },
  { order: 4, name: "Tổ công tác", code: "TASK_FORCE", required: false, dataScope: "assigned-subtree" },
  { order: 5, name: "Phòng/Ban cấp Xã", code: "XA", required: true, dataScope: "own-and-children" }
];

const restructureSteps = [
  "Chọn vị trí cần chèn cấp mới",
  "Khai báo tên cấp, mã cấp và thứ tự",
  "Tạo các đơn vị thuộc cấp mới",
  "Mapping đơn vị hiện tại sang đơn vị mới",
  "Mapping phòng ban con sang đơn vị mới",
  "Preview trước và sau thay đổi",
  "Xác nhận thực hiện theo transaction",
  "Ghi Audit Log và phát sự kiện đồng bộ quyền"
];

const dynamicFunctionList = [
  ["Level Template", "Tạo/sửa/xóa cấp tổ chức, đổi tên cấp, thay đổi thứ tự cấp."],
  ["Organization Unit", "Tạo node tổ chức, chọn parent, quản lý cán bộ, thiết bị, chuyên án, khu vực."],
  ["Restructure Wizard", "Chèn cấp mới, mapping dữ liệu, preview, xác nhận và audit."],
  ["Merge/Delete Level", "Hợp nhất hoặc xóa cấp khi không còn dữ liệu treo."],
  ["Tree Explorer", "Hiển thị cây phân cấp, tìm kiếm, lọc theo cấp, mở/thu node."],
  ["Inheritance Engine", "Tính phạm vi dữ liệu theo ancestor/descendant và quyền RBAC."],
  ["Rollback & Audit", "Snapshot, transaction, versioning và phục hồi khi tái cấu trúc lỗi."]
];

const inheritanceRules = [
  ["Dữ liệu", "Đơn vị cấp trên xem dữ liệu của toàn bộ descendants nếu vai trò có quyền theo cây. Đơn vị ngang cấp không thấy nhau nếu không có data sharing."],
  ["Cán bộ", "Cán bộ gắn trực tiếp vào một node. Khi chèn cấp mới, cán bộ giữ node hiện tại; quyền phạm vi được tính lại theo ancestors mới."],
  ["Thiết bị", "Thiết bị thuộc owner_unit_id và có thể gán thêm case_id. Khi merge node, owner_unit_id chuyển sang node đích theo mapping."],
  ["Chuyên án", "Chuyên án có owning_unit_id và participant_units. Cấp trên kế thừa quyền xem; quyền sửa/điều phối phụ thuộc vai trò trong chuyên án."],
  ["Khu vực giám sát", "Khu vực thuộc unit_id hoặc case_id. Khi tái cấu trúc, scope được tính lại theo unit closure table."],
  ["Phân quyền", "RBAC = role permission + data scope. Data scope lấy từ org_closure, policy override và share grant."]
];

const dbDesign = [
  ["org_level_template", "id, tenant_id, name, code, sort_order, is_active, created_by"],
  ["org_unit", "id, tenant_id, level_template_id, parent_id, name, code, status, path, version"],
  ["org_closure", "ancestor_id, descendant_id, depth, valid_from, valid_to"],
  ["org_restructure_plan", "id, type, status, draft_payload, preview_diff, created_by"],
  ["org_restructure_mapping", "plan_id, source_unit_id, target_unit_id, mapping_type"],
  ["staff_assignment", "staff_id, org_unit_id, position_type, valid_from, valid_to"],
  ["device_assignment", "device_id, org_unit_id, case_id, valid_from, valid_to"],
  ["rbac_data_scope", "role_id, org_unit_id, scope_type, include_descendants"],
  ["audit_log", "entity_type, entity_id, action, before_json, after_json, request_id"]
];

const apiDesign = [
  ["GET", "/api/org/levels", "Lấy danh sách cấp tổ chức theo thứ tự hiện tại."],
  ["POST", "/api/org/levels/insert", "Tạo draft chèn cấp mới giữa hai cấp."],
  ["POST", "/api/org/restructure-plans", "Tạo kế hoạch tái cấu trúc và mapping."],
  ["POST", "/api/org/restructure-plans/{id}/preview", "Trả cây trước/sau, dữ liệu bị ảnh hưởng, conflict."],
  ["POST", "/api/org/restructure-plans/{id}/commit", "Thực thi transaction, rebuild closure table, ghi audit."],
  ["POST", "/api/org/restructure-plans/{id}/rollback", "Rollback về snapshot/version trước commit."],
  ["GET", "/api/org/tree?rootId=&depth=", "Lấy cây tổ chức động theo node và độ sâu."],
  ["GET", "/api/auth/effective-scope", "Tính phạm vi dữ liệu hiệu lực của người dùng hiện tại."]
];

const dynamicRisks = [
  ["Mất liên kết dữ liệu", "Bắt buộc mapping 100% node con trước commit; validate orphan node."],
  ["Sai phạm vi phân quyền", "Recalculate closure table và effective scope trong transaction; chạy policy diff preview."],
  ["Tái cấu trúc đang có chuyên án hoạt động", "Khóa mềm node liên quan, cho phép commit ngoài giờ hoặc theo batch."],
  ["Thiết bị đang online bị đổi owner", "Không ngắt tracking; chỉ cập nhật ownership metadata và audit."],
  ["Rollback một phần", "Dùng plan version, snapshot before_json và idempotency request_id."],
  ["Hiệu năng cây lớn", "Closure table + materialized path + cache theo tenant/root/version."]
];

const orgDesignerTools = [
  ["dashboard", "Dashboard"],
  ["tree", "Organization Tree"],
  ["designer", "Organization Designer"],
  ["levels", "Level Management"],
  ["wizard", "Restructuring Wizard"],
  ["mapping", "Mapping Drag & Drop"],
  ["validation", "Validation Center"],
  ["preview", "Preview Before/After"],
  ["impact", "Impact Analysis"],
  ["history", "Change History"],
  ["restore", "Version Restore"]
];

const enterpriseLevels = [
  { name: "Level 1", description: "Root organization layer", units: 1 },
  { name: "Level 2", description: "Operational division layer", units: 3 },
  { name: "Level 3", description: "Execution unit layer", units: 8 },
  { name: "Level 4", description: "Optional field team layer", units: 0 }
];

const orgScenario = {
  name: "Level 1",
  level: "Level 1",
  staff: 42,
  devices: 124,
  cases: 18,
  children: [
    {
      name: "Level 2A",
      level: "Level 2",
      staff: 18,
      devices: 54,
      cases: 7,
      children: ["Level 3A1", "Level 3A2", "Level 3A3", "Level 3A4", "Level 3A5"].map((name, index) => ({
        name,
        level: "Level 3",
        staff: 3 + index,
        devices: 8 + index,
        cases: 1 + (index % 2),
        children: []
      }))
    },
    {
      name: "Level 2B",
      level: "Level 2",
      staff: 12,
      devices: 38,
      cases: 5,
      children: ["Level 3B1", "Level 3B2", "Level 3B3"].map((name, index) => ({
        name,
        level: "Level 3",
        staff: 4 + index,
        devices: 9 + index,
        cases: 1,
        children: []
      }))
    },
    { name: "Level 2C", level: "Level 2", staff: 9, devices: 21, cases: 3, children: [] }
  ]
};

const orgVersions = [
  ["v12", "Đang áp dụng", "Chèn Cụm nghiệp vụ giữa Level 2 và Level 3", "2026-06-08 10:24"],
  ["v11", "Đã lưu", "Cơ cấu 3 cấp ban đầu", "2026-06-07 16:10"],
  ["v10", "Đã lưu", "Gộp Level 2 miền Trung", "2026-06-05 09:40"]
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
  return layout("Cơ cấu tổ chức động", "Dynamic Organization Structure: không giới hạn cấp, chèn cấp mới, mapping dữ liệu và kế thừa phân quyền theo cây", `
    <div class="panel">
      <div class="panel-head"><h2>Thiết kế nghiệp vụ & kiến trúc giải pháp</h2><div class="toolbar"><button class="btn primary" onclick="openModal('restructureWizard')">Wizard chèn cấp</button><button class="btn" onclick="openModal('dynamicDbDesign')">DB/API</button><button class="btn" onclick="openModal('rollbackPlan')">Rollback</button></div></div>
      <div class="panel-body">${orgStructure()}</div>
    </div>
  `);
}

function orgStructure() {
  const roots = orgCatalog.filter((item) => item.type === "Đơn vị chỉ đạo nghiệp vụ");
  return `
    <div class="dynamic-org-layout">
      <section class="dynamic-tree-panel">
        <div class="section-title"><h3>Cây tổ chức động</h3><span class="tag info">Ví dụ đã chèn Khu vực và Tổ công tác</span></div>
        <div class="level-pipeline">${dynamicOrgLevels.map((level) => `<div class="level-chip"><strong>${level.order}</strong><span>${level.name}</span><small>${level.required ? "Bắt buộc" : "Tùy chọn"}</small></div>`).join("")}</div>
        <div class="vertical-org-tree">
          ${roots.map(orgVerticalRoot).join("")}
        </div>
      </section>
      <aside class="dynamic-side-panel">
        <h3>Wizard tái cấu trúc</h3>
        <div class="wizard-steps-mini">${restructureSteps.map((step, index) => `<div><b>${index + 1}</b><span>${step}</span></div>`).join("")}</div>
        <button class="btn primary" onclick="openModal('restructureWizard')">Mở wizard demo</button>
      </aside>
    </div>
    <div class="analysis-grid">
      ${dynamicFunctionList.map(([name, desc]) => `<div class="analysis-card"><strong>${name}</strong><p>${desc}</p></div>`).join("")}
    </div>
    <div class="grid cols-2" style="margin-top:14px">
      <section class="panel"><div class="panel-head"><h2>Quy tắc kế thừa</h2></div><div class="panel-body rule-list">${inheritanceRules.map(([name, desc]) => `<div><strong>${name}</strong><span>${desc}</span></div>`).join("")}</div></section>
      <section class="panel"><div class="panel-head"><h2>Rủi ro & xử lý dữ liệu</h2></div><div class="panel-body risk-list">${dynamicRisks.map(([risk, action]) => `<div><strong>${risk}</strong><span>${action}</span></div>`).join("")}</div></section>
    </div>
  `;
}

function toggleOrgNode(name) {
  state.orgExpanded[name] = !state.orgExpanded[name];
  render();
}

function orgVerticalRoot(root) {
  const departmentsInRoot = orgCatalog.filter((item) => item.type === "Phòng nghiệp vụ" && item.directorate === root.directorate);
  return `<div class="tree-level">
    ${orgVerticalRow(root, "Cấp TW", departmentsInRoot.length)}
    <div class="tree-children ${state.orgExpanded[root.name] ? "open" : ""}">
      ${departmentsInRoot.map((department) => {
        const wardUnits = orgCatalog.filter((item) => item.type === "Đơn vị cấp cơ sở" && item.directorate === department.directorate && item.province === department.province && item.department === department.department);
        const regionName = department.province === "Hà Nội" ? "Khu vực miền Bắc" : department.province === "Đà Nẵng" ? "Khu vực miền Trung" : "Khu vực miền Nam";
        const taskForceName = `Tổ công tác ${department.province}`;
        return `<div class="tree-level">
          ${orgSyntheticRow(regionName, `Khu vực • ${department.province}`, department.name, 1)}
          <div class="tree-children open">
            <div class="tree-level">
              ${orgVerticalRow(department, `Cấp tỉnh • ${department.province}`, wardUnits.length)}
              <div class="tree-children ${state.orgExpanded[department.name] ? "open" : ""}">
                <div class="tree-level">
                  ${orgSyntheticRow(taskForceName, "Tổ công tác", department.name + "-task", wardUnits.length)}
                  <div class="tree-children open">
                    ${wardUnits.map((wardUnit) => `<div class="tree-level leaf">${orgVerticalRow(wardUnit, `Cấp xã • ${wardUnit.ward}`, 0)}</div>`).join("")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
      }).join("")}
    </div>
  </div>`;
}

function orgSyntheticRow(name, levelLabel, key, childCount) {
  return `<div class="tree-row synthetic">
    <button class="tree-toggle" disabled></button>
    <div class="tree-main">
      <span class="tag warning">${levelLabel}</span>
      <strong>${name}</strong>
      <small>Cấp được chèn bằng Dynamic Organization Wizard</small>
      <div class="tree-meta"><span>Mapping từ ${key}</span><span>${childCount} cấp dưới</span></div>
    </div>
    <div class="tree-count">${childCount} cấp dưới</div>
    <div class="tree-actions"><button class="btn" onclick="openModal('mappingPreview')">Mapping</button></div>
  </div>`;
}

function orgVerticalRow(item, levelLabel, childCount) {
  const hasChildren = childCount > 0;
  const isOpen = !!state.orgExpanded[item.name];
  return `<div class="tree-row ${hasChildren ? "has-children" : ""}">
    <button class="tree-toggle" ${hasChildren ? `onclick="toggleOrgNode('${item.name}')"` : "disabled"}>${hasChildren ? (isOpen ? "⌄" : "›") : ""}</button>
    <div class="tree-main" ${hasChildren ? `onclick="toggleOrgNode('${item.name}')"` : ""}>
      <span class="tag ${item.type === "Đơn vị chỉ đạo nghiệp vụ" ? "active" : item.type === "Phòng nghiệp vụ" ? "info" : "ok"}">${levelLabel}</span>
      <strong>${item.name}</strong>
      <small>${item.type} • Quản lý: ${item.manager}</small>
      <div class="tree-meta">
        <span>${item.directorate}</span>
        ${item.province && item.province !== "-" ? `<span>${item.province}</span>` : ""}
        ${item.department && item.department !== "-" ? `<span>${item.department}</span>` : ""}
        ${item.ward && item.ward !== "-" ? `<span>${item.ward}</span>` : ""}
      </div>
    </div>
    <div class="tree-count">${hasChildren ? `${childCount} cấp dưới` : "Cấp cuối"}</div>
    <div class="tree-actions">
      <button class="btn" onclick="openModal('orgAccounts',{name:'${item.name}'})">Tài khoản</button>
      <button class="btn" onclick="openModal('unitTypeForm',{name:'${item.name}',type:'${item.type}'})">Sửa</button>
    </div>
  </div>`;
}

function orgChartRoot(root) {
  const departmentsInRoot = orgCatalog.filter((item) => item.type === "Phòng nghiệp vụ" && item.directorate === root.directorate);
  return `<section class="org-chart-root">
    <div class="org-stage">Cấp TW</div>
    ${orgChartCard(root, "tw")}
    <div class="org-chart-branches">
      ${departmentsInRoot.map((department) => {
        const wardUnits = orgCatalog.filter((item) => item.type === "Đơn vị cấp cơ sở" && item.directorate === department.directorate && item.province === department.province && item.department === department.department);
        return `<div class="org-chart-branch">
          <div class="org-stage">Cấp tỉnh</div>
          ${orgChartCard(department, "province")}
          <div class="org-chart-leaves">
            ${wardUnits.map((wardUnit) => `<div class="org-chart-leaf"><div class="org-stage">Cấp xã</div>${orgChartCard(wardUnit, "ward")}</div>`).join("")}
          </div>
        </div>`;
      }).join("")}
    </div>
  </section>`;
}

function orgChartCard(item, variant) {
  const details = [
    ["Đơn vị chỉ đạo", item.directorate],
    ["Tỉnh", item.province],
    ["Phòng nghiệp vụ", item.department],
    ["Xã", item.ward],
    ["Cán bộ quản lý", item.manager]
  ].filter((row) => row[1] && row[1] !== "-");
  return `<article class="org-chart-card ${variant}">
    <div class="org-card-top">
      <span class="tag ${variant === "tw" ? "active" : variant === "province" ? "info" : "ok"}">${item.type}</span>
      <strong>${item.name}</strong>
      <small>${item.level}</small>
    </div>
    <div class="org-card-details">
      ${details.map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join("")}
    </div>
    <div class="org-card-actions">
      <button class="btn" onclick="openModal('orgAccounts',{name:'${item.name}'})">Tài khoản</button>
      <button class="btn" onclick="openModal('unitTypeForm',{name:'${item.name}',type:'${item.type}'})">Sửa</button>
    </div>
  </article>`;
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
    return `<div class="department-board">${orgCatalog.filter((item) => item.type !== "Đơn vị chỉ đạo nghiệp vụ").map((item) => departmentAccounts(item)).join("")}</div>`;
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
    restructureWizard: "Wizard tái cấu trúc tổ chức",
    mappingPreview: "Preview mapping dữ liệu",
    dynamicDbDesign: "Thiết kế DB/API cây động",
    rollbackPlan: "Rollback và kiểm soát rủi ro",
    orgWizard: "Chèn cấp tổ chức",
    splitDepartment: "Tách phòng ban",
    mergeDepartment: "Gộp phòng ban",
    moveUnit: "Chuyển đơn vị",
    restoreVersion: "Khôi phục phiên bản cơ cấu",
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
  if (type === "restructureWizard") return restructureWizard();
  if (type === "mappingPreview") return mappingPreview();
  if (type === "dynamicDbDesign") return dynamicDbApiDesign();
  if (type === "rollbackPlan") return rollbackPlan();
  if (type === "orgWizard") return orgRestructureWizard();
  if (type === "splitDepartment") return orgOperationForm("Tách phòng ban", "Chọn đơn vị nguồn, khai báo đơn vị mới và phân bổ cán bộ/thiết bị/chuyên án sang nhánh mới.");
  if (type === "mergeDepartment") return orgOperationForm("Gộp phòng ban", "Chọn hai hoặc nhiều đơn vị, chọn đơn vị đích, preview dữ liệu hợp nhất và xác nhận.");
  if (type === "moveUnit") return orgOperationForm("Chuyển đơn vị", "Kéo thả hoặc chọn đơn vị nguồn, chọn parent mới, hệ thống chỉ đổi quan hệ cha-con.");
  if (type === "restoreVersion") return orgVersionRestoreModal();
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

function restructureWizard() {
  return `<div class="wizard-demo">
    <div class="wizard-rail">${restructureSteps.map((step, index) => `<div class="${index < 5 ? "done" : index === 5 ? "current" : ""}"><b>${index + 1}</b><span>${step}</span></div>`).join("")}</div>
    <div class="wizard-workspace">
      <div class="form-grid">
        <div class="field"><label>Vị trí chèn cấp mới</label><select class="form-control"><option>Giữa Phòng/Ban cấp Cục và Phòng/Ban cấp Tỉnh</option><option>Giữa Phòng/Ban cấp Tỉnh và Phòng/Ban cấp Xã</option></select></div>
        <div class="field"><label>Tên cấp mới</label><input class="form-control" value="Khu vực"></div>
        <div class="field"><label>Mã cấp</label><input class="form-control" value="REGION"></div>
        <div class="field"><label>Thứ tự mới</label><input class="form-control" value="2"></div>
        <div class="field full"><label>Đơn vị thuộc cấp mới</label><textarea class="form-control" rows="3">Khu vực miền Bắc -> Phòng Theo dõi thiết bị Hà Nội
Khu vực miền Trung -> Phòng Phân tích dữ liệu Đà Nẵng
Khu vực miền Nam -> Phòng Quản lý chuyên án TP Hồ Chí Minh</textarea></div>
      </div>
      <div class="preview-split">
        <div><strong>Trước thay đổi</strong><p>Cục -> Tỉnh -> Xã</p></div>
        <div><strong>Sau thay đổi</strong><p>Cục -> Khu vực -> Tỉnh -> Tổ công tác -> Xã</p></div>
      </div>
    </div>
  </div>`;
}

function mappingPreview() {
  return `<div class="grid cols-2">
    <div class="list-item"><strong>Mapping đơn vị hiện tại sang cấp mới</strong><table><tbody><tr><td>Phòng Theo dõi thiết bị Hà Nội</td><td>Khu vực miền Bắc</td></tr><tr><td>Phòng Phân tích dữ liệu Đà Nẵng</td><td>Khu vực miền Trung</td></tr><tr><td>Phòng Quản lý chuyên án TP Hồ Chí Minh</td><td>Khu vực miền Nam</td></tr></tbody></table></div>
    <div class="list-item"><strong>Mapping dữ liệu con</strong><table><tbody><tr><td>Cán bộ</td><td>Giữ node hiện tại, tính lại ancestors</td></tr><tr><td>Thiết bị</td><td>Giữ owner_unit_id, cập nhật scope</td></tr><tr><td>Chuyên án</td><td>Giữ owning_unit_id và participant_units</td></tr><tr><td>Khu vực giám sát</td><td>Tính lại theo org_closure</td></tr></tbody></table></div>
  </div>`;
}

function dynamicDbApiDesign() {
  return `<div class="grid cols-2">
    <div class="list"><h3>Database</h3>${dbDesign.map(([table, desc]) => `<div class="list-item"><strong>${table}</strong><span>${desc}</span></div>`).join("")}</div>
    <div class="list"><h3>API</h3>${apiDesign.map(([method, path, desc]) => `<div class="list-item"><strong>${method} ${path}</strong><span>${desc}</span></div>`).join("")}</div>
  </div>`;
}

function rollbackPlan() {
  return `<div class="list">
    <div class="list-item"><strong>Cơ chế rollback</strong>Toàn bộ tái cấu trúc chạy bằng restructure_plan version. Trước commit lưu snapshot before_json, rebuild org_closure trong transaction, nếu lỗi thì rollback transaction. Nếu lỗi sau commit, dùng rollback plan để khôi phục parent_id, closure table, assignment và RBAC scope về version trước.</div>
    <div class="list-item"><strong>Idempotency</strong>Mỗi lệnh commit dùng request_id để tránh chạy trùng khi retry.</div>
    <div class="list-item"><strong>Audit Log</strong>Ghi actor, thời gian, before/after JSON, số node ảnh hưởng, mapping và trạng thái commit/rollback.</div>
    <div class="risk-list">${dynamicRisks.map(([risk, action]) => `<div><strong>${risk}</strong><span>${action}</span></div>`).join("")}</div>
  </div>`;
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

function orgView() {
  return layout("Dynamic Organization Structure", "Prototype Enterprise SaaS cho cơ cấu tổ chức không giới hạn cấp và tái cấu trúc không mất dữ liệu", `
    <div class="org-saas">
      <aside class="org-saas-nav">
        ${orgDesignerTools.map(([id, label]) => `<button class="${state.orgTool === id ? "active" : ""}" onclick="state.orgTool='${id}'; render()">${label}</button>`).join("")}
      </aside>
      <section class="org-saas-main">${orgToolView()}</section>
    </div>
  `);
}

function orgToolView() {
  const views = {
    dashboard: orgDashboard,
    tree: orgTreeScreen,
    designer: orgDesigner,
    levels: orgLevelManagement,
    wizard: orgWizardScreen,
    mapping: orgMappingScreen,
    validation: orgValidationScreen,
    preview: orgPreviewScreen,
    impact: orgImpactScreen,
    history: orgHistoryScreen,
    restore: orgRestoreScreen
  };
  return (views[state.orgTool] || orgDashboard)();
}

function orgDashboard() {
  const stats = [
    ["Cấp tổ chức", enterpriseLevels.length, "Không giới hạn, quản lý bằng template"],
    ["Đơn vị", 12, "Bao gồm đơn vị hiện tại và đơn vị trung gian mới"],
    ["Cán bộ", 126, "Giữ nguyên assignment khi tái cấu trúc"],
    ["Thiết bị", 356, "Không ngắt tracking khi đổi parent"],
    ["Chuyên án", 42, "Giữ owning_unit và participant_units"],
    ["Phiên bản", 12, "Có thể restore phiên bản trước"]
  ];
  return `<div class="org-page">
    <div class="org-hero">
      <div><h2>Organization Restructuring Workspace</h2><p>Chèn cấp mới giữa bất kỳ cặp Parent Level - Child Level, mapping đơn vị con bằng drag & drop, preview và commit bằng transaction.</p></div>
      <div class="toolbar"><button class="btn primary" onclick="state.orgTool='wizard'; render()">Chèn cấp tổ chức</button><button class="btn" onclick="state.orgTool='preview'; render()">Preview Before/After</button></div>
    </div>
    <div class="grid cols-3">${stats.map(([label, value, hint]) => `<div class="kpi"><span>${label}</span><strong>${value}</strong><small>${hint}</small></div>`).join("")}</div>
    <div class="grid cols-2" style="margin-top:14px"><div class="panel"><div class="panel-head"><h2>Cây hiện tại</h2></div><div class="panel-body">${orgTreeMarkup(orgScenario, [])}</div></div><div class="panel"><div class="panel-head"><h2>Luồng tái cấu trúc</h2></div><div class="panel-body">${orgStepRail()}</div></div></div>
  </div>`;
}

function orgTreeScreen() {
  return `<div class="org-page"><div class="panel"><div class="panel-head"><h2>Organization Tree</h2><div class="toolbar"><button class="btn" onclick="openModal('moveUnit')">Drag & Drop đơn vị</button><button class="btn primary" onclick="state.orgTool='wizard'; render()">Chèn cấp</button></div></div><div class="panel-body org-tree-browser">${orgTreeMarkup(orgScenario, [])}</div></div></div>`;
}

function orgTreeMarkup(node, path) {
  const nextPath = [...path, node.name];
  const children = node.children || [];
  return `<div class="org-unit-node">
    <div class="org-unit-row" draggable="true" ondragstart="state.draggedUnit='${node.name}'">
      <button class="tree-toggle" ${children.length ? `onclick="toggleOrgNode('${node.name}')"` : "disabled"}>${children.length ? (state.orgExpanded[node.name] === false ? ">" : "v") : ""}</button>
      <div class="org-unit-main">
        <strong>${node.name}</strong><span>${node.level}</span>
        <small>${nextPath.join(" / ")}</small>
      </div>
      <div class="org-unit-metrics"><span>${children.length} con</span><span>${node.staff} cán bộ</span><span>${node.devices} thiết bị</span><span>${node.cases} chuyên án</span></div>
    </div>
    <div class="org-unit-children ${state.orgExpanded[node.name] === false ? "" : "open"}">${children.map((child) => orgTreeMarkup(child, nextPath)).join("")}</div>
  </div>`;
}

function orgDesigner() {
  return `<div class="org-page">
    <div class="panel"><div class="panel-head"><h2>Organization Designer</h2><div class="toolbar"><button class="btn" onclick="openModal('splitDepartment')">Tách phòng ban</button><button class="btn" onclick="openModal('mergeDepartment')">Gộp phòng ban</button><button class="btn" onclick="openModal('moveUnit')">Chuyển đơn vị</button></div></div>
    <div class="panel-body designer-canvas"><div class="designer-lane">${enterpriseLevels.map((level) => `<div class="designer-level"><span>${level.name}</span><strong>${level.units} units</strong><button class="btn" onclick="state.orgTool='levels'; render()">Sửa cấp</button></div>`).join("")}</div><div class="designer-note">Kéo thả để điều chỉnh thứ tự cấp. Chèn cấp mới sẽ tạo plan, không thay đổi dữ liệu cho đến khi commit.</div></div></div>
  </div>`;
}

function orgLevelManagement() {
  return `<div class="org-page"><div class="panel"><div class="panel-head"><h2>Level Management</h2><button class="btn primary" onclick="openModal('orgWizard')">Tạo cấp mới</button></div><div class="panel-body"><table><thead><tr><th>Thứ tự</th><th>Tên cấp</th><th>Mô tả</th><th>Đơn vị</th><th>Thao tác</th></tr></thead><tbody>${enterpriseLevels.map((level, index) => `<tr><td>${index + 1}</td><td><strong>${level.name}</strong></td><td>${level.description}</td><td>${level.units}</td><td class="toolbar"><button class="btn">Đổi tên</button><button class="btn">Sắp xếp</button><button class="btn danger">Xóa</button></td></tr>`).join("")}</tbody></table></div></div></div>`;
}

function orgWizardScreen() {
  return `<div class="org-page"><div class="wizard-shell"><div>${orgStepRail()}</div><div class="panel"><div class="panel-head"><h2>Bước ${state.orgWizardStep}: ${restructureSteps[state.orgWizardStep - 1] || "Xác nhận"}</h2><div class="toolbar"><button class="btn" onclick="state.orgWizardStep=Math.max(1,state.orgWizardStep-1); render()">Trước</button><button class="btn primary" onclick="state.orgWizardStep=Math.min(10,state.orgWizardStep+1); render()">Tiếp</button></div></div><div class="panel-body">${orgWizardStepBody()}</div></div></div></div>`;
}

function orgStepRail() {
  const steps = ["Chọn Parent/Child Level", "Nhập cấp mới", "Chọn phạm vi", "Tạo đơn vị trung gian", "Mapping Drag & Drop", "Validation", "Preview Before/After", "Impact Analysis", "Xác nhận", "Audit Log"];
  return `<div class="wizard-steps-mini">${steps.map((step, index) => `<button class="${state.orgWizardStep === index + 1 ? "current" : index + 1 < state.orgWizardStep ? "done" : ""}" onclick="state.orgWizardStep=${index + 1}; state.orgTool='wizard'; render()"><b>${index + 1}</b><span>${step}</span></button>`).join("")}</div>`;
}

function orgWizardStepBody() {
  if (state.orgWizardStep === 1) return `<div class="form-grid"><div class="field"><label>Parent Level</label><select class="form-control" onchange="state.orgInsertParent=this.value">${enterpriseLevels.map((l) => `<option ${l.name === state.orgInsertParent ? "selected" : ""}>${l.name}</option>`).join("")}</select></div><div class="field"><label>Child Level</label><select class="form-control" onchange="state.orgInsertChild=this.value">${enterpriseLevels.map((l) => `<option ${l.name === state.orgInsertChild ? "selected" : ""}>${l.name}</option>`).join("")}</select></div><div class="field full"><span class="tag info">Có thể chọn bất kỳ cặp cấp cha-con đang tồn tại.</span></div></div>`;
  if (state.orgWizardStep === 2) return `<div class="form-grid"><div class="field"><label>Tên cấp mới</label><input class="form-control" value="${state.orgNewLevelName}" oninput="state.orgNewLevelName=this.value"></div><div class="field"><label>Mô tả cấp</label><input class="form-control" value="Nhóm trung gian để gom các đơn vị cấp dưới theo nghiệp vụ"></div></div>`;
  if (state.orgWizardStep === 3) return `<div class="permission-list">${Object.keys(state.orgScope).map((name) => `<label class="check-tile"><input type="checkbox" ${state.orgScope[name] ? "checked" : ""} onchange="state.orgScope['${name}']=this.checked; render()">${name}</label>`).join("")}</div>`;
  if (state.orgWizardStep === 4) return orgIntermediateUnits();
  if (state.orgWizardStep === 5) return orgMappingScreen();
  if (state.orgWizardStep === 6) return orgValidationScreen();
  if (state.orgWizardStep === 7) return orgPreviewScreen();
  if (state.orgWizardStep === 8) return orgImpactScreen();
  if (state.orgWizardStep === 9) return `<div class="confirm-box"><strong>Sẵn sàng thực hiện</strong><p>Hệ thống chỉ cập nhật quan hệ cha-con giữa các đơn vị. Cán bộ, thiết bị, chuyên án, phân quyền và lịch sử được bảo toàn.</p><button class="btn primary" onclick="notify('Đã commit tái cấu trúc tổ chức theo transaction')">Xác nhận thực hiện</button></div>`;
  return orgHistoryScreen();
}

function orgIntermediateUnits() {
  return `<div class="grid cols-2">${Object.entries(state.orgScope).filter(([, enabled]) => enabled).map(([parent]) => `<div class="list-item"><strong>${parent}</strong><div class="tag info" style="margin-top:8px">${parent === "Level 2A" ? "Cụm A1, Cụm A2" : "Cụm B1, Cụm B2, Cụm B3"}</div></div>`).join("")}</div>`;
}

function orgMappingScreen() {
  const assigned = Object.values(state.orgMapping).flat();
  const all = ["Level 3A1", "Level 3A2", "Level 3A3", "Level 3A4", "Level 3A5", "Level 3B1", "Level 3B2", "Level 3B3"];
  const unassigned = all.filter((unit) => !assigned.includes(unit));
  return `<div class="mapping-board">
    <div class="mapping-pool"><h3>Chưa phân bổ</h3>${unassigned.map(mappingChip).join("") || `<div class="empty-drop">Tất cả đơn vị đã được phân bổ</div>`}</div>
    <div class="mapping-targets">${Object.keys(state.orgMapping).map((target) => `<div class="mapping-target" ondragover="event.preventDefault()" ondrop="dropOrgUnit('${target}')"><h3>${target}</h3>${state.orgMapping[target].map(mappingChip).join("")}<div class="empty-drop">Thả đơn vị vào đây</div></div>`).join("")}</div>
  </div>`;
}

function mappingChip(name) {
  return `<div class="mapping-chip" draggable="true" ondragstart="state.draggedUnit='${name}'">${name}</div>`;
}

function dropOrgUnit(target) {
  const unit = state.draggedUnit;
  if (!unit) return;
  Object.keys(state.orgMapping).forEach((key) => {
    state.orgMapping[key] = state.orgMapping[key].filter((item) => item !== unit);
  });
  state.orgMapping[target].push(unit);
  state.draggedUnit = null;
  render();
}

function orgValidationScreen() {
  const duplicate = [];
  const empty = Object.entries(state.orgMapping).filter(([, units]) => units.length === 0).map(([name]) => name);
  return `<div class="validation-grid"><div class="validation-card ok"><strong>Đơn vị chưa phân bổ</strong><span>0</span><p>Tất cả Level 3 đã được mapping.</p></div><div class="validation-card ok"><strong>Phân bổ trùng</strong><span>${duplicate.length}</span><p>Không có đơn vị bị gán nhiều nơi.</p></div><div class="validation-card ${empty.length ? "warning" : "ok"}"><strong>Cụm chưa có con</strong><span>${empty.length}</span><p>${empty.length ? empty.join(", ") : "Tất cả cụm hợp lệ."}</p></div></div>`;
}

function orgPreviewScreen() {
  return `<div class="preview-compare"><div class="panel"><div class="panel-head"><h2>Before</h2></div><div class="panel-body">${orgTreeMarkup(orgScenario, [])}</div></div><div class="panel after-animate"><div class="panel-head"><h2>After</h2></div><div class="panel-body">${orgAfterTree()}</div></div></div>`;
}

function orgAfterTree() {
  return `<div class="after-tree"><strong>Level 1</strong>${Object.entries(state.orgScope).filter(([, enabled]) => enabled).map(([parent]) => `<div><strong>${parent}</strong>${Object.entries(state.orgMapping).filter(([cluster]) => cluster.includes(parent.endsWith("A") ? "A" : "B")).map(([cluster, units]) => `<div><strong>${cluster}</strong>${units.map((u) => `<span>${u}</span>`).join("")}</div>`).join("")}</div>`).join("")}<div><strong>Level 2C</strong></div></div>`;
}

function orgImpactScreen() {
  const impactedUnits = Object.values(state.orgMapping).flat().length + Object.keys(state.orgMapping).length;
  return `<div class="impact-grid">${[["Cấp bị ảnh hưởng", 2], ["Đơn vị bị ảnh hưởng", impactedUnits], ["Cán bộ", 73], ["Thiết bị", 216], ["Chuyên án", 24], ["Tài khoản", 86]].map(([label, value]) => `<div class="kpi"><span>${label}</span><strong>${value}</strong><small>Được bảo toàn dữ liệu</small></div>`).join("")}<div class="impact-safe"><span>✓ Không mất dữ liệu</span><span>✓ Không mất phân quyền</span><span>✓ Không mất lịch sử hoạt động</span></div></div>`;
}

function orgHistoryScreen() {
  return `<div class="panel"><div class="panel-head"><h2>Change History</h2></div><div class="panel-body"><table><thead><tr><th>Version</th><th>Trạng thái</th><th>Thay đổi</th><th>Thời gian</th></tr></thead><tbody>${orgVersions.map((v) => `<tr><td><strong>${v[0]}</strong></td><td>${v[1]}</td><td>${v[2]}</td><td>${v[3]}</td></tr>`).join("")}</tbody></table></div></div>`;
}

function orgRestoreScreen() {
  return `<div class="grid cols-3">${orgVersions.map((v) => `<div class="role-card"><div class="role-card-head"><strong>${v[0]}</strong><span class="tag info">${v[1]}</span></div><p>${v[2]}<br>${v[3]}</p><button class="btn primary" onclick="openModal('restoreVersion',{version:'${v[0]}'})">Khôi phục</button></div>`).join("")}</div>`;
}

function orgRestructureWizard() {
  return `<div class="list"><div class="list-item"><strong>Chèn cấp tổ chức</strong>Prototype hỗ trợ chọn Parent Level và Child Level bất kỳ, tạo cấp mới, chọn phạm vi, tạo đơn vị trung gian, drag & drop mapping, validate, preview và commit.</div>${orgWizardScreen()}</div>`;
}

function orgOperationForm(title, desc) {
  return `<div class="form-grid"><div class="field full"><label>Nghiệp vụ</label><input class="form-control" value="${title}"></div><div class="field full"><label>Mô tả</label><textarea class="form-control" rows="4">${desc}</textarea></div><div class="field"><label>Đơn vị nguồn</label><select class="form-control"><option>Level 2A</option><option>Level 2B</option><option>Level 3A1</option></select></div><div class="field"><label>Đơn vị đích</label><select class="form-control"><option>Level 2B</option><option>Cụm A1</option><option>Cụm B2</option></select></div></div>`;
}

function orgVersionRestoreModal() {
  return `<div class="list"><div class="list-item"><strong>Khôi phục phiên bản</strong>Hệ thống tạo restore plan, preview diff, khóa mềm các node liên quan và commit bằng transaction. Dữ liệu nghiệp vụ không bị xóa.</div>${orgRestoreScreen()}</div>`;
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
