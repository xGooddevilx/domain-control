import { useState } from 'react'
import { Button, Drawer, Input, Select, Form, Tag, Table, message } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import {
  useAddDomainMutation,
  useGetDomainsQuery,
  useUpdateDomainMutation,
} from '@/modules/services/domainApi'
import type { DomainDto, DomainVariables } from '@/modules/services/types'
import { DomainForm } from './components/DomainForm'

const { Option } = Select

const DomainsPage = () => {
  const { data: domains = [], isLoading } = useGetDomainsQuery()
  const [createDomain] = useAddDomainMutation()
  const [updateDomain] = useUpdateDomainMutation()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingDomain, setEditingDomain] = useState<DomainDto | null>(null)
  console.log('domains', domains)

  const [form] = Form.useForm()

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

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
      message.success('Domain created successfully!')
      closeDrawer()
      form.resetFields()
    } catch (err) {
      message.error('Failed to create domain!')
    }
  }

  const handleEdit = async (values: Omit<DomainVariables, 'createdDate'>) => {
    if (!editingDomain) return
    try {
      await updateDomain({
        id: editingDomain.id,
        data: {...values}
      }).unwrap()
      message.success('Domain updated successfully!')
      closeDrawer()
      form.resetFields()
    } catch (err) {
      message.error('Failed to update domain!')
    }
  }

  const columns = [
    {
      title: 'Domain URL',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: 'Verification Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color =
          status === 'verified'
            ? 'green'
            : status === 'pending'
              ? 'orange'
              : 'red'
        return (
          <Tag color={color} bordered={false}>
            {status.toUpperCase()}
          </Tag>
        )
      },
    },
    {
      title: 'Active State',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (active: boolean) => (
        <Tag color={active ? 'green' : 'red'} bordered={false}>
          {active ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleDrawerOpen(record)}>
          Edit
        </Button>
      ),
    },
  ]

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
        <div className="flex gap-2">
          <Select
            defaultValue="all"
            onChange={(value) => console.log('Filter by status:', value)}
            size="large"
            className="w-56"
          >
            <Option value="all">All Statuses</Option>
            <Option value="pending">Pending</Option>
            <Option value="verified">Verified</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
          <Select placeholder="Sort by" className="w-56" size="large">
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>

          <Input
            placeholder="Search by domain"
            allowClear
            size="large"
            prefix={<SearchOutlined />}
            className="w-56"
          />
        </div>
      </div>

      <Table
        dataSource={domains}
        columns={columns}
        rowKey="_id"
        className="mt-6"
        loading={isLoading}
      />

      <Drawer
        title="Add Domain"
        placement="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        width={400}
      >
        <DomainForm
          onSubmit={editingDomain ? handleEdit : handleCreate}
          data={editingDomain}
        />
      </Drawer>
    </div>
  )
}

export default DomainsPage
