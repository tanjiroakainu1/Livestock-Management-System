import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import FeaturePage from '../../components/layout/FeaturePage'
import NotificationFeed from '../../components/owner/NotificationFeed'

export default function FarmNotifications() {
  const { data } = useFarmData()
  const { markNotificationRead, markAllNotificationsRead } = useFarmActions('farm-owner', 'notifications')
  const unread = data.notifications.filter((n) => !n.read)

  return (
    <FeaturePage
      roleId="farm-owner"
      featurePath="notifications"
      title="Farm Notifications"
      description="Vaccination reminders, health alerts, feeding reminders, and inventory warnings."
      badge="Notifications & Alerts"
      stats={[
        { label: 'Total', value: data.notifications.length },
        { label: 'Unread', value: unread.length },
      ]}
      hideRecordTable
    >
      <NotificationFeed
        notifications={data.notifications}
        onMarkRead={markNotificationRead}
        onMarkAllRead={markAllNotificationsRead}
      />
    </FeaturePage>
  )
}
