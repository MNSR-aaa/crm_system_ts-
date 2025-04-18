import { Modal, Button, Card, Text, TextInput, Group } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { RUSL_BASE_API_URL } from "../../constants/api";
import { useForm } from "@mantine/form";
import { TypeContact } from "../tables/ContactsTable";

interface IProps {
  onClose: () => void;
  title: string;
  contact: TypeContact;
}

export default function ContactEditModal({ onClose, title, contact }: IProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
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

  function handleSubmitEdit(values: typeof form.values) {
    setLoading(true);
    axios
      .put(
        `${RUSL_BASE_API_URL}api/contacts/${contact.id}`,
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
      <form onSubmit={form.onSubmit(handleSubmitEdit)}>
        <Card>
          <Text>Name</Text>
          <TextInput key={form.key("name")} {...form.getInputProps("name")} />
          <Text>Email</Text>
          <TextInput key={form.key("email")} {...form.getInputProps("email")} />
          <Text>Phone</Text>
          <TextInput key={form.key("phone")} {...form.getInputProps("phone")} />
          <Group justify="center">
            <Button mt={25} mb={-15} w={200} type="submit" loading={loading}>
              Confirm edit
            </Button>
          </Group>
        </Card>
      </form>
    </Modal>
  );
}
