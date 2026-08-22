# Dayflow - Human Resource Management System (Architecture Blueprint)

This document serves as the single source of truth for the project architecture and work breakdown for the 8-hour hackathon. 

---

## 1. Developer Work Breakdown & Collaboration Strategy

To ensure parallel development without merge conflicts, the system is strictly divided.

### ⚠️ Shared Core (Team Must Agree Before Coding)
Before individual work begins, the team must define and scaffold:
- **Database Connection**: MongoDB URI and Mongoose initialization.
- **Authentication Strategy**: JWT secret, standard payload (`{ userId, role }`).
- **API Response Structure**: e.g., `{ success: boolean, data: any, message: string }`.
- **Base UI Layout**: Standard layout wrapper with Sidebar and Navbar components.
- **API Client**: Axios instance with standard authorization header interceptor.
- **Routing Setup**: React Router configuration for public and protected routes.

### Work Breakdown
- **Developer 1**: Authentication, Authorization, Employee/Profile Management, Employee Dashboard.
- **Developer 2**: Attendance Management.
- **Developer 3**: Leave & Time-Off Management, Notifications (Alerts).
- **Developer 4**: Payroll/Salary Management, Admin Dashboard, Analytics & Reports.

---

## 2. Module Specifications

### Module 1: Authentication & Authorization (Dev 1)
- **Responsibilities**: Secure login, JWT creation/validation, route protection, role-based access control (RBAC).
- **Frontend pages**: `/login`, `/unauthorized`.
- **Frontend components**: `LoginForm`, `ProtectedRoute`.
- **Backend routes**: `POST /api/auth/login`, `GET /api/auth/me`.
- **Controllers**: `authController`.
- **Services**: `authService` (password verification), `tokenService`.
- **Database models**: `User` (Shared with Employee module).
- **Important fields**: `email`, `passwordHash`, `role` (Enum: `ADMIN`, `HR`, `EMPLOYEE`).
- **Role permissions**: All roles can authenticate. Only authenticated users can access the system.
- **Dependencies**: None.

### Module 2: Employee/Profile Management (Dev 1)
- **Responsibilities**: CRUD operations for employee records, personal profile viewing.
- **Frontend pages**: `/employees` (Admin/HR), `/employees/new`, `/employees/:id`, `/profile` (Employee).
- **Frontend components**: `EmployeeTable`, `EmployeeForm`, `ProfileCard`.
- **Backend routes**: `GET /api/employees`, `POST /api/employees`, `GET /api/employees/:id`, `PUT /api/employees/:id`.
- **Controllers**: `employeeController`.
- **Services**: `employeeService`.
- **Database models**: `User`.
- **Important fields**: `firstName`, `lastName`, `department`, `designation`, `joiningDate`, `baseSalary`, `contactNumber`.
- **Relationships**: 1:N with Attendance, Leaves, Payroll.
- **Role permissions**: Admin/HR can create/edit all employees. Employees can only view/edit limited fields of their own profile.
- **Dependencies**: Auth.

### Module 3: Attendance Management (Dev 2)
- **Responsibilities**: Daily clock-in/clock-out tracking, total hours calculation.
- **Frontend pages**: `/attendance` (Employee), `/admin/attendance` (Admin/HR).
- **Frontend components**: `ClockInOutWidget`, `AttendanceHistoryList`, `AdminAttendanceTable`.
- **Backend routes**: `POST /api/attendance/clock-in`, `POST /api/attendance/clock-out`, `GET /api/attendance/my`, `GET /api/attendance/all`.
- **Controllers**: `attendanceController`.
- **Services**: `attendanceService`.
- **Database models**: `Attendance`.
- **Important fields**: `userId` (Ref), `date`, `clockInTime`, `clockOutTime`, `status` (`PRESENT`, `HALF_DAY`, `ABSENT`).
- **Relationships**: N:1 with User.
- **Role permissions**: Employees clock in/out for themselves. HR/Admin views company-wide attendance and can manually adjust records.
- **Dependencies**: Employee (userId).

