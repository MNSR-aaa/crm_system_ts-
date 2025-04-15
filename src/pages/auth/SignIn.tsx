import {
  Card,
  TextInput,
  Title,
  Checkbox,
  Button,
  Group,
  PasswordInput,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../constants/api";

export default function SignIn() {
  const [checked] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: ``,
      password: ``,
    },
  });

  function handleSubmit(values: typeof form.values) {
    axios
      .post(
        `${BASE_API_URL}/auth/login`,
        {
          username: values.name,
          password: values.password,
          expressionMins: 30,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setLoading(true);
        if (checked) {
          localStorage.setItem("token", response.data.accessToken);
        } else {
          sessionStorage.setItem("token", response.data.accessToken);
        }
        window.location.href = "/main";
      })
      .catch(() => {
        alert("Ошибка авторизации");
      });
  }

  return (
    <Flex justify="center" align="center">
      <div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Card withBorder shadow="md" w={300} top={300}>
            <Title ta="center">Sign in</Title>
            <TextInput
              mt={15}
              placeholder="Enter your name"
              label="Name"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              mt={10}
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Checkbox pt={20} label="Keep me logged in" checked={checked} />
            <Group justify="center" pt={20}>
              <Button loading={loading} type="submit" mt="sm">
                Log in
              </Button>
            </Group>
          </Card>
        </form>
      </div>
    </Flex>
  );
}
