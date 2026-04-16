"use client";
import { useState } from 'react';

export default function AdmissionsPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Step 1",
      label: "Inquiry and registration",
      details: "Capture lead data via custom forms, automate follow-up emails, and manage initial documentation in a centralized dashboard."
    },
    {
      title: "Step 2",
      label: "Interaction, assessment, and review",
      details: "Schedule entrance exams or interviews, log evaluator feedback, and move candidates through custom-defined scoring pipelines."
    },
    {
      title: "Step 3",
      label: "Admission approval and class allocation",
      details: "Finalize selections, auto-generate offer letters, and assign students to specific sections based on capacity and criteria."
    }
  ];
  const activeStepData = steps[activeStep] ?? {
    title: "Step 1",
    label: "Inquiry and registration",
    details: "Capture lead data via custom forms, automate follow-up emails, and manage initial documentation in a centralized dashboard."
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      {/* Header Section */}
      <div className="card-surface p-8 border-b-0 rounded-b-none">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">Admissions</p>
        <h1 className="mt-3 text-4xl font-semibold">Simple, trackable admission workflows.</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Click on a stage below to explore the administrative workflow and student onboarding features.
        </p>
      </div>

      {/* Interactive Step Navigation */}
      <div className="grid gap-4 md:grid-cols-3 mt-1">
        {steps.map((step, index) => (
          <button
            key={step.title}
            onClick={() => setActiveStep(index)}
            className={`text-left transition-all duration-300 p-6 border-t-4 ${
              activeStep === index 
                ? "card-surface border-[var(--accent)] bg-white shadow-md" 
                : "bg-slate-50 border-slate-200 hover:bg-slate-100 opacity-70"
            }`}
          >
            <h2 className={`text-sm font-bold uppercase tracking-wider ${activeStep === index ? "text-[var(--accent)]" : "text-slate-400"}`}>
              {step.title}
            </h2>
            <p className="mt-1 font-semibold text-slate-900">{step.label}</p>
          </button>
        ))}
      </div>

      {/* Dynamic Detail Panel */}
      <div className="mt-6 card-surface p-8 min-h-[200px] flex flex-col justify-center bg-slate-50/50">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <h3 className="text-2xl font-semibold text-slate-800">
            {activeStepData.label}
          </h3>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 max-w-4xl">
            {activeStepData.details}
          </p>
          <button className="mt-6 px-6 py-2 bg-[var(--accent)] text-white rounded-lg font-medium hover:brightness-110 transition-all">
            View {activeStepData.title} Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
