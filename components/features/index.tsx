import React from "react";
import { GradientContainer } from "../gradient-container";
import { Container } from "../container";
import { Heading } from "../heading";
import { Subheading } from "../subheading";
import { FeatureIconContainer } from "./feature-icon-container";
import { FaBolt, FaChartLine } from "react-icons/fa";
import {
  Card,
  CardDescription,
  CardSkeletonContainer,
  CardTitle,
} from "./card";
import { SkeletonOne } from "./skeletons/first";
import { SkeletonTwo } from "./skeletons/second";
import { SkeletonThree } from "./skeletons/third";
import { SkeletonFour } from "./skeletons/fourth";
import { SkeletonFive } from "./skeletons/fifth";

export const Features = () => {
  return (
    <GradientContainer className="md:my-20">
      <Container className="py-20 max-w-5xl mx-auto  relative z-40">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <FaBolt className="h-6 w-6 text-cyan-500" />
        </FeatureIconContainer>
        <Heading className="pt-4">Advanced AI Integration</Heading>
        <Subheading>
          CambioML provides powerful features to integrate multiple AI models
          into your applications
        </Subheading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 py-10">
          <Card className="lg:col-span-2">
            <CardTitle>Seamless Model Switching</CardTitle>
            <CardDescription>
              Easily switch between Google Gemini and OpenAI models with a
              simple configuration change, no code modifications required.
            </CardDescription>
            <CardSkeletonContainer>
              <SkeletonOne />
            </CardSkeletonContainer>
          </Card>
          <Card>
            <CardSkeletonContainer className="max-w-[16rem] mx-auto">
              <SkeletonTwo />
            </CardSkeletonContainer>
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>
              Monitor AI model performance, response times, and usage metrics
              through an intuitive dashboard.
            </CardDescription>
          </Card>
          <Card>
            <CardSkeletonContainer>
              <SkeletonThree />
            </CardSkeletonContainer>
            <CardTitle>Voice Processing</CardTitle>
            <CardDescription>
              Implement voice-based AI assistants with built-in speech-to-text
              and text-to-speech capabilities.
            </CardDescription>
          </Card>
          <Card>
            <CardSkeletonContainer
              showGradient={false}
              className="max-w-[16rem] mx-auto"
            >
              <SkeletonFour />
            </CardSkeletonContainer>
            <CardTitle>Developer-Friendly API</CardTitle>
            <CardDescription>
              CambioML integrates with your existing tech stack through a
              unified RESTful API and SDKs for major programming languages.
            </CardDescription>
          </Card>
          <Card>
            <CardSkeletonContainer>
              <SkeletonFive />
            </CardSkeletonContainer>
            <CardTitle>Custom Model Fine-tuning</CardTitle>
            <CardDescription>
              Fine-tune AI models on your specific data to create highly
              specialized solutions for your unique use cases.
            </CardDescription>
          </Card>
        </div>
      </Container>
    </GradientContainer>
  );
};
