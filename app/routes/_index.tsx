import { json, type MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpSchemaType } from "~/schemas/auth.schema";



export const loader = async ({ request }: { request: Request }) => {
  const locale = await i18next.getLocale(request)
  const t = await i18next.getFixedT(request, 'common')
  const title = t('headTitle')
  return json({ locale, title })
}

export const meta: MetaFunction = ({ data }) => {

  const { title } = data
  console.log('title', title)

  return [
    { title },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  // const { t } = useTranslation();

  const { t, ready, i18n } = useTranslation()
  // if (!ready) return <p>loading...</p>

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) })

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => console.log(data);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{t("headTitle")}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input className="input" placeholder="email" {...register("email")} />
        {errors.email && <span>{t(errors.email.message)}</span>}

        <input
          className="input"
          placeholder="password"
          {...register("password")}
        />

        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit">submit!</button>
      </form>
    </div>
  );
}
