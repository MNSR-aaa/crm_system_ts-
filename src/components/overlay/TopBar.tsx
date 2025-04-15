import {
  Button,
  Flex,
  Image,
  Avatar,
  Card,
  AppShell,
  Text,
  Burger,
} from "@mantine/core";
import { IconBell, IconUser, IconLogin2 } from "@tabler/icons-react";
import { Link } from "react-router";
import useUserStore from "../../store/userStore";
import useBurgerStore from "../../store/burgerStore";

export default function TopBar() {
  function handleSignOutClick() {
    const isUserOut = confirm("вы точно хотите выйти?");
    if (isUserOut !== false) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      window.location.reload();
    }
  }

  const navigationMenu = [
    { text: "Рассылки", to: "/" },
    { text: "Automation", to: "/" },
    { text: "Чат-бот", to: "/" },
    { text: "CRM", to: "/" },
    { text: "Сайты", to: "/" },
    { text: "Pop-up", to: "/" },
    { text: "Push", to: "/" },
    { text: "SMTP", to: "/" },
  ];

  const { user } = useUserStore();
  const { isBurgerPressed } = useBurgerStore();

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding="md"
    >
      <AppShell.Header h={80}>
        <div>
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Burger onClick={() => isBurgerPressed()} />
            <Card>
              <Image src="/LogoTsThin.png" w={175} />
            </Card>

            {navigationMenu.map((item, id) => (
              <Flex
                key={id}
                mih={50}
                gap="md"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Button variant="subtle" size="md" radius="xl">
                  {item.text}
                </Button>
              </Flex>
            ))}

            <Card>
              <Flex
                gap="md"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Button variant="white" radius="xl">
                  <IconBell />
                </Button>

                {!user.id && (
                  <Link to="/signIn">
                    <Button variant="white" radius="xl">
                      <IconUser />
                    </Button>
                  </Link>
                )}
                {user.id && (
                  <Link to="/userSettings">
                    <Button variant="white" radius="xl">
                      <Avatar size={30} src={user.image} alt="it's me" />
                      <Text ml={5}>
                        {user.firstName} {user.lastName}
                      </Text>
                    </Button>
                  </Link>
                )}
                {user.id && (
                  <Button
                    variant="white"
                    radius="xl"
                    onClick={handleSignOutClick}
                  >
                    <IconLogin2 />
                  </Button>
                )}
              </Flex>
            </Card>
          </Flex>
        </div>
      </AppShell.Header>
    </AppShell>
  );
}
