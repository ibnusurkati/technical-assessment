import { BrowserRouter, Route, Routes } from "react-router";
import AuthMiddleware from "./middlewares/AuthMiddleware.tsx";
import Profile from "./pages/AccountDetail.tsx";
import Login from "./pages/Login.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useLocalizationStore } from "./stores/localization.store.ts";

const App = () => {
  const { locale, updateLocale } = useLocalizationStore();
  return (
    <>
      <div className="fixed right-6 top-6">
        <div className="bg-gray-300 dark:bg-white rounded-md p-1 flex space-x-1">
          <div onClick={() => updateLocale("EN")} className={`${locale === "EN" ? "bg-primary-600" : "bg-gray-500"} text-white w-10 p-1 text-center rounded cursor-pointer`}>
            EN
          </div>
          <div onClick={() => updateLocale("ID")} className={`${locale === "ID" ? "bg-primary-600" : "bg-gray-500"} text-white w-10 p-1 text-center rounded cursor-pointer`}>
            ID
          </div>
        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthMiddleware component={<Login />} />} />
          <Route path="/account-details" element={<AuthMiddleware component={<Profile />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
