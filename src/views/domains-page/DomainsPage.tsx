import { useState } from 'react'
import { Button, Drawer, Input, Select, Form, Switch, Tag, Table } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useGetDomainsQuery } from '@/modules/services/domainApi'
import type { Domain } from '@/modules/services/types'

const { Option } = Select

const DomainsPage = () => {

    const { data: domains = [], isLoading } = useGetDomainsQuery()
    console.log(domains);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [form] = Form.useForm()

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  const onFinish = (values: Domain) => {
    console.log(values);
    closeDrawer()
    form.resetFields()
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
      <Button type="link" onClick={() => console.log('Edit', record)}>
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
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            name="domain"
            label="Domain"
            rules={[{ required: true, message: 'Please enter a domain name' }]}
          >
            <Input placeholder="e.g., example.com" />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select placeholder="Select status">
              <Option value="pending">Pending</Option>
              <Option value="verified">Verified</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="isActive"
            label="Active"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>

          <div className="flex justify-end mt-4">
            <Button onClick={closeDrawer} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  )
}

export default DomainsPage
