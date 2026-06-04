import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import RoleLayout from './components/layout/RoleLayout'

import SuperAdminDashboard from './roles/super-admin/SuperAdminDashboard'
import ManageUsersAndRoles from './roles/super-admin/ManageUsersAndRoles'
import ConfigureFarmSettings from './roles/super-admin/ConfigureFarmSettings'
import ManageLivestockCategories from './roles/super-admin/ManageLivestockCategories'
import ViewAllFarmRecords from './roles/super-admin/ViewAllFarmRecords'
import SystemWideReports from './roles/super-admin/SystemWideReports'
import BackupAndRestore from './roles/super-admin/BackupAndRestore'
import {
  SUPER_ADMIN_BASE,
  superAdminNav,
} from './roles/super-admin/config'

import FarmManagerDashboard from './roles/farm-manager/FarmManagerDashboard'
import ManageLivestockRecords from './roles/farm-manager/ManageLivestockRecords'
import AssignLivestockLocations from './roles/farm-manager/AssignLivestockLocations'
import MonitorAnimalPerformance from './roles/farm-manager/MonitorAnimalPerformance'
import ManageBreedingSchedules from './roles/farm-manager/ManageBreedingSchedules'
import MonitorFarmOperations from './roles/farm-manager/MonitorFarmOperations'
import ApproveLivestockTransactions from './roles/farm-manager/ApproveLivestockTransactions'
import GenerateFarmReports from './roles/farm-manager/GenerateFarmReports'
import {
  FARM_MANAGER_BASE,
  farmManagerNav,
} from './roles/farm-manager/config'

import VeterinarianDashboard from './roles/veterinarian/VeterinarianDashboard'
import RecordAnimalHealth from './roles/veterinarian/RecordAnimalHealth'
import ScheduleHealthCheckups from './roles/veterinarian/ScheduleHealthCheckups'
import ManageVaccinationRecords from './roles/veterinarian/ManageVaccinationRecords'
import DiagnoseIllnesses from './roles/veterinarian/DiagnoseIllnesses'
import PrescribeTreatments from './roles/veterinarian/PrescribeTreatments'
import MonitorAnimalRecovery from './roles/veterinarian/MonitorAnimalRecovery'
import GenerateHealthReports from './roles/veterinarian/GenerateHealthReports'
import {
  VETERINARIAN_BASE,
  veterinarianNav,
} from './roles/veterinarian/config'

import CaretakerDashboard from './roles/livestock-caretaker/CaretakerDashboard'
import RecordDailyFeeding from './roles/livestock-caretaker/RecordDailyFeeding'
import MonitorAnimalConditions from './roles/livestock-caretaker/MonitorAnimalConditions'
import UpdateWeightRecords from './roles/livestock-caretaker/UpdateWeightRecords'
import ReportSickAnimals from './roles/livestock-caretaker/ReportSickAnimals'
import RecordBreedingActivities from './roles/livestock-caretaker/RecordBreedingActivities'
import ManageHousingAssignments from './roles/livestock-caretaker/ManageHousingAssignments'
import TrackDailyFarmTasks from './roles/livestock-caretaker/TrackDailyFarmTasks'
import {
  CARETAKER_BASE,
  caretakerNav,
} from './roles/livestock-caretaker/config'

