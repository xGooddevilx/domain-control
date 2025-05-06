// components/DomainForm.tsx
import type { DomainDto } from '@/modules/services/types'
import { Button, Form, Input, Select, Switch } from 'antd'
import { useEffect } from 'react'

const { Option } = Select

type Props = {
  data?: DomainDto | null
  onSubmit: (values: any) => void
}

export const DomainForm = ({ data, onSubmit }: Props) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
    
  }, [data])

  return (
    <Form layout="vertical" form={form} onFinish={onSubmit}>
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
        <Button htmlType="submit" type="primary">
          Save
        </Button>
      </div>
    </Form>
  )
}
