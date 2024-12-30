import { ApolloError, useMutation } from "@apollo/client";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import * as authGql from "../graphql/gql/auth-gql";
import { LoginRequest, LoginResponse } from "../graphql/types/auth-type";
import { useLocalizationStore } from "../stores/localization.store";

const Login: FC = () => {
  const { translation } = useLocalizationStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();
  const [error, setError] = useState<string>();
  const [login, { loading, reset }] = useMutation<LoginResponse, LoginRequest>(authGql.LOGIN);

  const onLogin = async (payload: LoginRequest) => {
    try {
      const response = await login({ variables: payload });

      localStorage.setItem("access_token", response.data?.login.access_token ?? "");
      localStorage.setItem("refresh_token", response.data?.login.refresh_token ?? "");

      navigate("/account-details");
    } catch (err) {
      if (err instanceof ApolloError || err instanceof Error) {
        setError(err.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  dark:text-white text-center">{translation.login.title}</h1>
            {error && (
              <div className="bg-red-500 text-white text-sm rounded text-center flex">
                <div className="flex-1 p-3">{error}</div>
                <div className="flex-0 p-3 cursor-pointer" onClick={reset}>
                  &times;
                </div>
              </div>
            )}
            <form className="space-y-4 " onSubmit={handleSubmit(onLogin)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {translation.login.formEmail}
                </label>
                <input
                  {...register("email", {
                    required: "Email is required!",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="user@example.com"
                />
                {errors.email && <div className="text-red-500 mt-1 text-[12px]">{errors.email.message}</div>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {translation.login.formPassword}
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required!",
                  })}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && <div className="text-red-500 mt-1 text-[12px]">{errors.password.message}</div>}
              </div>

              <div className="pt-3">
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  {loading ? (
                    <div role="status" className="flex">
                      <svg aria-hidden="true" className="mx-auto w-5 h-5 text-white text-opacity-20 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    translation.login.textButton
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
