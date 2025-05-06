import type { DomainDto } from "@/modules/services/types"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Space, Table, Tag, Tooltip } from "antd"

type Properties = {
  domains: DomainDto[]
  onEdit: (domain: DomainDto) => void
    onDelete: (domain: DomainDto) => void
  loading?: boolean
}

export const DomainTable = ({ domains, onEdit,onDelete, loading = false }: Properties) => {
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
      title: "Actions",
      key: "actions",
      render: (_: any, record:DomainDto) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined
              style={{ color: "#1890ff", cursor: "pointer" }}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              style={{ color: "#ff4d4f", cursor: "pointer" }}
              onClick={() => onDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <Table
      dataSource={domains}
      columns={columns}
      rowKey="_id"
      className="mt-6"
      loading={loading}
    />
  )
}
