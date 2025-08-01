import AboutPage from "@/pages/AboutPage";
import ContactsPage from "@/pages/ContactsPage";
import FiltersPage from "@/pages/FiltersPage";
import HomePage from "@/pages/HomePage";
import TrainingPage from "@/pages/TrainingPage";
import { HashRouter, Route, Routes } from "react-router";
import Layout from "../layout";
import { COMMON_ROUTES_NAMES } from "./commonRoutesNames";
import AuthPage from "@/pages/AuthPage";

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={COMMON_ROUTES_NAMES.Home} element={<HomePage />} />
          <Route
            path={COMMON_ROUTES_NAMES.Training}
            element={<TrainingPage />}
          />
          <Route
            path={COMMON_ROUTES_NAMES.Category}
            element={<FiltersPage />}
          />
          <Route
            path={COMMON_ROUTES_NAMES.Contacts}
            element={<ContactsPage />}
          />
          <Route path={COMMON_ROUTES_NAMES.About} element={<AboutPage />} />
          <Route path={COMMON_ROUTES_NAMES.Auth} element={<AuthPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