### Module 4: Leave & Time-Off Management (Dev 3)
- **Responsibilities**: Applying for leave, viewing leave balances, HR approval workflow.
- **Frontend pages**: `/leaves` (Employee), `/admin/leaves` (HR/Admin).
- **Frontend components**: `LeaveApplicationForm`, `LeaveBalanceCards`, `PendingApprovalsTable`.
- **Backend routes**: `POST /api/leaves`, `GET /api/leaves/my`, `GET /api/leaves/pending`, `PUT /api/leaves/:id/status`.
- **Controllers**: `leaveController`.
- **Services**: `leaveService`.
- **Database models**: `LeaveRequest`, `LeaveBalance`.
- **Important fields**: `userId` (Ref), `startDate`, `endDate`, `type` (`SICK`, `CASUAL`, `EARNED`), `reason`, `status` (`PENDING`, `APPROVED`, `REJECTED`).
- **Relationships**: N:1 with User.
- **Role permissions**: Employee applies and views own status. HR/Admin approves or rejects.
- **Dependencies**: Employee.

### Module 5: Payroll/Salary Management (Dev 4)
- **Responsibilities**: Calculating monthly salary, applying deductions based on attendance/leave, generating payslips.
- **Frontend pages**: `/payslips` (Employee), `/admin/payroll` (HR/Admin).
- **Frontend components**: `PayrollGenerationPanel`, `PayslipList`, `PayslipDocument`.
- **Backend routes**: `POST /api/payroll/generate`, `GET /api/payroll/my`, `GET /api/payroll/all`.
- **Controllers**: `payrollController`.
- **Services**: `payrollService`.
- **Database models**: `Payroll`.
- **Important fields**: `userId` (Ref), `month`, `year`, `basicSalary`, `deductions` (unpaid leaves), `netSalary`, `status` (`DRAFT`, `PAID`).
- **Relationships**: N:1 with User.
- **Role permissions**: HR/Admin triggers generation. Employee downloads their own payslips.
- **Dependencies**: Employee (for base salary), Attendance, Leave.

### Module 6 & 7: Dashboards (Dev 1 & Dev 4)
- **Responsibilities**: Quick overview of relevant metrics.
- **Employee Dashboard (Dev 1)**: Today's attendance status, recent announcements, upcoming approved leaves.
- **Admin Dashboard (Dev 4)**: Headcount, today's present/absent ratio, pending leave requests count.
- **Frontend pages**: `/dashboard` (renders different views based on role).

### Module 8: Notifications (Dev 3)
- **Responsibilities**: Alerts for state changes (e.g., leave approved).
- **Implementation**: Simple boolean/status flags on the dashboard or lightweight `Notification` DB collection (Title, Message, ReadStatus).

### Module 9: Analytics & Reports (Dev 4)
- **Responsibilities**: Exporting data or visualizing trends.
- **Implementation**: API endpoint `GET /api/reports/monthly-attendance` exporting CSV or JSON for Recharts in the frontend.

---

## 3. Project Folder Structure

### `client/` (React + Vite)
```
client/
├── public/
├── src/
│   ├── assets/             # Images, global CSS
│   ├── components/         # Shared UI (Button, Modal, Layout, Navbar, Sidebar)
│   ├── context/            # React Context (AuthContext)
│   ├── hooks/              # Custom Hooks (useAuth, useAxios)
│   ├── pages/              # Page views (grouped by module)
│   │   ├── auth/           # Login.jsx
│   │   ├── dashboard/      # AdminDashboard.jsx, EmployeeDashboard.jsx
│   │   ├── employees/      # EmployeeList.jsx, EmployeeForm.jsx, Profile.jsx
│   │   ├── attendance/     # AttendanceTracker.jsx, AdminAttendance.jsx
│   │   ├── leave/          # LeaveForm.jsx, LeaveApprovals.jsx
│   │   └── payroll/        # PayrollGenerator.jsx, Payslips.jsx
│   ├── services/           # Axios API integrations (api.js, authAPI.js, etc.)
│   ├── utils/              # Helper functions (dateFormatter.js, constants.js)
│   ├── App.jsx             # Router definition
│   └── main.jsx            # Entry point
├── package.json
└── tailwind.config.js
```

### `server/` (Node + Express)
```
server/
├── src/
│   ├── config/             # db.js (Mongoose setup)
│   ├── controllers/        # Route handlers (auth.controller.js, leave.controller.js)
│   ├── middleware/         # Custom middleware (auth.middleware.js, role.middleware.js, error.middleware.js)
│   ├── models/             # Mongoose schemas (User.js, Attendance.js, Leave.js, Payroll.js)
│   ├── routes/             # Express routes (auth.routes.js, employee.routes.js)
│   ├── services/           # Business logic (payroll.service.js)
│   ├── utils/              # Helper functions
│   └── app.js              # Express app configuration (middlewares, routes mounting)
├── server.js               # Entry point (Server listen)
├── package.json
└── .env                    # Environment variables (MONGO_URI, JWT_SECRET, PORT)
```

