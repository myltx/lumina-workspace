"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = useTranslations("Contact");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
      source: "Web Contact Page",
    };

    setHasError(false);
    setIsLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Error");
      }

      setIsSuccess(true);
      toast.success(t("success.title"));
    } catch (error: Error | unknown) {
      console.error(error);
      setHasError(true);
      toast.error("Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col relative overflow-hidden">
      {/* 极简导航 */}
      <nav className="w-full absolute top-0 left-0 z-50 px-6 py-4 md:px-8 md:py-6 lg:px-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E60F2] to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <div className="w-4 h-4 text-white">📈</div>
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            Lumina Workspace
          </span>
        </Link>
        <div className="flex items-center space-x-6">
          <LanguageSwitcher />
        </div>
      </nav>

      {/* 主体内容 */}
      <div className="flex-1 flex flex-col justify-center py-20 mt-12 sm:px-6 lg:px-8 relative z-10 w-full max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-slate-500 font-medium max-w-2xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-4 sm:mx-auto sm:w-full sm:max-w-2xl">
          {isSuccess ? (
            <div className="bg-white py-12 px-6 sm:px-12 shadow-[var(--shadow-soft)] rounded-[2rem] sm:rounded-[2.5rem] border border-gray-50/80 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Send className="w-8 h-8 ml-1" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                {t("success.title")}
              </h3>
              <p className="text-slate-500 mb-10 max-w-md mx-auto leading-relaxed">
                {t("success.desc")}
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-[var(--shadow-soft)] hover:-translate-y-0.5">
                {t("success.resubmitBtn")}
              </button>
            </div>
          ) : (
            <div
              className={clsx(
                "bg-white py-8 px-6 sm:py-12 sm:px-12 shadow-[var(--shadow-soft)] rounded-[2rem] sm:rounded-[2.5rem] border border-gray-50/80 transition-all duration-300",
                hasError &&
                  "animate-shake border-red-100 ring-4 ring-red-500/10",
              )}>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-slate-700">
                      {t("form.nameLabel")}
                    </label>
                    <div className="mt-2 text-left">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="appearance-none block w-full px-4 py-3.5 border border-gray-100 rounded-2xl bg-gray-50/50 font-medium transition-all sm:text-sm outline-none placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50"
                        placeholder={t("form.namePlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-bold text-slate-700">
                      {t("form.contactLabel")}
                    </label>
                    <div className="mt-2 text-left">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        required
                        className="appearance-none block w-full px-4 py-3.5 border border-gray-100 rounded-2xl bg-gray-50/50 font-medium transition-all sm:text-sm outline-none placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50"
                        placeholder={t("form.contactPlaceholder")}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-slate-700">
                      {t("form.emailLabel")}
                    </label>
                    <div className="mt-2 text-left">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="appearance-none block w-full px-4 py-3.5 border border-gray-100 rounded-2xl bg-gray-50/50 font-medium transition-all sm:text-sm outline-none placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50"
                        placeholder={t("form.emailPlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-bold text-slate-700">
                      {t("form.companyLabel")}
                    </label>
                    <div className="mt-2 text-left">
                      <input
                        id="company"
                        name="company"
                        type="text"
                        className="appearance-none block w-full px-4 py-3.5 border border-gray-100 rounded-2xl bg-gray-50/50 font-medium transition-all sm:text-sm outline-none placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50"
                        placeholder={t("form.companyPlaceholder")}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-slate-700">
                    {t("form.contentLabel")}
                  </label>
                  <div className="mt-2 text-left">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="appearance-none block w-full px-4 py-3.5 border border-gray-100 rounded-2xl bg-gray-50/50 font-medium transition-all sm:text-sm outline-none placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-[#1E60F2]/20 focus:border-[#1E60F2]/50 resize-none"
                      placeholder={t("form.contentPlaceholder")}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={clsx(
                      "w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-[1.25rem] shadow-[var(--shadow-float)] text-sm font-bold text-white transition-all duration-300 group",
                      isLoading
                        ? "bg-[#1E60F2]/70 cursor-not-allowed"
                        : "bg-[#1E60F2] hover:bg-[#1748b6] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E60F2]",
                    )}>
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {t("form.submitBtn")}
                        <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
              <div className="mt-8 text-center pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />{" "}
                  {t("backToHome")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
