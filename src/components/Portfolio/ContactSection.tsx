import * as React from "react";
import { useState, useCallback, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Github,
  Send,
  Linkedin,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/TextArea";
import ScrollReveal from "./ScrollReveal";
import type { ContactInfo, FormData } from "../../types/types";
import {
  staggerContainer,
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  scaleIn,
  fadeInLeft2,
} from "./animations";

type ToastType = "success" | "error" | "loading";

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    title: "Email",
    value: "firstpicktinker@gmail.com",
    href: "mailto:firstpicktinker@gmail.com",
  },
  {
    icon: Github,
    title: "GitHub",
    value: "@Toxicyy",
    href: "https://github.com/Toxicyy",
  },
  {
    icon: Send,
    title: "Telegram",
    value: "@Bugzers",
    href: "https://t.me/Bugzers",
  },
];

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com" },
  { icon: Github, href: "https://github.com/Toxicyy" },
  { icon: Send, href: "https://t.me/Bugzers" },
];

const formFields = [
  {
    label: "Your Name",
    type: "text" as const,
    placeholder: "Ivan Vysocinas",
    key: "name" as keyof FormData,
  },
  {
    label: "Your Email",
    type: "email" as const,
    placeholder: "ivan@example.com",
    key: "email" as keyof FormData,
  },
];