---

## 4. Flows and Data Models

### 1. MongoDB Data Model Relationships
- `User` (1) ─── (<) `Attendance`
- `User` (1) ─── (<) `LeaveRequest`
- `User` (1) ─── (1) `LeaveBalance`
- `User` (1) ─── (<) `Payroll`

### 2. REST API Endpoints List (Summary)
- **Auth**: `POST /api/auth/login`
- **Users**: `GET, POST /api/employees`, `GET, PUT, DELETE /api/employees/:id`
- **Attendance**: `POST /api/attendance/clock-in`, `POST /api/attendance/clock-out`, `GET /api/attendance`
- **Leave**: `POST /api/leaves`, `GET /api/leaves`, `PUT /api/leaves/:id/status`
- **Payroll**: `POST /api/payroll/generate`, `GET /api/payroll`

### 3. Authentication & Role-Based Authorization Flow
1. User submits credentials to `/login`.
2. Backend verifies bcrypt hash and returns JWT containing `{ userId: "123", role: "EMPLOYEE" }`.
3. Frontend stores JWT in localStorage/cookies and updates `AuthContext`.
4. API requests attach JWT in `Authorization: Bearer <token>` header.
5. Backend `authMiddleware` verifies token validity.
6. Backend `roleMiddleware('ADMIN', 'HR')` verifies role before allowing access to protected endpoints.

### 4. Employee User Flow
- Log in ➔ View Employee Dashboard ➔ Click "Clock In" ➔ View assigned schedule ➔ Apply for Leave ➔ View own Payslips.

### 5. Admin/HR User Flow
- Log in ➔ View Admin Dashboard (Metrics) ➔ Add new employee account ➔ View all pending leave requests ➔ Approve/Reject leaves ➔ Generate Payroll at month end.

### 6. Leave Approval Flow
- Employee submits `LeaveRequest` (Status: `PENDING`).
- Admin sees request in Dashboard.
- Admin clicks "Approve". API updates status to `APPROVED`.
- Backend triggers reduction in employee's `LeaveBalance`.

### 7. Attendance Flow
- Employee clicks "Clock In" (Frontend grabs current timestamp) ➔ POST to API ➔ DB creates `Attendance` record with `clockInTime`.
- Employee clicks "Clock Out" ➔ POST to API ➔ DB updates `Attendance` record with `clockOutTime` and sets `status` based on duration.

### 8. Payroll Generation Flow
- HR navigates to Payroll panel ➔ Selects "Month/Year" ➔ Clicks "Generate".
- Backend fetches all active employees ➔ Fetches their attendance & approved leaves for the month ➔ Calculates LOP (Loss of Pay) ➔ Computes `netSalary` = `baseSalary` - `deductions` ➔ Saves `Payroll` records.

---

## 5. Hackathon Prioritization Matrix

Given the 8-hour constraint, adhere strictly to this priority list:

### 🔥 MUST-HAVE (Focus on these for the first 6 hours)
1. **Auth**: JWT Login, Role-based route protection.
2. **Employee**: Create/View employees (Basic HR functionality).
3. **Attendance**: Simple Clock-In / Clock-Out button.
4. **Leave**: Basic Leave Application & Approval form.
5. **Dashboard**: Extremely basic dashboard showing user's name and role.

### ⏳ SHOULD-HAVE (Hours 6-7)
1. **Leave Balances**: Tracking how many sick/casual days are left.
2. **Payroll Generation**: A basic button that multiplies base salary by a fixed number (mocking complex calculations if short on time).
3. **Dashboards**: Basic stats (total employees, today's attendance count).

### 🌟 NICE-TO-HAVE (Hour 8 / If ahead of schedule)
1. **Analytics & Reports**: Charts and CSV exports.
2. **Notifications**: Real-time alerts using WebSockets or Toast notifications for approvals.
3. **Advanced Profile Management**: Uploading profile pictures (Multer + Cloud storage).
4. **Complex Deductions**: Advanced payroll calculations factoring in half-days and tax.
