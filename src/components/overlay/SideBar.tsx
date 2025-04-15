import { Button, Flex, AppShell } from "@mantine/core";
import {
  IconBuildingSkyscraper,
  IconBriefcase,
  IconAddressBook,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";
import { JSX } from "react";
import { useNavigate } from "react-router";

interface ISidebarMenuItem {
  text: string;
  to: string;
  icon: JSX.Element;
}

export default function SideBar() {
  const navigate = useNavigate();

  const sidebarMenu:ISidebarMenuItem[] = [
    { text: "Компании", to: "/", icon: <IconBuildingSkyscraper /> },
    { text: "Сделки", to: "/", icon: <IconBriefcase /> },
    { text: "Контакты", to: "/contacts", icon: <IconAddressBook /> },
    { text: "Настройки", to: "/", icon: <IconSettings /> },
    { text: "Аккаунт", to: "/", icon: <IconUserCircle /> },
  ];

  return (
    <AppShell>
      <AppShell.Navbar p="md">
        <div>
          {sidebarMenu.map((item, id) => (
            <div key={id}>
              <Flex justify="center">
                <Button
                  variant="subtle"
                  size="md"
                  radius="xl"
                  leftSection={item.icon}
                  onClick={() => {
                    navigate(item.to);
                  }}
                >
                  {item.text}
                </Button>
              </Flex>
            </div>
          ))}
        </div>
      </AppShell.Navbar>
    </AppShell>
  );
}
