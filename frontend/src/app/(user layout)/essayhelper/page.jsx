"use client";
import React, { useState } from "react";
import "./styles.css";
import { Sparkles, Wand2, Copy, Check, RotateCcw, Lightbulb, AlertCircle, Loader2 } from "lucide-react";

const API_KEY = "vzY5H5w9MdG9MJ3LFBRXPhdCAP0Zu9fuHbMYomvn";

const SAMPLES = [
  "Many people think that learning a language is hard.",
  "Cars cause a lot of pollution in big cities.",
  "Studying abroad is good for students.",
];

const TIPS = [
  "Aim for one idea per sentence — clarity beats complexity.",
  "Replace generic verbs (do, get, make) with specific ones.",
  "Use linking words (however, therefore, moreover) to show flow.",
];

const EssayHelper = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const charCount = inputText.length;
  const MAX_CHARS = 600;

  const generateResponse = async () => {
    if (!inputText.trim()) {
      setError("Please enter a sentence to improve.");
      return;
    }
    setError("");
    setLoading(true);
    setResponseText("");

    try {
      const response = await fetch("https://api.cohere.ai/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "command",
          prompt: `Rewrite the following sentence in a more formal, precise, and academically appropriate manner for an IELTS essay. Then, provide a brief explanation of why the new version is a better choice in terms of clarity, coherence, and lexical resource: ${inputText}`,
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      if (data.text) {
        setResponseText(data.text.trim());
      } else {
        setError("No response received. Try again.");
      }
    } catch (e) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(responseText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const handleReset = () => {
    setInputText("");
    setResponseText("");
    setError("");
  };

  return (
    <div className="essay-page">
      <div className="essay-wrap">
        <div className="essay-header">
          <span className="essay-eyebrow"><Sparkles size={14} /> AI Writing Assistant</span>
          <h1 className="essay-h1">Essay Helper</h1>
          <p className="essay-sub">
            Paste a sentence and let AI rewrite it with stronger vocabulary,
            clearer structure, and the academic tone IELTS examiners reward.
          </p>
        </div>

        <div className="composer-card">
          <div className="composer-top">
            <div className="composer-label">
              <span className="composer-icon"><Wand2 size={16} /></span>
              <span>Your sentence</span>
            </div>
            <span className={`char-count ${charCount > MAX_CHARS ? "over" : ""}`}>
              {charCount}/{MAX_CHARS}
            </span>
          </div>

          <textarea
            className="composer-textarea"
            placeholder="e.g. Many people think learning a new language is hard..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            maxLength={MAX_CHARS}
          />

          <div className="composer-samples">
            <span className="samples-label"><Lightbulb size={13} /> Try one of these</span>
            <div className="samples-row">
              {SAMPLES.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  className="sample-chip"
                  onClick={() => setInputText(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="composer-actions">
            <button
              type="button"
              className="ghost-btn"
              onClick={handleReset}
              disabled={loading || (!inputText && !responseText)}
            >
              <RotateCcw size={15} /> Clear
            </button>
            <button
              type="button"
              className="primary-btn"
              onClick={generateResponse}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="spin" /> Improving…
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Improve sentence
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="composer-error">
              <AlertCircle size={15} /> {error}
            </div>
          )}
        </div>

        {(loading || responseText) && (
          <div className="result-card">
            <div className="result-top">
              <div className="result-label">
                <span className="result-icon"><Sparkles size={16} /></span>
                <span>Improved version</span>
              </div>
              {responseText && !loading && (
                <button type="button" className="copy-btn" onClick={handleCopy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>

            {loading ? (
              <div className="result-skeleton">
                <span /><span /><span style={{ width: "70%" }} />
              </div>
            ) : (
              <p className="result-text">{responseText}</p>
            )}
          </div>
        )}

        {!responseText && !loading && (
          <div className="tips-card">
            <h3 className="tips-title">Quick tips for better writing</h3>
            <ul className="tips-list">
              {TIPS.map((t, i) => (
                <li key={i}>
                  <span className="tip-bullet">{i + 1}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EssayHelper;
