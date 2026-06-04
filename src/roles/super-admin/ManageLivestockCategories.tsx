import FeaturePage from '../../components/layout/FeaturePage'
import CategoryCrudSection from '../../components/crud/CategoryCrudSection'
import { useFarmData } from '../../hooks/useFarmData'

export default function ManageLivestockCategories() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="super-admin"
      featurePath="livestock-categories"
      title="Manage Livestock Categories"
      description="Define and manage livestock classification categories."
      badge="Super Admin"
      stats={[
        { label: 'Categories', value: data.categories.length },
        {
          label: 'Total Animals',
          value: data.categories.reduce((s, c) => s + c.animalCount, 0),
        },
      ]}
      hideRecordTable
      hideActivityTable={false}
    >
      <CategoryCrudSection
        roleId="super-admin"
        featurePath="livestock-categories"
      />
    </FeaturePage>
  )
}
