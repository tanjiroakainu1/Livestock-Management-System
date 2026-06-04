import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import CategoryCrudSection from '../../components/crud/CategoryCrudSection'
import LivestockCrudSection from '../../components/crud/LivestockCrudSection'

export default function ViewLivestockInventory() {
  const { data } = useFarmData()
  const totalByCategory = data.categories.reduce((s, c) => s + c.animalCount, 0)

  return (
    <FeaturePage
      roleId="farm-owner"
      featurePath="livestock-inventory"
      title="Livestock Inventory"
      description="Register, edit, and remove animals; manage categories for inventory breakdown."
      badge="Farm Owner"
      stats={[
        { label: 'Registered', value: data.livestock.length },
        { label: 'Categories', value: data.categories.length },
        { label: 'Total Stock', value: totalByCategory },
      ]}
      hideRecordTable
    >
      <LivestockCrudSection
        roleId="farm-owner"
        featurePath="livestock-inventory"
        title="Animal Inventory"
      />
      <CategoryCrudSection
        roleId="farm-owner"
        featurePath="livestock-inventory"
        title="Inventory by Category"
      />
    </FeaturePage>
  )
}
