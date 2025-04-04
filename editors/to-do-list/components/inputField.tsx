import { Form, StringField } from "@powerhousedao/design-system/scalars";

interface InputFieldProps {
  input: string;
  value: string;
  label?: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InputField = (props: InputFieldProps) => {
  const { input, value, label, onKeyDown, handleInputChange } = props;

  return (
    <Form
      defaultValues={{
        input: input,
      }}
      onSubmit={() => {}}
      resetOnSuccessfulSubmit
    >
      <StringField
        style={{
          color: "black",
        }}
        label={label}
        name="input"
        value={value}
        onKeyDown={onKeyDown}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          handleInputChange(e);
        }}
      />
    </Form>
  );
};
