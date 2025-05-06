import { SearchOutlined } from '@ant-design/icons'
import { Input, Select } from 'antd'
import { useQueryState } from 'nuqs'
import type { ChangeEvent } from 'react'

const { Option } = Select

export const FilterForm = () => {
  const [status, setStatus] = useQueryState('status', {
    defaultValue: 'all',
    clearOnDefault: true,
  })
  const [sort, setSort] = useQueryState('sort', {
    clearOnDefault: true,
    defaultValue: 'asc',
  })
  const [search, setSearch] = useQueryState('search', {
    clearOnDefault: true,
    defaultValue: '',
  })

  const handleStatusChange = (value: string) => setStatus(value)
  const handleSortChange = (value: string) => setSort(value)
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value)

  return (
    <div className="flex gap-2">
      <Select
        value={status || 'all'}
        onChange={handleStatusChange}
        size="large"
        className="w-56"
      >
        <Option value="all">All Statuses</Option>
        <Option value="pending">Pending</Option>
        <Option value="verified">Verified</Option>
        <Option value="rejected">Rejected</Option>
      </Select>

      <Select
        value={sort || undefined}
        onChange={handleSortChange}
        placeholder="Sort by"
        className="w-56"
        size="large"
      >
        <Option value="asc">Ascending</Option>
        <Option value="desc">Descending</Option>
      </Select>

      <Input
        placeholder="Search by domain"
        allowClear
        size="large"
        prefix={<SearchOutlined />}
        className="w-56"
        value={search || ''}
        onChange={handleSearchChange}
      />
    </div>
  )
}
