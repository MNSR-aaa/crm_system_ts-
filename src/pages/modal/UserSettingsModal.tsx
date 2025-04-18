import { Card, Modal, TextInput, Text, Button, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import useUserStore from "../../store/userStore";

interface IProps {
  onClose: () => void;
  title: string;
}

export default function UserSettingsModal({ onClose, title }: IProps) {
  const { updateUser, user } = useUserStore();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    validate: {
      name: (name) => (!name || name.length < 2 ? "Invalid name" : null),
      lastName: (lastName) =>
        !lastName || lastName.length < 2 ? "Invalid name" : null,
      email: (email) => (!email || email.length < 2 ? "Invalid email" : null),
    },
  });

  function handleSubmitEdit(values: typeof form.values) {
    updateUser({
      firstName: values.name,
      lastName: values.lastName,
      email: values.email,
    });
    onClose();
  }

  return (
    <Modal opened={true} onClose={onClose} title={title}>
      <form onSubmit={form.onSubmit(handleSubmitEdit)}>
        <Card>
          <Text mb={10}>Name</Text>
          <TextInput
            defaultValue={user.firstName}
            mb={10}
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            defaultValue={user.lastName}
            mb={10}
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
          />
          <Text mt={15} mb={10}>
            Email
          </Text>
          <TextInput
            defaultValue={user.email}
            mb={10}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Flex justify="center" align="center">
            <Button w={200} mt={20} type="submit">
              Submit edit
            </Button>
          </Flex>
        </Card>
      </form>
    </Modal>
  );
}
