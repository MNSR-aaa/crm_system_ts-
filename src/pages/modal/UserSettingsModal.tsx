import { Card, Modal, TextInput, Text, Button, Flex } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import useUserStore from "../../store/userStore";

interface IProps {
  onClose: () => void;
  title: string;
}

export default function UserSettingsModal({ onClose, title }: IProps) {
  const { updateUser, user } = useUserStore();
  const [name, setName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: name,
      lastName: lastName,
      email: email,
    },
    validate: {
      name: (name) => (!name || name.length < 2 ? "Invalid name" : null),
      lastName: (lastName) =>
        !lastName || lastName.length < 2 ? "Invalid name" : null,
      email: (email) => (!email || email.length < 2 ? "Invalid email" : null),
    },
  });

  function handleSubmitEdit(values: typeof form.values) {
    console.log(values);

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
            defaultValue={name}
            mb={10}
            key={form.key("name")}
            {...form.getInputProps("name")}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <TextInput
            defaultValue={lastName}
            mb={10}
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
            onChange={(event) => setLastName(event.currentTarget.value)}
          />
          <Text mt={15} mb={10}>
            Email
          </Text>
          <TextInput
            defaultValue={email}
            mb={10}
            key={form.key("email")}
            {...form.getInputProps("email")}
            onChange={(event) => setEmail(event.currentTarget.value)}
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
