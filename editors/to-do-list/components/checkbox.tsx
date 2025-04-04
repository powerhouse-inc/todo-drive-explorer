import { Form, BooleanField } from "@powerhousedao/design-system/scalars";

interface CheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Checkbox = ({ value, onChange }: CheckboxProps) => {
  return (
    <Form onSubmit={() => {}}>
      <BooleanField 
        name="checked"
        description="Check this box to mark the todo as completed"
        value={value}
        onChange={onChange}
      />
    </Form>
  );
};
