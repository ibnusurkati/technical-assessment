import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router";
import * as authGql from "../graphql/gql/auth-gql";
import { AccountDetailResponse } from "../graphql/types/auth-type";
import { useLocalizationStore } from "../stores/localization.store";

const Profile = () => {
  const { translation } = useLocalizationStore();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  const { data } = useQuery<AccountDetailResponse>(authGql.ACCOUNT_DETAIL, {
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const onLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 flex flex-col">
            <div className="mx-auto h-32 w-32">
              <img src={data?.myProfile.avatar} alt="avatar" className="rounded-lg" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {translation.accountDetail.formUserId}
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={data?.myProfile.id}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {translation.accountDetail.formName}
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={data?.myProfile.name}
              />
            </div>
            <div className="pt-4">
              <button type="button" onClick={onLogout} className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-primary-800">
                {translation.accountDetail.textButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
