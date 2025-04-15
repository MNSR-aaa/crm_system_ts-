import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Shell from "./pages/main/Shell";
import { createTheme, MantineProvider } from "@mantine/core";
import SignIn from "./pages/auth/SignIn";
import UserSettings from "./pages/userSettings/UserSettings";

import ContactsTable from "./pages/tables/ContactsTable";
import Overlay from "./components/overlay/Overlay";

const theme = createTheme({});

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/" element={<Overlay />}>
            <Route path="/main" element={<Shell />} />
            <Route path="/contacts" element={<ContactsTable />} />
            <Route path="/userSettings" element={<UserSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