const ToastItem: FC<{ toast: Toast; onRemove: (id: string) => void }> = ({
  toast,
  onRemove,
}) => {
  const getToastIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-400" />;
      case "loading":
        return <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />;
    }
  };

  const getToastColors = () => {
    switch (toast.type) {
      case "success":
        return "border-green-500/30 bg-green-500/10";
      case "error":
        return "border-red-500/30 bg-red-500/10";
      case "loading":
        return "border-blue-500/30 bg-blue-500/10";
    }
  };

  React.useEffect(() => {
    if (toast.type !== "loading") {
      const timer = setTimeout(() => onRemove(toast.id), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.id, toast.type, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md ${getToastColors()} shadow-lg`}
    >
      {getToastIcon()}
      <span className="text-white text-sm font-medium">{toast.message}</span>
      {toast.type !== "loading" && (
        <motion.button
          className="ml-auto text-gray-400 hover:text-white transition-colors"
          onClick={() => onRemove(toast.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <XCircle className="h-4 w-4" />
        </motion.button>
      )}
    </motion.div>
  );
};

const ContactSection: FC = React.memo(() => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36);
    setToasts((prev) => [...prev, { id, type, message }]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const updateToast = useCallback(
    (id: string, type: ToastType, message: string) => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id ? { ...toast, type, message } : toast
        )
      );
    },
    []
  );

    const getScreenWidth = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth;
    }
    return 0;
  };

  const validateForm = useCallback(() => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Please enter your name");
    }
    if (!formData.email.trim()) {
      errors.push("Please enter your email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }
    if (!formData.message.trim()) {
      errors.push("Please enter your message");
    } else if (formData.message.trim().length < 10) {
      errors.push("Message must be at least 10 characters long");
    }

    // Show all errors with delay between them
    if (errors.length > 0) {
      errors.forEach((error, index) => {
        setTimeout(() => {
          addToast("error", error);
        }, index * 100);
      });
      return false;
    }

    return true;
  }, [formData, addToast]);

  const handleInputChange = useCallback(
    (key: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleFormSubmit = useCallback(async () => {
    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);
    const loadingToastId = addToast("loading", "Sending your message...");

    try {
      // EmailJS configuration
      const serviceId = "service_ue8paa4";
      const templateId = "template_j8ufus6";
      const publicKey = "3lbz-fia2VHExNGnc";

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Ivan Vysocinas", // Your name
      };

      // Send email via EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      updateToast(
        loadingToastId,
        "success",
        "Message sent successfully! I'll get back to you soon."
      );
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      updateToast(
        loadingToastId,
        "error",
        "Failed to send message. Please try again or contact me directly via email."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isSubmitting, validateForm, addToast, updateToast]);

  const handleContactClick = useCallback((href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener noreferrer");
    } else {
      window.location.href = href;
    }
  }, []);

  const handleSocialClick = useCallback((href: string) => {
    window.open(href, "_blank", "noopener noreferrer");
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleFormSubmit();
      }
    },
    [handleFormSubmit]
  );

  return (
    <section id="contact" className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="fixed top-28 right-4 z-50 space-y-2 max-w-sm">
          <AnimatePresence mode="popLayout">
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
          </AnimatePresence>
        </div>

        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">
              <span className="text-white">Get In </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Have a project in mind or want to collaborate? Feel free to reach
              out. I'm always open to discussing new opportunities.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-2xl font-semibold text-white mb-6"
              variants={fadeInLeft}
            >
              Contact Information
            </motion.h3>

            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleContactClick(contact.href)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 group w-full text-left"
                  variants={getScreenWidth() > 1024 ? fadeInLeft :  fadeInLeft2}
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 10px 20px rgba(168, 85, 247, 0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <contact.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-white font-medium group-hover:text-purple-100 transition-colors duration-300">
                      {contact.title}
                    </p>
                    <p className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      {contact.value}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.div className="pt-8" variants={fadeInLeft}>
              <h4 className="text-lg font-semibold text-white mb-4">
                Connect With Me
              </h4>
              <motion.div
                className="flex gap-4"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      boxShadow: "0 10px 20px rgba(168, 85, 247, 0.3)",
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-purple-500/30 hover:bg-purple-500/20"
                      onClick={() => handleSocialClick(social.href)}
                    >
                      <social.icon className="h-5 w-5 text-purple-400 hover:text-purple-300 transition-colors duration-300" />
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <ScrollReveal variants={fadeInRight}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                variant="elevated"
                className="hover:border-purple-500/40 transition-all duration-500"
              >
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">
                      Send a Message
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Let's discuss your next project
                      <br />
                      <span className="text-xs text-purple-400">
                        Press Ctrl+Enter to send quickly
                      </span>
                    </CardDescription>
                  </CardHeader>
                </motion.div>
                <CardContent className="space-y-6">
                  <motion.div
                    className="space-y-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    onKeyDown={handleKeyDown}
                  >
                    {formFields.map((field) => (
                      <motion.div key={field.key} variants={fadeInUp}>
                        <label className="text-white text-sm font-medium mb-2 block">
                          {field.label} <span className="text-red-400">*</span>
                        </label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.key]}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              handleInputChange(field.key, e.target.value)
                            }
                            className="hover:border-purple-400 transition-all duration-300 focus:border-purple-500"
                            disabled={isSubmitting}
                          />
                        </motion.div>
                      </motion.div>
                    ))}

                    <motion.div variants={fadeInUp}>
                      <label className="text-white text-sm font-medium mb-2 block">
                        Your Message <span className="text-red-400">*</span>
                        <span className="text-xs text-gray-400 ml-2">
                          ({formData.message.length}/1000 characters)
                        </span>
                      </label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Textarea
                          placeholder="Hello, I'd like to talk about..."
                          value={formData.message}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            handleInputChange("message", e.target.value)
                          }
                          rows={6}
                          maxLength={1000}
                          className="hover:border-purple-400 transition-all duration-300 focus:border-purple-500"
                          disabled={isSubmitting}
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={fadeInUp}
                      whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      <Button
                        onClick={handleFormSubmit}
                        disabled={isSubmitting}
                        className={`w-full py-3 transition-all duration-300 ${
                          isSubmitting
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        }`}
                      >
                        <motion.div
                          className="flex items-center justify-center"
                          whileHover={!isSubmitting ? { x: 5 } : {}}
                          transition={{ duration: 0.2 }}
                        >
                          {isSubmitting ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4 mr-2" />
                          )}
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </motion.div>
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = "ContactSection";

export default ContactSection;
