import {
  Card,
  Text,
  Avatar,
  Flex,
  Button,
} from "@mantine/core";
import { useState } from "react";
import useUserStore from "../../store/userStore";
import { IconEdit } from "@tabler/icons-react";
import UserSettingsModal from "../modal/UserSettingsModal";

export default function UserSettings() {
  const { user } = useUserStore();

  const [settingsModal, setSettingsModal] = useState({
    opened: false,
  });

  function handleCloseEdit() {
    setSettingsModal({ opened: false });
  }

  function handleOpenEdit() {
    setSettingsModal({ opened: true });
  }

  console.log("user", user)

  return (
    <>
      <Flex justify="center" align="center">
        <div>
          <Card withBorder top={150} w={400}>
            <Flex
              gap="xs"
              justify="center"
              align="center"
              direction="column"
              wrap="wrap"
            >
              <Avatar src={user.image} size={100} />
              <Text>ID: {user.id}</Text>

              <Text>
                Name: {user.firstName} {user.lastName}
              </Text>

              <Text>Maiden Name: {user.maidenName}</Text>
              <Text>Age: {user.age}</Text>
              <Text>Gender: {user.gender}</Text>
              <Text>Email: {user.email}</Text>
              <Text>Phone: {user.phone}</Text>
              <Text>Username: {user.username}</Text>
              <Text>Password: {user.password}</Text>
              <Text>Birth Date: {user.birthDate}</Text>
              <Text>Blood Group: {user.bloodGroup}</Text>
              <Text>Height: {user.height}</Text>
              <Text>Weight: {user.weight}</Text>
              <Button ml={10} size="50" h="35" mt={10} onClick={handleOpenEdit}>
                <IconEdit />
              </Button>
            </Flex>
          </Card>
        </div>
      </Flex>

      {settingsModal.opened && (
        <UserSettingsModal
          onClose={handleCloseEdit}
          title={"Edit user"}
        />
      )}
    </>
  );
}
