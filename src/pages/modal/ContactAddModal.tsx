import { Modal, Button, Card, Text, TextInput, Group } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { RUSL_BASE_API_URL } from "../../constants/api";
import { useForm } from "@mantine/form";

interface IProps {
  onClose: () => void;
  title: string;
}

export default function ContactAddModal({ onClose, title }: IProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: ``,
      email: ``,
      phone: ``,
    },
    validate: {
      name: (name) => (!name || name.length < 2 ? "Invalid name" : null),
      email: (email) =>
        !email || !/^\S+@\S+\.\S+$/.test(email) ? "Invalid email" : null,
      phone: (phone) =>
        !/^(\+7|8)[\d\- ]{9,}\d$/.test(phone.replace(/[\s-]/g, ""))
          ? "Invalid phone"
          : null,
    },
  });

  function handleSubmitAdd(values: typeof form.values) {
    setLoading(true);
    axios
      .post(
        `${RUSL_BASE_API_URL}api/contacts`,
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .catch(() => {
        alert("Error");
      })
      .finally(() => window.location.reload());
  }

  return (
    <Modal opened={true} onClose={onClose} title={title}>
      <form onSubmit={form.onSubmit(handleSubmitAdd)}>
        <Card>
          <Text>Name</Text>
          <TextInput
            placeholder="Enter name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <Text>Email</Text>
          <TextInput
            placeholder="Enter email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Text>Phone</Text>
          <TextInput
            placeholder="Enter phone"
            key={form.key("phone")}
            {...form.getInputProps("phone")}
          />
          <Group justify="center">
            <Button mt={25} mb={-15} w={200} type="submit" loading={loading}>
              Confirm add
            </Button>
          </Group>
        </Card>
      </form>
    </Modal>
  );
}
