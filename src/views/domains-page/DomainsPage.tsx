import { useState } from 'react'
import { Button, Drawer, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import {
  useAddDomainMutation,
  useDeleteDomainMutation,
  useGetDomainsQuery,
  useUpdateDomainMutation,
} from '@/modules/services/domainApi'
import type { DomainDto, DomainVariables } from '@/modules/services/types'
import { DomainForm } from './components/DomainForm'
import { DomainTable } from './components/DomainTable'
import { useToast } from '@/modules/toast/ToastProvider'
import { FilterForm } from './components/FilterForm'

const DomainsPage = () => {
  const toast = useToast()
  const { data: domains = [], isLoading } = useGetDomainsQuery()

  const [createDomain, { isLoading: isCreating }] = useAddDomainMutation()
  const [updateDomain, { isLoading: isUpdating }] = useUpdateDomainMutation()
  const [deleteDomain, { isLoading: isDeleting }] = useDeleteDomainMutation()

  const isMutating = isCreating || isUpdating || isDeleting
  const isTableLoading = isLoading || isMutating

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingDomain, setEditingDomain] = useState<DomainDto | null>(null)

  const [form] = Form.useForm()

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => {
    setIsDrawerOpen(false)
    setEditingDomain(null)
  }

  const handleDrawerOpen = (domain?: DomainDto) => {
    setEditingDomain(domain || null)
    setIsDrawerOpen(true)
  }

  const handleCreate = async (values: Omit<DomainVariables, 'createdDate'>) => {
    try {
      await createDomain({
        ...values,
        createdDate: Math.floor(Date.now() / 1000),
      }).unwrap()
      toast.success('Domain created successfully!')
      closeDrawer()
      form.resetFields()
    } catch (err) {
      toast.error('Failed to create domain!')
    }
  }

  const handleEdit = async (values: Omit<DomainVariables, 'createdDate'>) => {
    if (!editingDomain) return
    try {
      await updateDomain({
        id: editingDomain.id,
        data: { ...values },
      }).unwrap()
      toast.success('Domain updated successfully!')
      closeDrawer()
      form.resetFields()
    } catch (err) {
      toast.error('Failed to update domain!')
    }
  }

  const handleDelete = async (domain: DomainDto) => {
    try {
      await deleteDomain(domain.id).unwrap()
      toast.success('Domain deleted successfully!')
    } catch {
      toast.error('Failed to delete domain.')
    }
  }

  return (
    <div className="mt-5 p-4">
      <h2 className="font-light text-3xl mb-6">Domains</h2>
      <div className="flex gap-2 justify-between">
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={openDrawer}
        >
          Add Domain
        </Button>
        <FilterForm />
      </div>
      <DomainTable
        domains={domains}
        loading={isTableLoading}
        onEdit={handleDrawerOpen}
        onDelete={handleDelete}
      />

      <Drawer
        title={editingDomain ? 'Edit Domain' : 'Add Domain'}
        placement="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        width={400}
        destroyOnClose
      >
        <DomainForm
          onSubmit={editingDomain ? handleEdit : handleCreate}
          data={editingDomain}
          isLoading={isMutating}
        />
      </Drawer>
    </div>
  )
}

export default DomainsPage
