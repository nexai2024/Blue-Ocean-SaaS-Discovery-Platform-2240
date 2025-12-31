import supabase from '../supabase/supabase';

const getApiKey = () => localStorage.getItem('openai_api_key');

const callOpenAI = async (messages, responseFormat = "json_object") => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("OpenAI API Key not found. Please add it in Profile Settings.");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview",
      messages,
      response_format: { type: responseFormat },
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "OpenAI API Error");
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
};

export const aiService = {
  // 1. Opportunity Radar: Finds market gaps
  scanMarketGaps: async (profile) => {
    const prompt = `
      Act as a Blue Ocean Strategy expert and SaaS researcher.
      User Profile: 
      - Skills: ${profile.techStack.join(', ')}
      - Experience: ${profile.experience}
      - Interests: ${profile.interests.join(', ')}
      - Budget: $${profile.budget}
      - Avoid: ${profile.avoidDomains.join(', ')}

      Task: Identify 5 "Blue Ocean" SaaS opportunities. These must be niche, uncontested, and technically feasible for this founder.
      Return a JSON object with an array of "opportunities":
      [{ "title", "niche", "audience", "blue_ocean_angle", "difficulty" (1-10), "potential_arpu" (number) }]
    `;
    return callOpenAI([{ role: "system", content: "You are a professional market researcher." }, { role: "user", content: prompt }]);
  },

  // 2. Niche Deep Diver: Analyzes a specific domain
  deepDiveNiche: async (niche, geography) => {
    const prompt = `
      Analyze the niche: "${niche}" in ${geography}.
      Provide:
      1. dayInLife: Array of {time, activity, pain}
      2. keyWorkflows: Array of {workflow, steps, duration, pain}
      3. existingStack: Array of {tool, purpose, cost, gaps}
      4. jobsToBeDone: { functional: [], emotional: [], social: [] }
      5. concepts: 3 SaaS ideas {name, tagline, hook, coreFeatures: [], uniqueValue}
      Return as a structured JSON object.
    `;
    return callOpenAI([{ role: "system", content: "You are an expert ethnographer and product strategist." }, { role: "user", content: prompt }]);
  },

  // 3. Concept Forge: Generates detailed product concepts
  forgeConcepts: async (opportunity) => {
    const prompt = `
      Expand this opportunity into 3 distinct SaaS product variants:
      Opportunity: ${opportunity.title} (${opportunity.blue_ocean_angle})
      
      For each variant, provide:
      { name, tagline, one_liner, lean_canvas: { solution, unfair_advantage, channels }, risks: { market, technical }, pricing_model, build_time_estimate }
      Return a JSON object with an array "concepts".
    `;
    return callOpenAI([{ role: "system", content: "You are a lean startup specialist." }, { role: "user", content: prompt }]);
  },

  // 4. Value Curve Advisor
  getStrategyAdvice: async (dimensions, competitors) => {
    const prompt = `
      Analyze this Value Curve:
      Dimensions: ${JSON.stringify(dimensions)}
      Competitors: ${competitors.join(', ')}
      
      Suggest specific "Eliminate-Reduce-Raise-Create" (ERRC) moves to achieve a true Blue Ocean.
      Return a JSON object: { advice: "string", recommendedMoves: [{ dimension, action, reason }] }
    `;
    return callOpenAI([{ role: "system", content: "You are W. Chan Kim, author of Blue Ocean Strategy." }, { role: "user", content: prompt }]);
  }
};