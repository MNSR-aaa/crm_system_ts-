import {
  Card,
  Flex,
  Table,
  Pagination,
  TextInput,
  Loader,
  Box,
  Button,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { RUSL_BASE_API_URL } from "../../constants/api";
import { useDebounce } from "use-debounce";
import ContactEditModal from "../modal/ContactEditModal";
import { IconEdit, IconTrashX, IconPlus } from "@tabler/icons-react";
import ContactAddModal from "../modal/ContactAddModal";

const PAGE_SIZE = 5;

export type TypeId = number;

export type TypeContact = {
  name: string;
  email: string;
  phone: string;
  id: TypeId;
};

export default function ContactsTable() {
  const [contacts, setContacts] = useState<TypeContact[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [searchValue] = useDebounce(search, 300);

  type TypeEditModal = {
    opened: boolean;
    contactId?: number;
  };

  type TypeAddModal = {
    opened: boolean;
  };

  const [editModal, setEditModal] = useState<TypeEditModal>({
    opened: false,
  });
  const [addModal, setAddModal] = useState<TypeAddModal>({
    opened: false,
  });

  const editModalContact = contacts.find(
    (contact) => contact.id == editModal.contactId
  );

  function handleDelete(id: TypeId) {
    axios
      .delete(`${RUSL_BASE_API_URL}api/contacts/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .finally(() => window.location.reload());
  }

  useEffect(() => {
    setLoading(true);

    axios(
      `${RUSL_BASE_API_URL}api/contacts`,

      {
        params: {
          page: page,
          limit: PAGE_SIZE,
          search: searchValue,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setContacts(res.data.data);
        setPages(res.data.pages);
      })
      .catch(() => alert("Error"))
      .finally(() => setLoading(false));
  }, [page, searchValue]);

  const contactsTable = contacts.map((contact: TypeContact) => (
    <Table.Tr key={contact.id}>
      <Table.Td>{contact.name}</Table.Td>
      <Table.Td>{contact.email}</Table.Td>
      <Table.Td>{contact.phone}</Table.Td>
      <Box m={5}>
        <Button
          radius="md"
          size="25"
          onClick={() => {
            handleOpenEdit(contact.id);
          }}
          mr={3}
        >
          <IconEdit size={20} />
        </Button>

        <Button
          radius="md"
          size="25"
          onClick={() => {
            handleDelete(contact.id);
          }}
        >
          <IconTrashX size={20} onClick={() => {}} />
        </Button>
      </Box>
    </Table.Tr>
  ));

  function handleCloseEdit() {
    setEditModal({ opened: false });
  }

  function handleOpenEdit(contactId: TypeId) {
    setEditModal({ opened: true, contactId: contactId });
  }

  function handleCloseAdd() {
    setAddModal({ opened: false });
  }

  const handleOpenAdd = () => {
    setAddModal({ opened: true });
  };

  return (
    <>
      <Card top={175}>
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <Flex justify="center">
            <Box>
              <TextInput
                w={300}
                label="Search contact"
                onChange={(event) => setSearch(event.currentTarget.value)}
                value={search}
              />
            </Box>
            <Button
              onClick={() => {
                handleOpenAdd();
              }}
              ml={10}
              mt={25}
            >
              <IconPlus />
            </Button>
          </Flex>
          {!loading ? (
            <Flex justify="center" align="center">
              <Box m={10}>
                <Box>
                  <Flex justify="center">
                    <Table m={10}>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Name</Table.Th>
                          <Table.Th>Email</Table.Th>
                          <Table.Th>Phone</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{contactsTable}</Table.Tbody>
                    </Table>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          ) : (
            <Flex justify="center">
              <Card>
                <Loader size="xl" color="blue" />
              </Card>
            </Flex>
          )}
          <Box m={10}>
            <Flex justify="center">
              <Pagination
                m={10}
                total={pages}
                radius="md"
                value={page}
                onChange={setPage}
              />
            </Flex>
          </Box>
        </Flex>
      </Card>

      {editModal.opened && (
        <ContactEditModal
          contact={editModalContact!}
          onClose={handleCloseEdit}
          title={"Edit"}
        />
      )}

      {addModal.opened && (
        <ContactAddModal onClose={handleCloseAdd} title={"Add"} />
      )}
    </>
  );
}