import FarmOwnerDashboard from './roles/farm-owner/FarmOwnerDashboard'
import ViewLivestockInventory from './roles/farm-owner/ViewLivestockInventory'
import MonitorFarmPerformance from './roles/farm-owner/MonitorFarmPerformance'
import ViewFinancialSummaries from './roles/farm-owner/ViewFinancialSummaries'
import TrackBreedingStatistics from './roles/farm-owner/TrackBreedingStatistics'
import MonitorHealthRecords from './roles/farm-owner/MonitorHealthRecords'
import ReviewReportsAnalytics from './roles/farm-owner/ReviewReportsAnalytics'
import FarmNotifications from './roles/farm-owner/FarmNotifications'
import {
  FARM_OWNER_BASE,
  farmOwnerNav,
} from './roles/farm-owner/config'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path={SUPER_ADMIN_BASE}
          element={
            <ProtectedRoute>
            <RoleLayout
              roleId="super-admin"
              basePath={SUPER_ADMIN_BASE}
              navItems={superAdminNav}
            />
            </ProtectedRoute>
          }
        >
          <Route index element={<SuperAdminDashboard />} />
          <Route path="users-roles" element={<ManageUsersAndRoles />} />
          <Route path="farm-settings" element={<ConfigureFarmSettings />} />
          <Route
            path="livestock-categories"
            element={<ManageLivestockCategories />}
          />
          <Route path="all-farm-records" element={<ViewAllFarmRecords />} />
          <Route path="system-reports" element={<SystemWideReports />} />
          <Route path="backup-restore" element={<BackupAndRestore />} />
        </Route>

        <Route
          path={FARM_MANAGER_BASE}
          element={
            <ProtectedRoute>
            <RoleLayout
              roleId="farm-manager"
              basePath={FARM_MANAGER_BASE}
              navItems={farmManagerNav}
            />
            </ProtectedRoute>
          }
        >
          <Route index element={<FarmManagerDashboard />} />
          <Route path="livestock-records" element={<ManageLivestockRecords />} />
          <Route path="assign-locations" element={<AssignLivestockLocations />} />
          <Route path="animal-performance" element={<MonitorAnimalPerformance />} />
          <Route path="breeding-schedules" element={<ManageBreedingSchedules />} />
          <Route path="farm-operations" element={<MonitorFarmOperations />} />
          <Route
            path="approve-transactions"
            element={<ApproveLivestockTransactions />}
          />
          <Route path="farm-reports" element={<GenerateFarmReports />} />
        </Route>

        <Route
          path={VETERINARIAN_BASE}
          element={
            <ProtectedRoute>
            <RoleLayout
              roleId="veterinarian"
              basePath={VETERINARIAN_BASE}
              navItems={veterinarianNav}
            />
            </ProtectedRoute>
          }
        >
          <Route index element={<VeterinarianDashboard />} />
          <Route path="animal-health" element={<RecordAnimalHealth />} />
          <Route path="health-checkups" element={<ScheduleHealthCheckups />} />
          <Route path="vaccination-records" element={<ManageVaccinationRecords />} />
          <Route path="diagnose-illness" element={<DiagnoseIllnesses />} />
          <Route path="prescribe-treatments" element={<PrescribeTreatments />} />
          <Route path="animal-recovery" element={<MonitorAnimalRecovery />} />
          <Route path="health-reports" element={<GenerateHealthReports />} />
        </Route>

        <Route
          path={CARETAKER_BASE}
          element={
            <ProtectedRoute>
            <RoleLayout
              roleId="livestock-caretaker"
              basePath={CARETAKER_BASE}
              navItems={caretakerNav}
            />
            </ProtectedRoute>
          }
        >
          <Route index element={<CaretakerDashboard />} />
          <Route path="daily-feeding" element={<RecordDailyFeeding />} />
          <Route path="animal-conditions" element={<MonitorAnimalConditions />} />
          <Route path="weight-records" element={<UpdateWeightRecords />} />
          <Route path="report-sick" element={<ReportSickAnimals />} />
          <Route path="breeding-activities" element={<RecordBreedingActivities />} />
          <Route path="housing-assignments" element={<ManageHousingAssignments />} />
          <Route path="daily-tasks" element={<TrackDailyFarmTasks />} />
        </Route>

        <Route
          path={FARM_OWNER_BASE}
          element={
            <ProtectedRoute>
            <RoleLayout
              roleId="farm-owner"
              basePath={FARM_OWNER_BASE}
              navItems={farmOwnerNav}
            />
            </ProtectedRoute>
          }
        >
          <Route index element={<FarmOwnerDashboard />} />
          <Route path="livestock-inventory" element={<ViewLivestockInventory />} />
          <Route path="farm-performance" element={<MonitorFarmPerformance />} />
          <Route path="financial-summaries" element={<ViewFinancialSummaries />} />
          <Route path="breeding-statistics" element={<TrackBreedingStatistics />} />
          <Route path="health-records" element={<MonitorHealthRecords />} />
          <Route path="reports-analytics" element={<ReviewReportsAnalytics />} />
          <Route path="notifications" element={<FarmNotifications />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
