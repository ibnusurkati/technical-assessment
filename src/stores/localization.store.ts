import { create } from "zustand";

type Locale = "EN" | "ID";
type Translation = {
  login: {
    title: string;
    formEmail: string;
    formPassword: string;
    textButton: string;
  };
  accountDetail: {
    formUserId: string;
    formName: string;
    textButton: string;
  };
};

interface LocalizationDataType {
  locale: "EN" | "ID";
  translation: Translation;
  updateLocale(locale: Locale): void;
}

const EN_TEXT: Translation = {
  login: {
    title: "Sign in to your account",
    formEmail: "Your Email",
    formPassword: "Password",
    textButton: "Sign in",
  },
  accountDetail: {
    formUserId: "User ID",
    formName: "Name",
    textButton: "Sign out",
  },
};

const ID_TEXT: Translation = {
  login: {
    title: "Masuk ke akun Anda",
    formEmail: "Email Kamu",
    formPassword: "Kata Sandi",
    textButton: "Masuk",
  },
  accountDetail: {
    formUserId: "ID User",
    formName: "Nama",
    textButton: "Keluar",
  },
};

export const useLocalizationStore = create<LocalizationDataType>((set) => ({
  locale: "EN",
  translation: EN_TEXT,
  updateLocale: (locale: Locale) => {
    set({ locale, translation: locale === "EN" ? EN_TEXT : ID_TEXT });
  },
}));
