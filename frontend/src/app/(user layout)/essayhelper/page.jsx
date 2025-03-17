"use client";
import React, { useState } from "react";
import "./styles.css";
import { BrainCircuit } from "lucide-react";

const API_KEY = "vzY5H5w9MdG9MJ3LFBRXPhdCAP0Zu9fuHbMYomvn";

const EssayHelper = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateResponse = async () => {
    if (!inputText.trim()) {
      setError("Please enter a sentence.");
      return;
    }
    setError("");
    setLoading(true);

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
        setResponseText(data.text);
      } else {
        setError("No response received. Try again.")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    }
    setLoading(false);
  };

  return (
    <div className="essay-helper">
      <div className="helpsquare">
        <h1 className="help-h1">Essay Helper AI <BrainCircuit size={28} className="brainicon" /></h1>
        <p className="help-p">Improve your sentence with AI-powered suggestions.</p>
        <textarea
          className="help-textarea"
          placeholder="Enter a sentence..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className='help-button' onClick={generateResponse} disabled={loading}>
          {loading ? "Generating..." : "Improve Sentence"}
        </button>
        {error && <p className="error">{error}</p>}
        {responseText && (
          <div className="response">
            <h2 className="help-h2">Improved Version</h2>
            <p className="help-p">{responseText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EssayHelper;
