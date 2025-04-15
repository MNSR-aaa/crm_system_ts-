import { AppShell, Button, Flex, Card, Text, Title, Pill } from "@mantine/core";
import { IconPlus, IconDotsVertical } from "@tabler/icons-react";

export default function Shell() {
  return (
    <div>
      <AppShell>
        <AppShell.Main>
          <Flex gap="xl" justify="center" align="flex-start" wrap="wrap">
            <div>
              <Card m={5} w={250} h={40} color="yellow">
                <Flex
                  mt={-11}
                  gap="md"
                  justify="center"
                  align="center"
                  direction="row"
                  wrap="wrap"
                >
                  <Pill>
                    <Text mt={-3}>Новые</Text>
                  </Pill>
                  <Flex>
                    <Button variant="subtle" size="xs" radius="xl">
                      <IconPlus size={20} />
                    </Button>
                    <Button variant="subtle" size="xs" radius="xl">
                      <IconDotsVertical size={20} />
                    </Button>
                  </Flex>
                </Flex>
              </Card>
              <Flex
                mih={50}
                gap="xs"
                justify="center"
                align="flex-start"
                direction="column"
                wrap="wrap"
              >
                <Card withBorder w={250} h={200} m={5}>
                  <Flex
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                  >
                    <Title size={25} mb={10}>
                      Тайтл
                    </Title>
                  </Flex>
                  <Text>Текст</Text>
                </Card>
              </Flex>
            </div>
            <div>
              <Card m={5} w={250} h={40} color="yellow">
                <Flex
                  mt={-11}
                  gap="md"
                  justify="center"
                  align="center"
                  direction="row"
                  wrap="wrap"
                >
                  <Pill>
                    <Text mt={-3}>В работе</Text>
                  </Pill>
                  <Flex>
                    <Button variant="subtle" size="xs" radius="xl">
                      <IconPlus size={20} />
                    </Button>{" "}
                    <Button variant="subtle" size="xs" radius="xl">
                      <IconDotsVertical size={20} />
                    </Button>
                  </Flex>
                </Flex>
              </Card>
              <Flex
                mih={50}
                gap="xs"
                justify="center"
                align="flex-start"
                direction="column"
                wrap="wrap"
              >
                <Card withBorder w={250} h={200} m={5}>
                  <Flex
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                  >
                    <Title size={25} mb={10}>
                      Тайтл
                    </Title>
                  </Flex>
                  <Text>Текст</Text>
                </Card>
              </Flex>
            </div>
            <div>
              <Card m={5} w={250} h={40} color="yellow">
                <Flex
                  mt={-11}
                  gap="md"
                  justify="center"
                  align="center"
                  direction="row"
                  wrap="wrap"
                >
                  <Pill>
                    <Text mt={-3}>Сделано</Text>
                  </Pill>
                  <Flex>
                    <Button variant="subtle" size="xs" radius="xl">
                      <IconPlus size={20} />
                    </Button>{" "}
                    <Button variant="subtle" size="xs" radius="xl">
                      <IconDotsVertical size={20} />
                    </Button>
                  </Flex>
                </Flex>
              </Card>
              <Flex
                mih={50}
                gap="xs"
                justify="center"
                align="flex-start"
                direction="column"
                wrap="wrap"
              >
                <Card withBorder w={250} h={200} m={5}>
                  <Flex
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                  >
                    <Title size={25} mb={10}>
                      Тайтл
                    </Title>
                  </Flex>
                  <Text>Текст</Text>
                </Card>
              </Flex>
            </div>
            <Button w={50} top={130} variant="subtle" size="xs" radius="xl">
              <IconPlus />
            </Button>
          </Flex>
        </AppShell.Main>
      </AppShell>
    </div>
  );
}
