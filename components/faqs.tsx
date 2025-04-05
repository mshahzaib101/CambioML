"use client";
import React, { useState } from "react";
import Accordion from "./accordion";
import { Heading } from "./heading";

const questions = [
  {
    id: 1,
    title: "What is CambioML?",
    description:
      "CambioML is an advanced AI integration platform that allows developers to seamlessly incorporate multiple AI models, including Google Gemini and OpenAI, into their applications.",
  },
  {
    id: 2,
    title: "How does CambioML work?",
    description:
      "CambioML provides a unified API that connects to multiple AI providers, allowing you to switch between different models without changing your code implementation.",
  },
  {
    id: 3,
    title: "Which AI models does CambioML support?",
    description:
      "CambioML currently supports Google Gemini and OpenAI models, with plans to add more AI providers in the future.",
  },
  {
    id: 4,
    title: "Can I use voice capabilities with CambioML?",
    description:
      "Yes, CambioML includes voice processing features that enable you to implement voice-based AI assistants with speech-to-text and text-to-speech capabilities.",
  },
  {
    id: 5,
    title: "Does CambioML provide analytics?",
    description:
      "CambioML offers detailed analytics to help you track AI model performance, response times, and usage metrics to optimize your applications.",
  },
  {
    id: 6,
    title: "Is CambioML suitable for small development teams?",
    description:
      "Yes, CambioML is designed to be developer-friendly and scalable, making it suitable for development teams of all sizes.",
  },
  {
    id: 7,
    title: "Can I fine-tune AI models with CambioML?",
    description:
      "Yes, CambioML provides tools for custom model fine-tuning on your specific data to create specialized solutions for your unique use cases.",
  },
  {
    id: 8,
    title: "Does CambioML offer developer support?",
    description:
      "Yes, CambioML provides comprehensive documentation and developer support to assist you with integration and troubleshooting.",
  },
  {
    id: 9,
    title: "Is there a free tier available for CambioML?",
    description:
      "CambioML offers a free tier with limited API calls so you can explore its features and see how it can enhance your applications.",
  },
  {
    id: 10,
    title: "How can I get started with CambioML?",
    description:
      "To get started with CambioML, simply sign up on our website to receive your API keys and follow our integration guide to implement AI capabilities in your applications.",
  },
];

export const FAQs = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="max-w-3xl mx-auto py-20 px-8">
      <Heading className="pt-4">Frequently asked questions</Heading>
      <div className="grid  gap-10 pt-20">
        {questions.map((item, i) => (
          <Accordion
            key={i}
            i={i}
            expanded={expanded}
            setExpanded={setExpanded}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};
